"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyholeOpen,
  Loader2,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

export interface UnprotectSettings {
  password: string;
}

interface UnprotectPdfActionsProps {
  disabled?: boolean;
  loading?: boolean;
  fileCount?: number;
  onUnprotect: (settings: UnprotectSettings) => void;
}

export default function UnprotectPdfActions({
  disabled = false,
  loading = false,
  fileCount = 0,
  onUnprotect,
}: UnprotectPdfActionsProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotInfo, setShowForgotInfo] = useState(false);

  const isFormValid = Boolean(password.trim());
  const isButtonDisabled = disabled || loading || !isFormValid;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onUnprotect({ password: password.trim() });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            Unlock PDF
          </h2>
          {fileCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {fileCount} {fileCount === 1 ? "file" : "files"} ready
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Enter the password to remove protection from your document.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
              Document Password
            </label>
            <button
              type="button"
              onClick={() => setShowForgotInfo(!showForgotInfo)}
              className="text-[11px] font-medium text-green-600 hover:text-green-700 transition cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="h-3 w-3" /> Forgot?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password to unlock"
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
        </div>

        {showForgotInfo && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              <span>Forgot Password?</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Standard AES encryption makes it impossible to recover or bypass a
              lost password without brute-forcing. Make sure you are using the
              password provided when the PDF was first encrypted.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          aria-busy={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Decrypting PDF...</span>
            </>
          ) : (
            <>
              <LockKeyholeOpen className="h-4 w-4" />
              <span>Unlock PDF</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
