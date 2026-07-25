"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface ProtectSettings {
  password: string;
}

interface ProtectPdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  fileCount?: number;
  onProtect: (settings: ProtectSettings) => void;
}

type StrengthScore = 0 | 1 | 2 | 3 | 4;

export default function ProtectPdfActions({
  disabled = false,
  loading = false,
  fileCount = 0,
  onProtect,
}: ProtectPdfActionsProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strengthInfo = useMemo(() => {
    if (!password)
      return {
        score: 0 as StrengthScore,
        label: "Too Short",
        color: "bg-slate-200",
      };

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return {
          score: 1 as StrengthScore,
          label: "Weak",
          color: "bg-red-500",
          text: "text-red-600",
        };
      case 2:
        return {
          score: 2 as StrengthScore,
          label: "Fair",
          color: "bg-amber-500",
          text: "text-amber-600",
        };
      case 3:
        return {
          score: 3 as StrengthScore,
          label: "Good",
          color: "bg-blue-500",
          text: "text-blue-600",
        };
      case 4:
        return {
          score: 4 as StrengthScore,
          label: "Strong",
          color: "bg-green-500",
          text: "text-green-600",
        };
      default:
        return {
          score: 0 as StrengthScore,
          label: "Weak",
          color: "bg-red-500",
          text: "text-red-600",
        };
    }
  }, [password]);

  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return true;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const isFormValid = Boolean(
    password.trim() && confirmPassword.trim() && passwordsMatch,
  );

  const isButtonDisabled = disabled || loading || !isFormValid;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onProtect({ password: password.trim() });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            Protect PDF
          </h2>
          {fileCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {fileCount} {fileCount === 1 ? "file" : "files"} ready
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Set a strong password to lock and encrypt your document.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
            Set Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled || loading}
              className="w-full rounded-xl border border-slate-300 bg-white pl-3.5 pr-9 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:bg-slate-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {password.length > 0 && (
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Password strength:</span>
                <span className={`font-semibold ${strengthInfo.text}`}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1.5 rounded-full overflow-hidden bg-slate-100">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthInfo.score >= 1
                      ? strengthInfo.color
                      : "bg-transparent"
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthInfo.score >= 2
                      ? strengthInfo.color
                      : "bg-transparent"
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthInfo.score >= 3
                      ? strengthInfo.color
                      : "bg-transparent"
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthInfo.score >= 4
                      ? strengthInfo.color
                      : "bg-transparent"
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={disabled || loading}
              className={`w-full rounded-xl border bg-white pl-3.5 pr-9 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
                !passwordsMatch && confirmPassword
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                  : "border-slate-300 focus:border-green-500 focus:ring-green-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] pt-0.5">
              {!passwordsMatch ? (
                <>
                  <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
                  <span className="text-red-500">Passwords do not match</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />
                  <span className="text-green-600">Passwords match</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Encryption Level
          </span>
          <span className="font-mono font-medium text-slate-900 uppercase">
            AES-256 Bit
          </span>
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          aria-busy={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Encrypting PDF...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Protect PDF</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
