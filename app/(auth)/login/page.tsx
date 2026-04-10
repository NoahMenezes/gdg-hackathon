"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, Check, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Metadata } from "next";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        const newErrors: { email?: boolean; password?: boolean } = {};
        if (!email.trim()) newErrors.email = true;
        if (!password.trim()) newErrors.password = true;
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="w-full"
        >
            {/* Logo mark */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4, ease }}>
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                    <span className="font-heading italic text-white text-lg">F</span>
                </div>
            </motion.div>

            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4, ease }}>
                <h1 className="text-4xl md:text-5xl font-heading italic text-white tracking-[-2px] leading-[0.9] mb-2">
                    Welcome back.
                </h1>
                <p className="font-body font-light text-white/50 text-sm mb-8">
                    Sign in to your FieldMind account.
                </p>
            </motion.div>

            {/* Social Login */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.4, ease }} className="flex flex-col gap-3 mb-6">
                <button className="liquid-glass rounded-full w-full py-3 flex items-center justify-center gap-3 text-sm font-body font-medium text-white hover:bg-white/5 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>
                <button className="liquid-glass rounded-full w-full py-3 flex items-center justify-center gap-3 text-sm font-body font-medium text-white hover:bg-white/5 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                        <path d="M12.005 2C7.195 2 3.38 5.387 2.267 9.77c-.49 1.926-.25 3.643.394 5.073.82 1.82 2.42 3.236 4.256 3.93.197.038.266-.084.266-.19l-.006-.66c-1.53.33-1.974-.37-2.1-.71-.068-.17-.36-.71-.615-.853-.21-.113-.51-.393-.008-.4.473-.007.81.436.923.614.54.915 1.403.657 1.747.499.054-.393.21-.657.383-.808-1.337-.15-2.737-.668-2.737-2.966 0-.655.233-1.194.616-1.615-.062-.15-.268-.764.058-1.59 0 0 .503-.16 1.65.617a5.6 5.6 0 0 1 1.5-.202c.51 0 1.018.069 1.5.202 1.147-.783 1.65-.617 1.65-.617.326.826.12 1.44.058 1.59.383.421.616.954.616 1.615 0 2.305-1.407 2.816-2.746 2.965.217.187.407.55.407 1.11l-.007 1.646c0 .106.07.233.27.19a7.97 7.97 0 0 0 5.558-7.608C21.98 5.808 17.465 2 12.005 2z" />
                    </svg>
                    Continue with John Deere Ops
                </button>
            </motion.div>

            {/* Divider */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26, duration: 0.4, ease }} className="flex items-center gap-4 mb-6">
                <div className="border-t border-white/10 flex-1" />
                <span className="text-white/30 text-xs font-body font-light">or</span>
                <div className="border-t border-white/10 flex-1" />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.4, ease }} className="mb-4">
                <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">Email</label>
                <div className={`liquid-glass rounded-full transition ${errors.email ? "ring-1 ring-red-500/50" : ""}`}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })); }}
                        placeholder="you@yourfarm.com"
                        className="w-full bg-transparent px-5 py-3.5 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                    />
                </div>
                {errors.email && <p className="text-red-400/70 text-xs font-body mt-1.5 pl-2">This field is required</p>}
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.4, ease }} className="mb-4">
                <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">Password</label>
                <div className={`liquid-glass rounded-full transition relative ${errors.password ? "ring-1 ring-red-500/50" : ""}`}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: false })); }}
                        placeholder="••••••••"
                        className="w-full bg-transparent px-5 py-3.5 pr-28 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                        <button onClick={() => setShowPassword(!showPassword)} className="text-white/30 hover:text-white/60 transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <span className="text-xs font-body text-white/40 hover:text-white/70 cursor-pointer transition-colors">Forgot?</span>
                    </div>
                </div>
                {errors.password && <p className="text-red-400/70 text-xs font-body mt-1.5 pl-2">This field is required</p>}
            </motion.div>

            {/* Remember */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4, ease }} className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => setRemember(!remember)}
                    className={`liquid-glass-strong rounded w-4 h-4 flex items-center justify-center transition-colors ${remember ? "bg-white/20" : ""}`}
                >
                    {remember && <Check className="w-2.5 h-2.5 text-white" />}
                </button>
                <span className="text-white/50 text-xs font-body font-light">Remember me for 30 days</span>
            </motion.div>

            {/* Submit */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 0.4, ease }}>
                <button
                    onClick={handleSubmit}
                    disabled={loading || success}
                    className="liquid-glass-strong rounded-full w-full py-3.5 text-sm font-body font-medium text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors mb-6 disabled:opacity-60"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : success ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                        <>Sign In to FieldMind <ArrowUpRight className="w-3.5 h-3.5" /></>
                    )}
                </button>
            </motion.div>

            {/* Footer */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.66, duration: 0.4, ease }} className="text-center text-white/30 text-xs font-body font-light">
                By signing in, you agree to our{" "}
                <a href="#" className="underline hover:text-white/60 transition-colors">Terms</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>
            </motion.p>
        </motion.div>
    );
}
