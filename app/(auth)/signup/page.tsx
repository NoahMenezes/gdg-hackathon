"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Eye,
  EyeOff,
  Check,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function getPasswordStrength(pw: string): {
  label: string;
  color: string;
  width: string;
} {
  if (pw.length === 0) return { label: "", color: "bg-white/10", width: "0%" };
  if (pw.length < 6)
    return { label: "weak", color: "bg-red-500", width: "33%" };
  if (pw.length < 10)
    return { label: "fair", color: "bg-orange-500", width: "66%" };
  return { label: "strong", color: "bg-green-500", width: "100%" };
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Step 2
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [acreage, setAcreage] = useState("");
  const [tools, setTools] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validateStep1 = () => {
    const e: Record<string, boolean> = {};
    if (!name.trim()) e.name = true;
    if (!email.trim()) e.email = true;
    if (!password.trim()) e.password = true;
    if (!confirmPassword.trim() || confirmPassword !== password)
      e.confirmPassword = true;
    if (!termsAgreed) e.terms = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col items-center text-center w-full"
      >
        <div className="liquid-glass-strong rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-heading italic text-white mb-2">
          You&apos;re in the field.
        </h1>
        <p className="text-white/50 font-body font-light text-sm mb-8 max-w-xs">
          Check your email to confirm your account. Your baseline field report
          will be ready within 24 hours.
        </p>
        <a
          href="/"
          className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-body font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          Go to Home <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="w-full"
    >
      {/* Logo */}
      <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
        <span className="font-heading italic text-white text-lg">F</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-heading italic text-white tracking-[-2px] leading-[0.9] mb-2">
        Start growing.
      </h1>
      <p className="font-body font-light text-white/50 text-sm mb-8">
        Create your FieldMind account. First 30 days free.
      </p>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-body ${step === 1 ? "liquid-glass-strong text-white" : "liquid-glass text-white/40"}`}
        >
          Step 1 — Account
        </span>
        <div className="border-t border-white/10 w-6" />
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-body ${step === 2 ? "liquid-glass-strong text-white" : "liquid-glass text-white/40"}`}
        >
          Step 2 — Your Farm
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Social Login */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="liquid-glass rounded-full w-full py-3 flex items-center justify-center gap-3 text-sm font-body font-medium text-white hover:bg-white/5 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
              <button className="liquid-glass rounded-full w-full py-3 flex items-center justify-center gap-3 text-sm font-body font-medium text-white hover:bg-white/5 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12.005 2C7.195 2 3.38 5.387 2.267 9.77c-.49 1.926-.25 3.643.394 5.073.82 1.82 2.42 3.236 4.256 3.93.197.038.266-.084.266-.19l-.006-.66c-1.53.33-1.974-.37-2.1-.71-.068-.17-.36-.71-.615-.853-.21-.113-.51-.393-.008-.4.473-.007.81.436.923.614.54.915 1.403.657 1.747.499.054-.393.21-.657.383-.808-1.337-.15-2.737-.668-2.737-2.966 0-.655.233-1.194.616-1.615-.062-.15-.268-.764.058-1.59 0 0 .503-.16 1.65.617a5.6 5.6 0 0 1 1.5-.202c.51 0 1.018.069 1.5.202 1.147-.783 1.65-.617 1.65-.617.326.826.12 1.44.058 1.59.383.421.616.954.616 1.615 0 2.305-1.407 2.816-2.746 2.965.217.187.407.55.407 1.11l-.007 1.646c0 .106.07.233.27.19a7.97 7.97 0 0 0 5.558-7.608C21.98 5.808 17.465 2 12.005 2z" />
                </svg>
                Continue with John Deere Ops
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="border-t border-white/10 flex-1" />
              <span className="text-white/30 text-xs font-body font-light">
                or
              </span>
              <div className="border-t border-white/10 flex-1" />
            </div>

            {/* Fields */}
            {[
              {
                label: "Full Name",
                key: "name",
                value: name,
                set: setName,
                placeholder: "Alex Johnson",
                type: "text",
              },
              {
                label: "Farm / Business Email",
                key: "email",
                value: email,
                set: setEmail,
                placeholder: "you@yourfarm.com",
                type: "email",
              },
            ].map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4, ease }}
                className="mb-4"
              >
                <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                  {field.label}
                </label>
                <div
                  className={`liquid-glass rounded-full transition ${errors[field.key] ? "ring-1 ring-red-500/50" : ""}`}
                >
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => {
                      field.set(e.target.value);
                      setErrors((p) => ({ ...p, [field.key]: false }));
                    }}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent px-5 py-3.5 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                  />
                </div>
                {errors[field.key] && (
                  <p className="text-red-400/70 text-xs font-body mt-1.5 pl-2">
                    This field is required
                  </p>
                )}
              </motion.div>
            ))}

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.4, ease }}
              className="mb-2"
            >
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div
                className={`liquid-glass rounded-full transition relative ${errors.password ? "ring-1 ring-red-500/50" : ""}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: false }));
                  }}
                  placeholder="Create a strong password"
                  className="w-full bg-transparent px-5 py-3.5 pr-12 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400/70 text-xs font-body mt-1.5 pl-2">
                  This field is required
                </p>
              )}
            </motion.div>

            {/* Strength Meter */}
            {password.length > 0 && (
              <div className="mb-4 px-1">
                <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="text-white/30 text-xs font-body">
                  strength: {strength.label}
                </span>
              </div>
            )}

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4, ease }}
              className="mb-4"
            >
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <div
                className={`liquid-glass rounded-full transition relative ${errors.confirmPassword ? "ring-1 ring-red-500/50" : ""}`}
              >
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((p) => ({ ...p, confirmPassword: false }));
                  }}
                  placeholder="Repeat your password"
                  className="w-full bg-transparent px-5 py-3.5 pr-12 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400/70 text-xs font-body mt-1.5 pl-2">
                  Passwords must match
                </p>
              )}
            </motion.div>

            {/* Terms */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4, ease }}
              className="flex items-start gap-3 mb-6"
            >
              <button
                onClick={() => {
                  setTermsAgreed(!termsAgreed);
                  setErrors((p) => ({ ...p, terms: false }));
                }}
                className={`liquid-glass-strong rounded w-4 h-4 flex items-center justify-center transition-colors shrink-0 mt-0.5 ${termsAgreed ? "bg-white/20" : ""} ${errors.terms ? "ring-1 ring-red-500/50" : ""}`}
              >
                {termsAgreed && <Check className="w-2.5 h-2.5 text-white" />}
              </button>
              <span className="text-white/50 text-xs font-body font-light leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-white/70 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-white/70 underline">
                  Privacy Policy
                </a>
              </span>
            </motion.div>

            {/* Continue */}
            <button
              onClick={handleNext}
              className="liquid-glass-strong rounded-full w-full py-3.5 text-sm font-body font-medium text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <button
              onClick={() => setStep(1)}
              className="text-white/40 text-xs font-body cursor-pointer hover:text-white/70 transition-colors mb-6 flex items-center gap-1"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-heading italic text-white mb-2">
              Tell us about your farm.
            </h2>
            <p className="text-white/50 text-sm font-body font-light mb-6">
              This helps us configure your intelligence layer from day one.
            </p>

            {/* Farm Name */}
            <div className="mb-4">
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Farm / Operation Name
              </label>
              <div className="liquid-glass rounded-full">
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="Harrow Grain Co."
                  className="w-full bg-transparent px-5 py-3.5 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Primary Location{" "}
                <span className="text-white/30 normal-case tracking-normal">
                  (optional)
                </span>
              </label>
              <div className="liquid-glass rounded-full">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nebraska, USA"
                  className="w-full bg-transparent px-5 py-3.5 text-sm font-body text-white placeholder:text-white/20 border-none outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Crop Type */}
            <div className="mb-4">
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Primary Crop Type
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Corn / Maize",
                  "Soybeans",
                  "Wheat",
                  "Specialty Crops",
                  "Viticulture",
                  "Horticulture",
                  "Mixed / Other",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setCropType(opt)}
                    className={`rounded-xl px-3 py-2 text-xs font-body cursor-pointer transition-all ${cropType === opt ? "liquid-glass-strong ring-1 ring-white/30 text-white" : "liquid-glass text-white/60 hover:text-white"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Acreage */}
            <div className="mb-4">
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Total Acreage
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Under 100 ac",
                  "100–500 ac",
                  "500–5,000 ac",
                  "5,000+ ac",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAcreage(opt)}
                    className={`rounded-xl px-3 py-2 text-xs font-body cursor-pointer transition-all ${acreage === opt ? "liquid-glass-strong ring-1 ring-white/30 text-white" : "liquid-glass text-white/60 hover:text-white"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Tools */}
            <div className="mb-6">
              <label className="block text-xs font-body font-medium text-white/50 uppercase tracking-widest mb-2">
                Current Precision Ag Tools
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "None yet",
                  "John Deere Ops",
                  "Climate FieldView",
                  "Trimble Ag",
                  "Other",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setTools(opt)}
                    className={`rounded-xl px-3 py-2 text-xs font-body cursor-pointer transition-all ${tools === opt ? "liquid-glass-strong ring-1 ring-white/30 text-white" : "liquid-glass text-white/60 hover:text-white"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="liquid-glass-strong rounded-full w-full py-3.5 text-sm font-body font-medium text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create My FieldMind Account{" "}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
