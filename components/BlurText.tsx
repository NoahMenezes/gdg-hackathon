"use client";

import { motion, Variants } from "framer-motion";

interface BlurTextProps {
    text: string;
    className?: string;
    wordDelay?: number;
}

export function BlurText({ text, className = "", wordDelay = 0.1 }: BlurTextProps) {
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: wordDelay },
        },
    };

    const item: Variants = {
        hidden: {
            filter: "blur(10px)",
            opacity: 0,
            y: 50
        },
        show: {
            filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
            transition: {
                duration: 0.35,
                times: [0, 0.5, 1],
                ease: "easeOut"
            }
        },
    };

    return (
        <motion.h1
            className={`inline-flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={item} className="inline-block mr-[0.25em] last:mr-0">
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
}
