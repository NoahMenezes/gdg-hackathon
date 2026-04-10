"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}

export function HLSVideo({ src, ...props }: HLSVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({
                startLevel: -1,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch((err) => console.log("video play error", err));
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari fallback
            video.src = src;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch((err) => console.log("video play error", err));
            });
        }
    }, [src]);

    return <video ref={videoRef} playsInline autoPlay muted loop {...props} />;
}
