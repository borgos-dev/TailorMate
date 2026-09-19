"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Scissors, 
  Ruler, 
  Users, 
  CalendarClock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Phone, 
  MessageSquare, 
  Check, 
  ChevronRight,
  Menu,
  X,
  Smartphone,
  Laptop,
  Bell,
  CreditCard,
  FileSpreadsheet,
  AlertCircle,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronUp
} from "lucide-react";

// Interactive Scroll-Reveal Component for Up/Down Motion
function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "opacity-100 translate-y-0 translate-x-0 scale-100";
    if (direction === "up") return "opacity-0 translate-y-8 scale-[0.99]";
    if (direction === "down") return "opacity-0 -translate-y-8 scale-[0.99]";
    if (direction === "left") return "opacity-0 translate-x-8 scale-[0.99]";
    if (direction === "right") return "opacity-0 -translate-x-8 scale-[0.99]";
    return "opacity-0 scale-[0.98]";
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform will-change-transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll tracking for sticky navbar elevation and progress
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Section interactive states
  const [measurementYear, setMeasurementYear] = useState<"2026" | "2025">("2026");
  const [selectedStaff, setSelectedStaff] = useState<"juspen" | "nelson" | "wansi">("juspen");
  const [chatMessageStage, setChatMessageStage] = useState<"registered" | "ready" | "delay">("ready");
  const [paymentProgress, setPaymentProgress] = useState(0);

  // Footer modal dialogs for zero dead links
  const [activeFooterModal, setActiveFooterModal] = useState<"privacy" | "terms" | "help" | "contact" | null>(null);

  // Scroll listener for sticky navbar & scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoothly animate the payment bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentProgress(59);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] flex flex-col selection:bg-[#e8dcce] selection:text-[#1c1917]">
      


      {/* =========================================================================
          2. STICKY NAVBAR (Clean, architectural separation with subtle progress)
          ========================================================================= */}
      <nav 
        style={{ position: "sticky", top: 0, zIndex: 50 }}
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled 
            ? "bg-[#ffffff] border-b border-[#ede5da] shadow-xs py-2.5 sm:py-3" 
            : "bg-[#ffffff]/95 border-b border-[#ede5da]/80 py-3 sm:py-4"
        }`}
      >
        {/* Subtle Tailor Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ede5da]/40 overflow-hidden pointer-events-none">
          <div 
            className="h-full bg-[#c69b6d] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-[#ede5da] bg-[#1c1917] flex items-center justify-center shadow-xs shrink-0 p-1">
              <Image 
                src="/images/tailormate_icon.png" 
                alt="TailorMate" 
                fill 
                className="object-contain p-1" 
                priority 
              />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-wider text-[#1c1917] uppercase leading-none">
              TAILORMATE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#57534e]">
            <a href="#for-tailors" className="hover:text-[#1c1917] transition-colors">
              The Reality
            </a>
            <a href="#features" className="hover:text-[#1c1917] transition-colors">
              Workspace
            </a>
            <a href="#how-it-works" className="hover:text-[#1c1917] transition-colors">
              Workflow
            </a>
            <a href="#deadlines" className="hover:text-[#1c1917] transition-colors">
              Deadlines
            </a>
            <a href="#pricing" className="hover:text-[#1c1917] transition-colors">
              Payments
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/auth/signin" 
              className="text-[15px] font-semibold text-[#57534e] hover:text-[#1c1917] transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/get-started" 
              className="px-5 py-2.5 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-[15px] font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#57534e] hover:text-[#1c1917] hover:bg-[#f7f2eb]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#ede5da] bg-[#ffffff] px-4 sm:px-6 py-4 space-y-3 shadow-md">
            <a 
              href="#for-tailors" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#57534e] hover:text-[#1c1917]"
            >
              The Reality
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#57534e] hover:text-[#1c1917]"
            >
              Workspace
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#57534e] hover:text-[#1c1917]"
            >
              Workflow
            </a>
            <a 
              href="#deadlines" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#57534e] hover:text-[#1c1917]"
            >
              Deadlines
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#57534e] hover:text-[#1c1917]"
            >
              Payments
            </a>
            <div className="pt-3 border-t border-[#ede5da] flex flex-col gap-2">
              <Link 
                href="/auth/signin" 
                className="w-full py-2.5 text-center text-base font-semibold text-[#57534e] border border-[#ede5da] rounded-lg"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/get-started" 
                className="w-full py-2.5 text-center text-base font-semibold text-white bg-[#c69b6d] hover:bg-[#8c6b47] rounded-lg shadow-xs"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* =========================================================================
          3. HERO SECTION (Editorial Composition: Typography + Authentic Craft + 1 Workflow UI)
          ========================================================================= */}
      <section className="py-10 sm:py-14 md:py-20 overflow-hidden bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Problem & Value proposition */}
            <ScrollReveal direction="up" className="lg:col-span-5 space-y-5 sm:space-y-6">
              <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
                Bespoke Atelier Management
              </span>

              <h1 className="font-serif-heading text-[2.85rem] sm:text-[3.75rem] lg:text-[4.5rem] font-medium tracking-[-0.02em] text-[#1c1917] leading-[1.03]">
                Your orders. <br />
                Your customers. <br />
                Your deadlines. <br />
                <span className="text-[#c69b6d] font-normal italic">Under control.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#57534e] max-w-xl leading-relaxed font-normal">
                TailorMate helps tailoring businesses manage customers, measurements, clothing orders, payments and staff from one simple workspace.
              </p>

              {/* Action Buttons with Restrained 8px Radius */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
                <Link
                  href="/auth/get-started"
                  className="px-7 py-3.5 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-semibold text-base sm:text-lg transition-colors inline-flex items-center gap-2.5 leading-none shadow-xs"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <a
                  href="#how-it-works"
                  className="px-6 py-3.5 rounded-lg bg-[#ffffff] hover:bg-[#f7f2eb] text-[#1c1917] border border-[#ede5da] font-semibold text-base sm:text-lg transition-colors inline-flex items-center gap-2.5 leading-none"
                >
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Grounded Craft Assurance */}
              <p className="text-sm text-[#78716c] pt-1 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c69b6d] shrink-0" />
                <span>Purpose-built for independent tailors and bespoke ateliers.</span>
              </p>
            </ScrollReveal>

            {/* Right Column: Authentic Workshop Photo + ONE Meaningful TailorMate Workflow Element */}
            <div className="lg:col-span-7 relative w-full pt-4 lg:pt-0">
              
              {/* Authentic Tailoring Artisan Photography */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-[#ede5da] bg-[#ffffff]">
                <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] bg-[#faf7f2]">
                  <Image 
                    src="/images/hero_tailor_artisan.jpg" 
                    alt="Master tailor crafting garments at sewing machine workstation" 
                    fill 
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-[center_28%]" 
                    priority 
                  />
                  {/* Subtle tonal gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* ONE Anchored Meaningful TailorMate Workflow Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-6 max-w-full sm:max-w-[360px] bg-[#ffffff] border border-[#ede5da] rounded-xl p-4 sm:p-5 shadow-lg space-y-3 z-20">
                <div className="flex items-center justify-between border-b border-[#ede5da] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47] uppercase tracking-wider">ORDER #102</span>
                    <span className="text-xs text-[#78716c]">•</span>
                    <span className="text-xs font-medium text-[#78716c]">Due Tomorrow</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c]">
                    Sewing Station
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#1c1917] leading-snug">Mavis Ambe</h4>
                  <p className="text-xs sm:text-sm text-[#57534e] mt-0.5">2 Senator Shirts · 2 Trousers (Dark Navy Wool)</p>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <div className="flex justify-between text-xs text-[#78716c]">
                    <span>Assigned: <strong className="text-[#1c1917]">Juspen Ndum</strong></span>
                    <span className="font-semibold text-[#8c6b47]">80% Complete</span>
                  </div>
                  <div className="w-full bg-[#ede5da] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#c69b6d] h-full rounded-full w-4/5" />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ede5da] flex items-center justify-between text-xs text-[#57534e]">
                  <span>Deposit: <strong className="text-[#1c1917]">50,000 FCFA</strong></span>
                  <span>Balance: <strong className="text-[#8c6b47]">35,000 FCFA</strong></span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PROBLEM SECTION: THE REALITY OF THE WORKSHOP (Editorial Split Layout)
          "Running a tailoring business shouldn't mean remembering everything."
          ========================================================================= */}
      <section id="for-tailors" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 bg-[#f7f2eb] border-y border-[#ede5da]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Authentic Workshop Documentary Photo */}
            <ScrollReveal direction="right" className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#ede5da] shadow-sm bg-[#ffffff]">
                <div className="relative h-[420px] sm:h-[480px] lg:h-[540px] w-full">
                  <Image 
                    src="/images/workshop_reality_tailor.jpg" 
                    alt="Master artisan sewing garments at Butterfly machine in busy atelier workshop" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[center_35%]" 
                  />
                  {/* Subtle tonal gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              <p className="text-xs text-[#78716c] mt-2.5 flex items-center justify-between">
                <span>The reality of active atelier workshops: Multiple orders, manual ledgers, tight deadlines.</span>
              </p>
            </ScrollReveal>

            {/* Right: Editorial Typography & Structured Breakdown (Zero Generic Cards) */}
            <ScrollReveal direction="left" delay={100} className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="space-y-3.5">
                <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
                  The Reality of the Workshop
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-[3.15rem] font-medium text-[#1c1917] leading-[1.12]">
                  Running a tailoring business shouldn&apos;t mean remembering everything.
                </h2>
                <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
                  As your client volume grows, orders become harder to track. Specifications get buried in notebooks, payments become difficult to follow, and artisans may not always know which garment needs priority next.
                </p>
              </div>

              {/* Editorial Structured Points with Hairline Dividers */}
              <div className="divide-y divide-[#ede5da] border-y border-[#ede5da]">
                
                <div className="py-4 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">01</span>
                    <h3 className="text-lg font-bold text-[#1c1917]">Too many scattered orders</h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#57534e] pl-7 leading-relaxed">
                    Keep every customer&apos;s style preferences, sizing records, and delivery promises organized in one place instead of flipping through paper notebooks and WhatsApp chats.
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">02</span>
                    <h3 className="text-lg font-bold text-[#1c1917]">Surprise deadline emergencies</h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#57534e] pl-7 leading-relaxed">
                    Know which garments are approaching collection dates days in advance, giving your atelier time to resolve missing trims or unfinished seams before the customer arrives.
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">03</span>
                    <h3 className="text-lg font-bold text-[#1c1917]">Artisan coordination & bottlenecks</h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#57534e] pl-7 leading-relaxed">
                    Delegate cutting, assembly, and hand-finishing to specific staff so accountability is clear and everyone knows which workstation task comes next.
                  </p>
                </div>

                <div className="py-4 space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">04</span>
                    <h3 className="text-lg font-bold text-[#1c1917]">Payment disputes & cashflow confusion</h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#57534e] pl-7 leading-relaxed">
                    Record advance deposits, garment additions, and remaining balances in FCFA, eliminating uncomfortable disputes when garments are picked up.
                  </p>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SOLUTION SECTION: ONE WORKSPACE (Realistic Atelier Command Center)
          "Everything your workshop needs, in one place."
          ========================================================================= */}
      <section id="features" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          
          <ScrollReveal direction="up" className="max-w-2xl space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
              Atelier Command Center
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Everything your workshop needs, in one place.
            </h2>
            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
              From client intake to final handover, TailorMate replaces scattered notebooks with a calm, high-precision operational ledger.
            </p>
          </ScrollReveal>

          {/* Realistic Chief Tailor Desktop Interface Mockup */}
          <ScrollReveal direction="up" delay={100} className="rounded-xl sm:rounded-2xl bg-[#ffffff] border border-[#ede5da] shadow-sm overflow-hidden">
            
            {/* Mockup Top Header: Real Atelier Context */}
            <div className="bg-[#1c1917] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden bg-[#292524] border border-white/20 flex items-center justify-center shrink-0 p-1">
                  <Image 
                    src="/images/tailormate_icon.png" 
                    alt="TailorMate Atelier" 
                    fill 
                    className="object-contain p-0.5" 
                  />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-bold block leading-none">Sally&apos;s Bespoke Atelier — Douala</strong>
                  <span className="text-xs text-[#c69b6d] font-medium mt-1 block">Chief Tailor Control Center · Active Shift</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="text-[#a8a19b] hidden md:inline font-mono">Thursday, Sep 18, 2026</span>
                <Link 
                  href="/auth/signin" 
                  className="px-4 py-2 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Open Live Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Structured Atelier Metrics Ribbon (Clean, Integrated Grid - Zero Cluttered Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#ede5da] border-b border-[#ede5da] bg-[#faf7f2]">
              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-xs text-[#78716c] uppercase font-bold tracking-wider block">Registered Clients</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] block tracking-tight">128</strong>
                <span className="text-xs text-[#57534e] block">Anatomical profiles</span>
              </div>

              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-xs text-[#78716c] uppercase font-bold tracking-wider block">Active Orders</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] block tracking-tight">34</strong>
                <span className="text-xs text-[#8c6b47] font-semibold block">In active production</span>
              </div>

              <div className="p-4 sm:p-5 space-y-1 bg-[#fff8f8]">
                <span className="text-xs text-[#b91c1c] uppercase font-bold tracking-wider block">Due Today</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#b91c1c] block tracking-tight">3</strong>
                <span className="text-xs text-[#b91c1c] font-medium block">Urgent collection</span>
              </div>

              <div className="p-4 sm:p-5 space-y-1">
                <span className="text-xs text-[#c2410c] uppercase font-bold tracking-wider block">Due in 3 Days</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-[#c2410c] block tracking-tight">7</strong>
                <span className="text-xs text-[#57534e] block">Finishing station</span>
              </div>

              <div className="col-span-2 md:col-span-1 p-4 sm:p-5 space-y-1">
                <span className="text-xs text-[#78716c] uppercase font-bold tracking-wider block">Uncollected Balance</span>
                <strong className="text-xl sm:text-2xl font-bold text-[#1c1917] block tracking-tight">285,000 FCFA</strong>
                <span className="text-xs text-[#78716c] block">Across 14 orders</span>
              </div>
            </div>

            {/* Orders Needing Immediate Attention Queue */}
            <div className="p-4 sm:p-6 space-y-4 bg-[#ffffff]">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]" />
                  <strong className="text-base sm:text-lg font-bold text-[#1c1917]">
                    Orders Needing Immediate Attention
                  </strong>
                </div>
                <span className="text-xs text-[#b91c1c] font-semibold bg-[#fee2e2] px-2.5 py-1 rounded">
                  2 Approaching Deadlines
                </span>
              </div>

              <div className="divide-y divide-[#ede5da] border border-[#ede5da] rounded-lg overflow-hidden">
                
                {/* Row 1 */}
                <div className="p-3.5 sm:p-4 bg-[#ffffff] hover:bg-[#faf7f2] transition-colors flex items-center justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#8c6b47]">ORDER #102</span>
                      <span className="text-[#ede5da]">|</span>
                      <strong className="text-sm sm:text-base font-bold text-[#1c1917]">Mavis Ambe</strong>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c] font-semibold">
                        Critical Alert
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57534e]">
                      2 Senator Shirts, 2 Trousers • Due: <strong className="text-[#1c1917]">Tomorrow 4:00 PM</strong> • Station: <span className="text-[#8c6b47] font-semibold">Juspen (Sewing)</span> • Deposit: 50,000 / 85,000 FCFA
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link 
                      href="/auth/signin" 
                      className="px-3.5 py-1.5 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs font-semibold transition-colors"
                    >
                      View Order
                    </Link>
                    <a 
                      href="https://wa.me/?text=Hello%20Mavis%2C%20an%20update%20on%20your%20TailorMate%20order%20%23102"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#ffffff] border border-[#ede5da] hover:bg-[#f7f2eb] text-[#1c1917] text-xs font-semibold transition-colors"
                    >
                      WhatsApp Update
                    </a>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="p-3.5 sm:p-4 bg-[#ffffff] hover:bg-[#faf7f2] transition-colors flex items-center justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#8c6b47]">ORDER #108</span>
                      <span className="text-[#ede5da]">|</span>
                      <strong className="text-sm sm:text-base font-bold text-[#1c1917]">Gwen Tangwa</strong>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e] font-semibold">
                        Needs Attention
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57534e]">
                      Silk Evening Gala Dress • Due: <strong className="text-[#1c1917]">Today 6:00 PM</strong> • Station: <span className="text-[#d97706] font-semibold">Nelson (Cutting)</span> • Deposit: 20,000 / 45,000 FCFA
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link 
                      href="/auth/signin" 
                      className="px-3.5 py-1.5 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs font-semibold transition-colors"
                    >
                      View Order
                    </Link>
                    <a 
                      href="https://wa.me/?text=Hello%20Gwen%2C%20an%20update%20on%20your%20TailorMate%20order%20%23108"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#ffffff] border border-[#ede5da] hover:bg-[#f7f2eb] text-[#1c1917] text-xs font-semibold transition-colors"
                    >
                      WhatsApp Update
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          6. STEP-BY-STEP WORKSHOP PROCESS SECTION (Atelier Production Pipeline)
          "From customer intake to final collection, everything stays organized."
          ========================================================================= */}
      <section id="how-it-works" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 bg-[#f7f2eb] border-y border-[#ede5da]">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <ScrollReveal direction="up" className="max-w-2xl space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
              Atelier Production Pipeline
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              From customer intake to final collection.
            </h2>
            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
              TailorMate organizes your atelier into five transparent production stages, so every cutter, sewist, and apprentice knows their exact responsibility.
            </p>
          </ScrollReveal>

          {/* 5-Stage Sequential Production Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Stage 01 */}
            <ScrollReveal direction="up" delay={50} className="bg-[#ffffff] rounded-xl border border-[#ede5da] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-[#faf7f2]">
                  <Image 
                    src="/images/how_it_works_intake_app.jpg" 
                    alt="Seamstress taking accurate customer measurements in atelier" 
                    fill 
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">PHASE 01</span>
                    <span className="text-[#ede5da]">|</span>
                    <span className="text-xs text-[#78716c] font-medium">Digital Sizing Vault</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1917]">
                    Record customer & sizing specs
                  </h3>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Save client contact information, body measurements, and posture notes once. Stored permanently for instant access whenever they return for future bespoke commissions.
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#ede5da] bg-[#faf7f2] text-xs font-medium text-[#78716c]">
                Contact details & anatomical history
              </div>
            </ScrollReveal>

            {/* Stage 02 */}
            <ScrollReveal direction="up" delay={100} className="bg-[#ffffff] rounded-xl border border-[#ede5da] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-[#faf7f2]">
                  <Image 
                    src="/images/how_it_works_order.jpg" 
                    alt="Tailor reviewing itemized garment styling details with customer" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">PHASE 02</span>
                    <span className="text-[#ede5da]">|</span>
                    <span className="text-xs text-[#78716c] font-medium">Itemized Ledger</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1917]">
                    Itemize garment orders
                  </h3>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Break down every individual garment item, fabric details, unit pricing, collection deadline, and initial deposit in FCFA without lumped descriptions.
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#ede5da] bg-[#faf7f2] text-xs font-medium text-[#78716c]">
                Multi-garment breakdown & deposit receipt
              </div>
            </ScrollReveal>

            {/* Stage 03 */}
            <ScrollReveal direction="up" delay={150} className="bg-[#ffffff] rounded-xl border border-[#ede5da] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-[#faf7f2]">
                  <Image 
                    src="/images/how_it_works_cutting.jpg" 
                    alt="Master artisan drafting and cutting pattern pieces" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_35%]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">PHASE 03</span>
                    <span className="text-[#ede5da]">|</span>
                    <span className="text-xs text-[#78716c] font-medium">Station Delegation</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1917]">
                    Assign work to artisan stations
                  </h3>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Delegate specific workshop roles — pattern cutting to Nelson, machine sewing to Juspen, and finishing to Wansi — so accountability across the team is clear.
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#ede5da] bg-[#faf7f2] text-xs font-medium text-[#78716c]">
                Role assignments & workstation accountability
              </div>
            </ScrollReveal>

            {/* Stage 04 */}
            <ScrollReveal direction="up" delay={200} className="bg-[#ffffff] rounded-xl border border-[#ede5da] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-[#faf7f2]">
                  <Image 
                    src="/images/how_it_works_track_progress.jpg" 
                    alt="Artisans inspecting garment assembly progress in workshop" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_40%]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">PHASE 04</span>
                    <span className="text-[#ede5da]">|</span>
                    <span className="text-xs text-[#78716c] font-medium">Production Control</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1917]">
                    Track workstation progress live
                  </h3>
                  <p className="text-sm text-[#57534e] leading-relaxed">
                    Staff update task statuses in real time from their mobile or workstation screen. If an artisan flags a bottleneck, the Chief Tailor is immediately alerted.
                  </p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-[#ede5da] bg-[#faf7f2] text-xs font-medium text-[#78716c]">
                Live station status & bottleneck alerts
              </div>
            </ScrollReveal>

            {/* Stage 05 */}
            <ScrollReveal direction="up" delay={250} className="md:col-span-2 lg:col-span-2 bg-[#ffffff] rounded-xl border border-[#ede5da] overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="grid md:grid-cols-12 items-center">
                <div className="relative h-48 sm:h-56 md:h-full md:col-span-5 w-full bg-[#faf7f2]">
                  <Image 
                    src="/images/undp_hero_doris_hd.jpg" 
                    alt="Master artisan tailor presenting completed bespoke creation for client fitting" 
                    fill 
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-[center_20%]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/30 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 sm:p-6 md:p-8 md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8c6b47]">PHASE 05</span>
                    <span className="text-[#ede5da]">|</span>
                    <span className="text-xs text-[#78716c] font-medium">Fitting & Settlement</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917]">
                    Deliver on time & settle balances
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                    Conduct final fittings with confidence, notify customers their garments are ready via WhatsApp, and collect remaining balances with 100% financial clarity.
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs text-[#78716c] flex-wrap">
                    <span className="px-2.5 py-1 rounded bg-[#faf7f2] border border-[#ede5da]">Final Payment Reconciliation</span>
                    <span className="px-2.5 py-1 rounded bg-[#faf7f2] border border-[#ede5da]">Pickup Notification</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. PROACTIVE DEADLINE PROTECTION (Split Screen: Urgent Action UI Ticket)
          "Know about delays before your customer does."
          ========================================================================= */}
      <section id="deadlines" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          <ScrollReveal direction="right" className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
              Proactive Deadline Protection
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Know about delays before your customer does.
            </h2>

            <p className="text-lg sm:text-xl text-[#1c1917] font-medium leading-relaxed">
              An order due tomorrow shouldn&apos;t become a surprise tomorrow morning.
            </p>

            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
              TailorMate monitors upcoming deadlines and highlights orders that are still in progress. This gives you time to inspect assembly, speak with your staff, and contact the customer if an adjustment requires more time.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link 
                href="/auth/signin"
                className="px-6 py-3 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-white text-sm sm:text-base font-semibold inline-flex items-center gap-2.5 transition-colors"
              >
                <span>Try Deadline Monitor</span>
                <ArrowRight className="w-4 h-4 text-[#c69b6d]" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive UI Deadline Ticket with Progress */}
          <ScrollReveal direction="left" delay={150} className="lg:col-span-6">
            <div className="bg-[#ffffff] p-6 sm:p-8 rounded-xl border border-[#ede5da] shadow-sm space-y-5 max-w-lg mx-auto">
              
              <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5 flex-wrap gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#8c6b47] uppercase tracking-wider block">ORDER #102</span>
                  <strong className="text-xl sm:text-2xl font-bold text-[#1c1917]">Mavis Ambe</strong>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#fee2e2] text-[#b91c1c]">
                  Expected: Tomorrow, 4:00 PM
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm sm:text-base font-bold text-[#1c1917]">2 Senator Shirts · 2 Trousers (Dark Navy Wool)</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm text-[#78716c]">
                    <span>Machine Sewing Completion</span>
                    <span className="font-bold text-[#1c1917]">80%</span>
                  </div>
                  <div className="w-full bg-[#ede5da] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#c69b6d] h-full rounded-full w-4/5 transition-all duration-1000" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#fff7ed] border border-[#ffedd5] flex items-center gap-2.5 text-xs sm:text-sm text-[#9a3412]">
                <AlertCircle className="w-4 h-4 text-[#ea580c] shrink-0" />
                <span className="font-medium">Assembly in progress · Hem finishing & buttonholes remaining</span>
              </div>

              <div className="flex flex-col xs:flex-row items-center gap-3 pt-1">
                <Link
                  href="/auth/signin"
                  className="w-full xs:flex-1 py-2.5 text-center text-xs sm:text-sm font-semibold rounded-lg bg-[#1c1917] hover:bg-[#292524] text-white transition-colors"
                >
                  Review Order Spec
                </Link>
                <a
                  href="https://wa.me/?text=Hello%20Mavis%2C%20an%20update%20on%20your%20TailorMate%20order%20%23102"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full xs:flex-1 py-2.5 text-center text-xs sm:text-sm font-semibold rounded-lg bg-[#ffffff] border border-[#ede5da] hover:bg-[#f7f2eb] text-[#1c1917] transition-colors"
                >
                  Send WhatsApp Update
                </a>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          8. STAFF MANAGEMENT SECTION (Team Photo + Restrained Station Switcher)
          "Everyone knows what they're working on."
          ========================================================================= */}
      <section id="staff" className="py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 bg-[#f7f2eb] border-y border-[#ede5da]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Authentic Workshop Team Photo */}
          <ScrollReveal direction="right" className="lg:col-span-6 relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#ede5da] shadow-sm bg-[#ffffff]">
            <div className="relative h-[320px] sm:h-[400px] lg:h-[440px] w-full bg-[#faf7f2]">
              <Image 
                src="/images/team_coordination_workshop.jpg" 
                alt="Tailoring workshop team collaborating at individual sewing stations" 
                fill 
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_30%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Interactive Staff Workstation Switcher */}
          <ScrollReveal direction="left" delay={150} className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#8c6b47] block">
              Team Coordination
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Everyone knows what they&apos;re working on.
            </h2>

            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
              Assign garments to your artisans and give every staff member a clear view of their immediate responsibilities. The Chief Tailor monitors the entire atelier; artisans see the garments assigned to their station.
            </p>

            {/* Staff Station Segment Tabs (Restrained 8px radius, no bubbly floating pills) */}
            <div className="inline-flex p-1 rounded-lg bg-[#ffffff] border border-[#ede5da] gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedStaff("juspen")}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors ${selectedStaff === "juspen" ? "bg-[#c69b6d] text-white" : "text-[#57534e] hover:text-[#1c1917]"}`}
              >
                Juspen (Sewing)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStaff("nelson")}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors ${selectedStaff === "nelson" ? "bg-[#c69b6d] text-white" : "text-[#57534e] hover:text-[#1c1917]"}`}
              >
                Nelson (Cutting)
              </button>
              <button
                type="button"
                onClick={() => setSelectedStaff("wansi")}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors ${selectedStaff === "wansi" ? "bg-[#c69b6d] text-white" : "text-[#57534e] hover:text-[#1c1917]"}`}
              >
                Wansi (Finishing)
              </button>
            </div>

            {/* Dynamic Staff Assignment Ticket */}
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-xl border border-[#ede5da] shadow-sm space-y-4 max-w-md">
              
              {selectedStaff === "juspen" && (
                <>
                  <div className="flex items-center justify-between border-b border-[#ede5da] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#8c6b47] block">
                        JUSPEN NDUM — STATION 02 (SEWING)
                      </span>
                      <span className="text-xs text-[#78716c]">3 Active Garment Assignments</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c]">
                      Due: Tomorrow
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#57534e]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">ORDER #102 · Mavis Ambe</span>
                      <span className="font-semibold text-[#8c6b47]">In Assembly</span>
                    </div>
                    <p>2 Senator Shirts · 2 Trousers</p>
                    <div className="pt-1 flex items-center justify-between text-xs text-[#78716c] border-t border-[#ede5da]/60">
                      <span>Next in Queue: Order #114 (Emmanuel)</span>
                      <span>Kaftan</span>
                    </div>
                  </div>
                </>
              )}

              {selectedStaff === "nelson" && (
                <>
                  <div className="flex items-center justify-between border-b border-[#ede5da] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#8c6b47] block">
                        NELSON TAH — STATION 01 (CUTTING)
                      </span>
                      <span className="text-xs text-[#78716c]">2 Active Fabric Assignments</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e]">
                      Due: Today
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#57534e]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">ORDER #108 · Gwen Tangwa</span>
                      <span className="font-semibold text-emerald-700">Pattern Cut</span>
                    </div>
                    <p>Silk Evening Gala Dress (Emerald Satin)</p>
                    <div className="pt-1 flex items-center justify-between text-xs text-[#78716c] border-t border-[#ede5da]/60">
                      <span>Next in Queue: Order #120 (Roland)</span>
                      <span>3-Piece Toghu</span>
                    </div>
                  </div>
                </>
              )}

              {selectedStaff === "wansi" && (
                <>
                  <div className="flex items-center justify-between border-b border-[#ede5da] pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-[#8c6b47] block">
                        WANSI ERIC — STATION 03 (FINISHING)
                      </span>
                      <span className="text-xs text-[#78716c]">4 Active Pressing & Detailing</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f7f2eb] text-[#78716c]">
                      Due: Sep 20
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#57534e]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">ORDER #115 · Senorita</span>
                      <span className="font-semibold text-[#d97706]">Embroidery Detailing</span>
                    </div>
                    <p>Senator Hand-Embroidery & Buttonholes</p>
                    <div className="pt-1 flex items-center justify-between text-xs text-[#78716c] border-t border-[#ede5da]/60">
                      <span>Next in Queue: Order #122 (Clarisse)</span>
                      <span>Boubou Hemming</span>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-1">
                <Link 
                  href="/auth/signin" 
                  className="w-full py-2.5 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-white text-xs sm:text-sm font-semibold text-center block transition-colors"
                >
                  View Full Workshop Queue →
                </Link>
              </div>

            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          9. CUSTOMER COMMUNICATION (WhatsApp Smartphone UI Mockup)
          "Keep your customers informed."
          ========================================================================= */}
      <section id="customers" className="py-12 sm:py-16 md:py-24 px-3.5 sm:px-6 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-3.5">
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#c69b6d]">
              Customer Communication
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Keep your customers informed.
            </h2>
            <p className="text-lg sm:text-xl text-[#57534e] leading-relaxed max-w-xl mx-auto">
              Give customers clear updates instead of making them wonder when their clothes will be ready.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="space-y-6 sm:space-y-8">
            {/* Interactive Message Stage Switcher */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-lg bg-white border border-[#ede5da] shadow-xs gap-1 flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => setChatMessageStage("registered")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${chatMessageStage === "registered" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#57534e] hover:text-[#1c1917]"}`}
                >
                  1. Registration
                </button>
                <button
                  type="button"
                  onClick={() => setChatMessageStage("ready")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${chatMessageStage === "ready" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#57534e] hover:text-[#1c1917]"}`}
                >
                  2. Ready for Collection
                </button>
                <button
                  type="button"
                  onClick={() => setChatMessageStage("delay")}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${chatMessageStage === "delay" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#57534e] hover:text-[#1c1917]"}`}
                >
                  3. Courtesy Delay Update
                </button>
              </div>
            </div>

            {/* Realistic WhatsApp Smartphone Mockup */}
            <div className="w-full max-w-[320px] sm:max-w-sm mx-auto bg-[#1c1917] p-3 sm:p-3.5 rounded-[28px] sm:rounded-[32px] shadow-xl border border-[#ede5da]">
              <div className="bg-[#efeae2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-inner flex flex-col h-[450px] sm:h-[480px]">
                
                {/* WhatsApp Header */}
                <div className="bg-[#075e54] text-white p-3.5 sm:p-4 flex items-center gap-3">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#1c1917] border border-white/20 flex items-center justify-center shrink-0 shadow-xs">
                    <Image 
                      src="/images/tailormate_brand_logo.png" 
                      alt="TailorMate Atelier" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="text-sm flex-1 min-w-0">
                    <strong className="block leading-tight truncate font-bold">TailorMate Atelier</strong>
                    <span className="text-xs text-emerald-100 flex items-center gap-1 font-medium mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Online
                    </span>
                  </div>
                  <span className="text-xs text-emerald-200 shrink-0">10:42 AM</span>
                </div>

                {/* Chat Bubble Area */}
                <div className="p-3.5 sm:p-4 flex-1 overflow-y-auto space-y-3 flex flex-col justify-end text-sm">
                  
                  {chatMessageStage === "registered" && (
                    <div className="bg-[#ffffff] p-3.5 sm:p-4 rounded-xl rounded-tl-xs shadow-xs space-y-1.5 border border-[#e0dad0] max-w-[95%]">
                      <span className="text-xs font-bold text-[#075e54] uppercase tracking-wider block">TAILORMATE</span>
                      <p className="font-bold text-[#1c1917]">Your order #102 has been registered.</p>
                      <p className="text-[#57534e]">2 Shirts<br />2 Trousers</p>
                      <p className="text-[#8c6b47] font-semibold text-xs sm:text-sm">Expected collection:<br />September 20</p>
                      <div className="flex items-center justify-between text-xs text-[#78716c] pt-1">
                        <span>We&apos;ll notify you when ready.</span>
                        <span className="text-[#075e54] font-bold">10:42 AM ✓✓</span>
                      </div>
                    </div>
                  )}

                  {chatMessageStage === "ready" && (
                    <div className="bg-[#ffffff] p-3.5 sm:p-4 rounded-xl rounded-tl-xs shadow-xs space-y-1.5 border border-[#e0dad0] max-w-[95%]">
                      <span className="text-xs font-bold text-[#075e54] uppercase tracking-wider block">TAILORMATE</span>
                      <p className="font-bold text-emerald-800">Your order #102 is ready for collection.</p>
                      <p className="text-[#57534e] text-xs sm:text-sm">Thank you for choosing your tailoring business. We look forward to your fitting!</p>
                      <div className="flex items-center justify-end text-xs text-[#78716c] pt-1">
                        <span className="text-[#075e54] font-bold">10:42 AM ✓✓</span>
                      </div>
                    </div>
                  )}

                  {chatMessageStage === "delay" && (
                    <div className="bg-[#ffffff] p-3.5 sm:p-4 rounded-xl rounded-tl-xs shadow-xs space-y-1.5 border border-[#e0dad0] max-w-[95%]">
                      <span className="text-xs font-bold text-[#c2410c] uppercase tracking-wider block">TAILORMATE COURTESY</span>
                      <p className="font-bold text-[#1c1917]">Your order #102 needs additional time to complete.</p>
                      <p className="text-[#8c6b47] font-semibold text-xs sm:text-sm">New expected collection:<br />September 22.</p>
                      <p className="text-xs sm:text-sm text-[#57534e]">We apologize for the delay.</p>
                      <div className="flex items-center justify-end text-xs text-[#78716c] pt-1">
                        <span className="text-[#075e54] font-bold">10:42 AM ✓✓</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Phone Bar */}
                <div className="bg-[#f0f0f0] p-3 flex items-center gap-2 border-t border-[#e0e0e0] text-sm text-[#78716c]">
                  <span className="px-3.5 py-1.5 rounded-full bg-white flex-1 text-xs sm:text-sm truncate">Message TailorMate...</span>
                  <div className="w-8 h-8 rounded-full bg-[#075e54] flex items-center justify-center text-white shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>

            <p className="text-center text-sm text-[#78716c] px-4">
              Automated WhatsApp messaging is currently scheduled on the TailorMate integration roadmap.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          10. MEASUREMENTS SECTION (Close-up Photo + Overlaid Sizing UI)
          "Your customers' measurements, always within reach."
          ========================================================================= */}
      <section id="measurements" className="py-12 sm:py-16 md:py-24 px-3.5 sm:px-6 bg-[#f7f2eb] border-y border-[#ede5da]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Close-up Real Photo */}
          <ScrollReveal direction="right" className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-sm border border-[#ede5da] bg-[#ffffff]">
            <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] w-full bg-[#faf7f2]">
              <Image 
                src="/images/digital_sizing_vault_tailor.jpg" 
                alt="Artisan tailor measuring and assembling bespoke garment fabric" 
                fill 
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_40%]" 
              />
            </div>
          </ScrollReveal>

          {/* Measurements UI Card */}
          <ScrollReveal direction="left" delay={150} className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#c69b6d]">
              Digital Sizing Vault
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Your customers&apos; measurements, always within reach.
            </h2>

            <p className="text-lg sm:text-xl text-[#57534e] leading-relaxed">
              Store measurements digitally and keep a history for returning customers. No more searching through old notebooks to find the right measurements.
            </p>

            {/* Sizing Card */}
            <div className="bg-[#ffffff] p-6 sm:p-7 rounded-xl border border-[#ede5da] shadow-sm space-y-5 max-w-md">
              
              <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5 flex-wrap gap-2">
                <div>
                  <strong className="text-xl sm:text-2xl font-bold text-[#1c1917] block">MAVIS</strong>
                  <span className="text-xs text-[#78716c]">Last measured: September 12, 2026</span>
                </div>
                <div className="flex items-center gap-1 bg-[#f7f2eb] p-1 rounded-lg border border-[#ede5da] text-xs">
                  <button
                    type="button"
                    onClick={() => setMeasurementYear("2026")}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${measurementYear === "2026" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#78716c] hover:text-[#1c1917]"}`}
                  >
                    2026
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeasurementYear("2025")}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${measurementYear === "2025" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#78716c] hover:text-[#1c1917]"}`}
                  >
                    2025
                  </button>
                </div>
              </div>

              {/* Anatomical Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-sm">
                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Chest</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">{measurementYear === "2026" ? "102 cm" : "100 cm"}</strong>
                </div>

                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Waist</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">{measurementYear === "2026" ? "88 cm" : "86 cm"}</strong>
                </div>

                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Shoulder</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">45 cm</strong>
                </div>

                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Sleeve</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">62 cm</strong>
                </div>

                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Trouser</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">{measurementYear === "2026" ? "104 cm" : "103 cm"}</strong>
                </div>

                <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da]">
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">Inseam</span>
                  <strong className="text-sm sm:text-base text-[#1c1917] font-bold block mt-0.5">81 cm</strong>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#ede5da] flex items-center justify-between text-sm">
                <span className="text-xs text-[#78716c]">Historical Records Linked</span>
                <Link href="/auth/signin" className="text-xs font-semibold text-[#c69b6d] hover:text-[#8c6b47]">
                  Open Vault →
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          11. PAYMENTS SECTION (Interactive 0% -> 59% Animated Progress Bar)
          "Know what's been paid. Know what's left."
          ========================================================================= */}
      <section id="pricing" className="py-12 sm:py-16 md:py-24 px-3.5 sm:px-6 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Card Mockup */}
          <ScrollReveal direction="right" className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#ffffff] p-6 sm:p-7 rounded-xl border border-[#ede5da] shadow-sm space-y-5 max-w-md mx-auto">
              
              <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5 flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-[#78716c] uppercase tracking-wider block">ORDER #102</span>
                  <strong className="text-xl sm:text-2xl font-bold text-[#1c1917]">Payment Ledger</strong>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#fef3c7] text-[#92400e]">
                  Partially Paid
                </span>
              </div>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-[#57534e]">Total</span>
                  <strong className="text-[#1c1917] font-bold">85,000 FCFA</strong>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span className="font-medium">Paid Deposit</span>
                  <span className="font-bold">50,000 FCFA</span>
                </div>
                <div className="flex justify-between text-[#b91c1c]">
                  <span className="font-medium">Remaining</span>
                  <span className="font-bold">35,000 FCFA</span>
                </div>
              </div>

              {/* Dynamic Animated Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-[#78716c]">
                  <span>Payment progress</span>
                  <span className="font-bold text-[#1c1917]">{paymentProgress}%</span>
                </div>
                <div className="w-full bg-[#ede5da] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#c69b6d] h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${paymentProgress}%` }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/auth/signin"
                  className="w-full py-3 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-white text-xs sm:text-sm font-semibold text-center block transition-colors shadow-xs"
                >
                  Record Payment in Dashboard
                </Link>
              </div>

            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={150} className="lg:col-span-6 space-y-4 sm:space-y-6 order-1 lg:order-2">
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#c69b6d]">
              Cashflow Clarity
            </span>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
              Know what&apos;s been paid. Know what&apos;s left.
            </h2>

            <p className="text-lg sm:text-xl text-[#57534e] leading-relaxed">
              Record deposits, partial payments and final payments against each order so your payment records stay connected to the work.
            </p>

            <p className="text-base sm:text-lg text-[#1c1917] font-semibold leading-relaxed">
              Eliminate awkward payment disputes at collection time by keeping transparent balance records for both tailor and client.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          14. FULL-WIDTH "REAL WORKSHOP" SECTION (The Visual Breathing Point)
          ========================================================================= */}
      <section className="relative py-16 sm:py-28 px-3.5 sm:px-6 overflow-hidden bg-[#1c1917] isolate text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/toghu_atelier_bg.jpg" 
            alt="Traditional Cameroonian Toghu fabric textile pattern" 
            fill 
            unoptimized
            sizes="100vw"
            className="object-cover opacity-35" 
          />
          {/* Warm Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/90 via-[#1c1917]/75 to-[#1c1917]/90" />
        </div>

        <ScrollReveal direction="up" className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#c69b6d] block">
            Crafted for Working Ateliers
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
            Built around the way your workshop actually works.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#ede5da] max-w-2xl mx-auto leading-relaxed font-normal">
            From the first measurement to the final fitting, TailorMate keeps your work organized without getting in the way of how you run your business.
          </p>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          12. FINAL CALL TO ACTION (CTA)
          "Bring your workshop under control."
          ========================================================================= */}
      <section className="py-14 sm:py-20 px-3.5 sm:px-6 bg-[#f7f2eb] border-t border-[#ede5da]">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1c1917] leading-tight">
            Bring your workshop under control.
          </h2>
          <p className="text-lg sm:text-xl text-[#57534e] max-w-xl mx-auto leading-relaxed">
            Manage your customers, orders, staff, payments and deadlines with TailorMate.
          </p>

          <div className="pt-1 sm:pt-2">
            <Link
              href="/auth/get-started"
              className="px-7 py-3.5 rounded-lg bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-semibold text-base shadow-sm transition-all hover:-translate-y-0.5 inline-flex items-center gap-2.5 leading-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-[#78716c]">
            Built for tailoring businesses. Designed for the way modern workshops work.
          </p>
        </ScrollReveal>
      </section>

      {/* =========================================================================
          13. FOOTER (Zero Dead Links & Social Media Channels)
          ========================================================================= */}
      <footer className="bg-[#1a1716] text-[#e5ded7] pt-12 sm:pt-16 pb-10 sm:pb-12 px-3.5 sm:px-6 border-t border-[#2e2a28] mt-auto">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm sm:text-[15px]">
            
            {/* Brand Column with Social Media Icons */}
            <div className="sm:col-span-2 md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3.5 sm:gap-4 group">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[#383330] bg-[#1c1917] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 p-1.5">
                  <Image 
                    src="/images/tailormate_icon.png" 
                    alt="TailorMate - Made for modern tailoring" 
                    fill 
                    className="object-contain p-1" 
                  />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white block tracking-wider uppercase leading-none">
                    TAILORMATE
                  </span>
                  <span className="text-sm text-[#c69b6d] tracking-widest uppercase block mt-1.5 font-bold">
                    Made for modern tailoring
                  </span>
                </div>
              </Link>
              <p className="text-[#a8a19b] text-base leading-relaxed max-w-sm">
                Modern tools for modern tailoring businesses. Manage customers. Track orders. Keep your deadlines under control.
              </p>

              {/* Social Media Channels */}
              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-bold text-[#c69b6d] uppercase tracking-wider block">
                  Connect with our tailor community
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on Facebook"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on Instagram"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href="https://x.com/tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on X"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="X (Twitter)"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on TikTok"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.38a6.34 6.34 0 0 0-1.1-.1 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.18 8.18 0 0 0 4.02 1.45V6.69z" />
                    </svg>
                  </a>

                  {/* Threads */}
                  <a
                    href="https://threads.net/@tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on Threads"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="Threads"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.001 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12.001 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm4.78 16.666c-.63.468-1.458.74-2.456.8-1.512.092-2.783-.357-3.666-1.299-.868-.925-1.307-2.269-1.307-4.001 0-1.798.483-3.22 1.435-4.225.962-1.016 2.302-1.542 3.98-1.565 1.666-.023 2.996.477 3.953 1.488.948 1.002 1.434 2.399 1.446 4.152h-2.025c-.01-1.257-.318-2.227-.916-2.883-.591-.649-1.419-.974-2.463-.966-1.127.009-2.015.395-2.64 1.147-.63.759-.953 1.839-.953 3.21 0 1.341.31 2.378.921 3.084.606.699 1.472 1.042 2.574.975.76-.046 1.393-.243 1.879-.588l.256 1.866zm.93-4.666c-.024-.576-.11-1.106-.257-1.59l1.875-.765c.264.784.409 1.65.433 2.597l-2.051-.242z" />
                    </svg>
                  </a>

                  {/* Reddit */}
                  <a
                    href="https://reddit.com/r/tailormate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TailorMate on Reddit"
                    className="w-9 h-9 rounded-lg bg-[#252220] border border-[#383330] flex items-center justify-center text-[#c69b6d] hover:bg-[#c69b6d] hover:text-[#1a1716] hover:border-[#c69b6d] transition-colors shadow-xs"
                    title="Reddit"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-3.5">
              <strong className="text-white block text-base font-bold">Product</strong>
              <ul className="space-y-2.5 text-[#a8a19b] text-sm sm:text-[15px]">
                <li><a href="#features" className="hover:text-white transition-colors">Workspace Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#deadlines" className="hover:text-white transition-colors">Deadline Protection</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Payments & Ledger</a></li>
              </ul>
            </div>

            {/* Business Column */}
            <div className="space-y-3.5">
              <strong className="text-white block text-base font-bold">Business</strong>
              <ul className="space-y-2.5 text-[#a8a19b] text-sm sm:text-[15px]">
                <li><a href="#for-tailors" className="hover:text-white transition-colors">Why TailorMate</a></li>
                <li><Link href="/auth/signin" className="hover:text-white transition-colors">Staff Workstation</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white transition-colors">Chief Tailor Hub</Link></li>
                <li><a href="#measurements" className="hover:text-white transition-colors">Digital Sizing Vault</a></li>
              </ul>
            </div>

            {/* Support Column (No Dead Links) */}
            <div className="space-y-3.5">
              <strong className="text-white block text-base font-bold">Support & Assistance</strong>
              <ul className="space-y-2.5 text-[#a8a19b] text-sm sm:text-[15px]">
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActiveFooterModal("help")} 
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Help Center & Guides
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setActiveFooterModal("contact")} 
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Contact Atelier Desk
                  </button>
                </li>
                <li>
                  <a 
                    href="https://wa.me/237671234567?text=Hello%20TailorMate%20Team%2C%20I%20would%20like%20assistance%20with%20my%20tailoring%20workshop." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <span>WhatsApp Concierge</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#c69b6d]" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal and Bottom */}
          <div className="border-t border-[#2e2a28] pt-6 sm:pt-8 flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm text-[#78716c]">
            <p>© 2026 TailorMate. All rights reserved. Built for tailoring excellence.</p>
            <div className="flex items-center gap-5 sm:gap-6 flex-wrap">
              <button 
                type="button" 
                onClick={() => setActiveFooterModal("privacy")} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFooterModal("terms")} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFooterModal("help")} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Atelier FAQ
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          FOOTER INTERACTIVE MODALS (Zero Dead Links: Privacy, Terms, Help, Contact)
          ========================================================================= */}
      {activeFooterModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#1c1917]/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setActiveFooterModal(null)}
        >
          <div 
            className="bg-[#ffffff] w-full max-w-xl rounded-xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 space-y-5 my-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#ede5da] pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#8c6b47] uppercase block">
                  {activeFooterModal === "privacy" && "Atelier Data Sovereignty"}
                  {activeFooterModal === "terms" && "Workshop Terms of Agreement"}
                  {activeFooterModal === "help" && "Knowledge Base & FAQs"}
                  {activeFooterModal === "contact" && "TailorMate Atelier Concierge"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917] mt-0.5">
                  {activeFooterModal === "privacy" && "Privacy Policy"}
                  {activeFooterModal === "terms" && "Terms of Service"}
                  {activeFooterModal === "help" && "Help Center & FAQs"}
                  {activeFooterModal === "contact" && "Contact TailorMate"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveFooterModal(null)}
                className="p-1.5 rounded-lg hover:bg-[#faf7f2] text-[#78716c] hover:text-[#1c1917] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="text-xs sm:text-sm text-[#57534e] space-y-4 leading-relaxed">
              {activeFooterModal === "privacy" && (
                <>
                  <p>
                    At TailorMate, we believe a tailor&apos;s customer measurements and business ledger are sacred craftsman property.
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">1. Zero Client Data Sharing</strong>
                      <p className="text-xs text-[#78716c]">
                        Your customers&apos; names, phone numbers, and sizing profiles are strictly segregated to your workshop. We never sell, monetize, or feed your bespoke measurements into public models.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">2. Financial Ledger Protection</strong>
                      <p className="text-xs text-[#78716c]">
                        Cashflow records, advance deposits, and remaining balances are visible only to authorized Chief Tailor accounts. Staff workstation logins cannot view business earnings.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">3. Export & Delete Rights</strong>
                      <p className="text-xs text-[#78716c]">
                        You can export your complete atelier client directory and measurement vault at any time in structured formats.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeFooterModal === "terms" && (
                <>
                  <p>
                    These terms govern the use of the TailorMate tailoring management platform by workshop owners and artisan staff.
                  </p>
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">1. Chief Tailor Account Responsibility</strong>
                      <p className="text-xs text-[#78716c]">
                        The primary account administrator is responsible for delegating staff access and maintaining accurate order collection dates.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">2. Operational Reliability</strong>
                      <p className="text-xs text-[#78716c]">
                        TailorMate is optimized for fast local and online workshop responsiveness to ensure production timelines remain uninterrupted.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                      <strong className="text-[#1c1917] block font-semibold">3. Fair Workshop Usage</strong>
                      <p className="text-xs text-[#78716c]">
                        Accounts are intended for legitimate tailoring ateliers, boutiques, and fashion production workshops.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeFooterModal === "help" && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                    <strong className="text-[#1c1917] block font-semibold">How do I record a new customer order?</strong>
                    <p className="text-xs text-[#78716c]">
                      Navigate to the Chief Tailor Dashboard and click &quot;+ New Order&quot;. You can select an existing customer or create a new client profile, add clothing items with unit prices, input measurements, and assign workshop staff.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                    <strong className="text-[#1c1917] block font-semibold">Can my tailors see order prices and profit margins?</strong>
                    <p className="text-xs text-[#78716c]">
                      No. The Staff Workstation is strictly partitioned. Your sewing and cutting artisans only view assigned garments, due dates, instructions, and task status buttons.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] space-y-1">
                    <strong className="text-[#1c1917] block font-semibold">How does the WhatsApp notification feature work?</strong>
                    <p className="text-xs text-[#78716c]">
                      On any order card, click &quot;Contact Customer&quot;. TailorMate automatically formats an update with the client&apos;s name, order ID, current workshop status, and collection date for one-click dispatch.
                    </p>
                  </div>
                </div>
              )}

              {activeFooterModal === "contact" && (
                <div className="space-y-4">
                  <p>
                    Have questions about tailoring setup, multi-tailor workshops, or bespoke features? Reach out directly to our team:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://wa.me/237671234567?text=Hello%20TailorMate%20Team%2C%20I%20need%20assistance%20with%20my%20workshop."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-emerald-800 hover:bg-[#d1fae5] transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase block text-emerald-700">WhatsApp Atelier Desk</span>
                        <strong className="text-xs font-semibold">+237 671 234 567</strong>
                      </div>
                    </a>

                    <a
                      href="mailto:support@tailormate.app?subject=TailorMate%20Support%20Inquiry"
                      className="p-3.5 rounded-lg bg-[#faf7f2] border border-[#ede5da] text-[#1c1917] hover:bg-[#f7f2eb] transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#c69b6d] text-white flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase block text-[#8c6b47]">Direct Email</span>
                        <strong className="text-xs font-semibold">support@tailormate.app</strong>
                      </div>
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-[#faf7f2] border border-[#ede5da] flex items-center gap-2 text-xs text-[#78716c]">
                    <MapPin className="w-4 h-4 text-[#c69b6d] shrink-0" />
                    <span>Atelier Support Center: Douala & Yaoundé, Cameroon • Mon–Sat 8:00 AM – 7:00 PM</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#ede5da] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveFooterModal(null)}
                className="px-4 py-2 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-white text-xs font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING SCROLL-TO-TOP BUTTON (Visible when scrolling down)
          ========================================================================= */}
      {isScrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-lg bg-[#1c1917] text-white hover:bg-[#c69b6d] shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center border border-[#ede5da]/20 group animate-in fade-in zoom-in"
          title="Back to top"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
