"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { loginUser, setCurrentUser, DEFAULT_DATABASE } from "@/lib/store";
import { Scissors, ArrowRight, Lock, Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = loginUser(identifier);
    if (!user) {
      setError("User not found. Try 'sally@example.com' or 'juspen@example.com' or use the quick demo buttons below.");
      return;
    }

    if (user.role === 'CHIEF_TAILOR') {
      router.push('/dashboard');
    } else {
      router.push('/staff');
    }
  };

  const handleQuickDemo = (role: 'CHIEF_TAILOR' | 'STAFF') => {
    const targetUser = role === 'CHIEF_TAILOR' ? DEFAULT_DATABASE.users[0] : DEFAULT_DATABASE.users[1];
    setCurrentUser(targetUser);
    if (targetUser.role === 'CHIEF_TAILOR') {
      router.push('/dashboard');
    } else {
      router.push('/staff');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] flex flex-col justify-between selection:bg-[#e8dcce] selection:text-[#1c1917]">
      
      {/* Header */}
      <header className="px-4 sm:px-8 py-5 sm:py-7">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#ede5da] bg-[#1c1917] flex items-center justify-center shadow-xs p-1">
              <Image src="/images/tailormate_icon.png" alt="TailorMate" fill className="object-contain p-0.5" priority />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1c1917]">
              TAILORMATE
            </span>
          </Link>
        </div>
      </header>

      {/* Main Sign In Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-[#ffffff] w-full max-w-lg rounded-3xl border border-[#ede5da] shadow-xl p-6 sm:p-10 space-y-6 sm:space-y-7 my-4">
          
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c69b6d]">
              Welcome Back
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917]">
              Sign in to your workshop
            </h1>
            <p className="text-xs sm:text-sm text-[#78716c] font-medium">
              Enter your email or phone number to access your atelier workspace.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-[#fef2f2] border border-[#fee2e2] text-xs sm:text-sm font-medium text-[#b91c1c] flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Email or Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. sally@example.com or +237 671..."
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                />
                <Mail className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide">Password</label>
                <button 
                  type="button" 
                  onClick={() => alert("Demo password hint: Any password works for demonstration.")}
                  className="text-xs font-semibold text-[#8c6b47] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                />
                <Lock className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="border-t border-[#ede5da] pt-5 space-y-3 text-center">
            <span className="text-xs text-[#78716c] font-bold uppercase tracking-wider block">
              Quick Demonstration Logins:
            </span>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('CHIEF_TAILOR')}
                className="p-3 rounded-xl border border-[#ede5da] hover:border-[#c69b6d] bg-[#faf7f2] text-left transition-colors"
              >
                <strong className="block text-[#1c1917] text-xs sm:text-sm font-bold">Chief Tailor</strong>
                <span className="text-xs text-[#78716c] font-medium">Sally (Full Admin)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('STAFF')}
                className="p-3 rounded-xl border border-[#ede5da] hover:border-[#c69b6d] bg-[#faf7f2] text-left transition-colors"
              >
                <strong className="block text-[#1c1917] text-xs sm:text-sm font-bold">Artisan Staff</strong>
                <span className="text-xs text-[#78716c] font-medium">Juspen (Workstation)</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-xs sm:text-sm text-[#78716c]">
            Don&apos;t have a business account yet?{" "}
            <Link href="/auth/get-started" className="font-bold text-[#8c6b47] hover:underline">
              Get Started
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-xs sm:text-sm text-[#78716c]">
        © 2026 TailorMate. Role-based Atelier Management.
      </footer>

    </div>
  );
}
