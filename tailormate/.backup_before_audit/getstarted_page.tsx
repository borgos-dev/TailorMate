"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { registerBusinessAccount } from "@/lib/store";
import { Scissors, ArrowRight, ArrowLeft, Check, Building2, User, Phone, Mail, Lock, MapPin } from "lucide-react";

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Account
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stepError, setStepError] = useState<string | null>(null);

  // Step 2: Business
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [currency, setCurrency] = useState("FCFA");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);

    if (password !== confirmPassword) {
      setStepError("Passwords do not match. Please verify.");
      return;
    }

    if (!businessName) {
      setBusinessName(`${fullName}'s Tailoring Atelier`);
    }
    if (!businessPhone) {
      setBusinessPhone(phone);
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    registerBusinessAccount(
      {
        fullName,
        phone,
        email
      },
      {
        name: businessName,
        phone: businessPhone,
        address: businessAddress || "Douala, Cameroon",
        currency: currency || "FCFA"
      }
    );

    router.push('/dashboard');
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

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-[#ffffff] w-full max-w-xl rounded-3xl border border-[#ede5da] shadow-xl p-6 sm:p-10 space-y-6 sm:space-y-7 my-4">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-[#ede5da] pb-4 sm:pb-5 gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${step === 1 ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-emerald-700 text-white'}`}>
                {step === 2 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${step === 1 ? 'text-[#1c1917]' : 'text-[#78716c]'}`}>
                <span className="hidden xs:inline">1. Account Setup</span>
                <span className="xs:hidden">Account</span>
              </span>
            </div>

            <div className="h-0.5 w-8 sm:w-16 bg-[#ede5da] shrink-0" />

            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${step === 2 ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] border border-[#ede5da] text-[#78716c]'}`}>
                2
              </div>
              <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${step === 2 ? 'text-[#1c1917]' : 'text-[#78716c]'}`}>
                <span className="hidden xs:inline">2. Business Profile</span>
                <span className="xs:hidden">Business</span>
              </span>
            </div>
          </div>

          {stepError && (
            <div className="p-3.5 rounded-xl bg-[#fef2f2] border border-[#fee2e2] text-xs sm:text-sm font-semibold text-[#b91c1c]">
              {stepError}
            </div>
          )}

          {/* STEP 1: CREATE ACCOUNT */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917]">
                  Create your TailorMate account
                </h1>
                <p className="text-xs sm:text-sm text-[#78716c] font-medium">
                  Begin setting up your business atelier as the Chief Tailor.
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Sally Wansi"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <User className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. +237 671 234 567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <Phone className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="e.g. sally@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <Mail className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                    />
                    <Lock className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                    />
                    <Lock className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Business Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2 text-xs sm:text-sm text-[#78716c]">
                Already have an account?{" "}
                <Link href="/auth/signin" className="font-bold text-[#8c6b47] hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          )}

          {/* STEP 2: CREATE BUSINESS */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917]">
                  Set up your tailoring business
                </h1>
                <p className="text-xs sm:text-sm text-[#78716c] font-medium">
                  Configure your workshop name, location, and operational currency.
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Business Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Sally's Bespoke Atelier"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <Building2 className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Business Contact Phone</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. +237 671 234 567"
                    value={businessPhone}
                    onChange={e => setBusinessPhone(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <Phone className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Business Address / City</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Akwa, Douala, Cameroon"
                    value={businessAddress}
                    onChange={e => setBusinessAddress(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-medium text-[#1c1917]"
                  />
                  <MapPin className="w-5 h-5 text-[#78716c] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Operational Currency</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm sm:text-base font-medium text-[#1c1917]"
                >
                  <option value="FCFA">FCFA / XAF (Central &amp; West Africa)</option>
                  <option value="NGN">NGN - Nigerian Naira (₦)</option>
                  <option value="GHS">GHS - Ghanaian Cedi (GH₵)</option>
                  <option value="USD">USD - US Dollar ($)</option>
                </select>
              </div>

              <div className="pt-3 flex flex-col xs:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-full border border-[#ede5da] text-[#57534e] hover:bg-[#faf7f2] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span className="hidden xs:inline">Create Business &amp; Enter Dashboard</span>
                  <span className="xs:hidden">Create Business</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-xs sm:text-sm text-[#78716c]">
        © 2026 TailorMate. Business registration for modern tailoring workshops.
      </footer>

    </div>
  );
}
