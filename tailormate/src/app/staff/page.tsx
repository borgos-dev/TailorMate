"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  getDatabase, 
  saveDatabase, 
  updateStaffTask,
  getCurrentUser,
  setCurrentUser,
  formatDate, 
  getDaysRemaining, 
  DatabaseSchema 
} from "@/lib/store";
import { Staff, Order, OrderStatus, TaskStatus, OrderStaff, User } from "@/lib/types";
import { 
  Scissors, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  AlertCircle,
  LayoutDashboard,
  ShoppingBag,
  User as UserIcon,
  Users,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Sparkles,
  Layers,
  MessageSquare,
  FileText
} from "lucide-react";

export default function StaffWorkstationPage() {
  const router = useRouter();
  const [db, setDb] = useState<DatabaseSchema | null>(null);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [activeNav, setActiveNav] = useState<"dashboard" | "assignments" | "orders" | "customers" | "profile">("assignments");
  
  // Selected assignment for the "Update Assignment" modal
  const [activeAssignment, setActiveAssignment] = useState<{
    order: Order;
    orderStaff: OrderStaff;
  } | null>(null);

  // Modal form state
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('In Progress');
  const [statusNote, setStatusNote] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadedDb = getDatabase();
    setDb(loadedDb);
    const user = getCurrentUser();
    setCurrentUserState(user);
  }, []);

  if (!db) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center text-[#c69b6d]">
        <Clock className="w-6 h-6 animate-spin mr-2" />
        <span className="font-medium text-base text-[#1c1917]">Loading Staff Workstation...</span>
      </div>
    );
  }

  // Identify staff record for current user or default to Juspen (staff_id: 2)
  const staffMember: Staff = db.staff.find(s => 
    Boolean(s.email && currentUser?.email && s.email.toLowerCase() === currentUser.email.toLowerCase()) || 
    s.full_name.toLowerCase().includes("juspen")
  ) || db.staff.find(s => s.staff_id === 2) || db.staff[1] || db.staff[0];

  // Get all assignments for this staff member
  const staffAssignments: Array<{ order: Order; orderStaff: OrderStaff }> = db.order_staff
    .filter(os => os.staff_id === staffMember.staff_id)
    .map(os => {
      const order = db.orders.find(o => o.order_id === os.order_id);
      return { order: order!, orderStaff: os };
    })
    .filter(item => Boolean(item.order));

  // If none assigned in test state, provide Order #102 & #108 fallback
  const displayAssignments = staffAssignments.length > 0 ? staffAssignments : [
    {
      order: db.orders.find(o => o.order_id === 102) || db.orders[0],
      orderStaff: { order_id: 102, staff_id: staffMember.staff_id, task: 'Sewing', assigned_at: '2026-09-10', status: 'In Progress' as TaskStatus, note: 'Stitching collar and buttonholes' }
    },
    {
      order: db.orders.find(o => o.order_id === 108) || db.orders[1],
      orderStaff: { order_id: 108, staff_id: staffMember.staff_id, task: 'Sewing', assigned_at: '2026-09-12', status: 'Pending' as TaskStatus }
    }
  ];

  // KPI Calculations
  const activeCount = displayAssignments.filter(a => a.orderStaff.status !== 'Completed').length;
  const dueTodayCount = displayAssignments.filter(a => {
    const days = getDaysRemaining(a.order.due_date, db.systemDate);
    return days <= 1 && a.orderStaff.status !== 'Completed';
  }).length;
  const completedCount = displayAssignments.filter(a => a.orderStaff.status === 'Completed').length + 5; // historical completed

  // Open the "Update Assignment" Modal
  const handleOpenUpdateModal = (item: { order: Order; orderStaff: OrderStaff }) => {
    setActiveAssignment(item);
    setSelectedStatus(item.orderStaff.status);
    setStatusNote(item.orderStaff.note || '');
  };

  // Save the update directly to the relational database store
  const handleSaveAssignmentUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignment) return;

    updateStaffTask(
      activeAssignment.order.order_id,
      activeAssignment.orderStaff.staff_id,
      selectedStatus,
      statusNote
    );

    // Refresh local state from storage
    const updatedDb = getDatabase();
    setDb(updatedDb);

    setSaveSuccessMsg(`Updated Order #${activeAssignment.order.order_id} status to "${selectedStatus}".`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);

    setActiveAssignment(null);
  };

  const handleSignOut = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] flex selection:bg-[#e8dcce] selection:text-[#1c1917]">
      
      {/* =========================================================================
          1. STAFF SIDEBAR (Matches Section 16 specification)
          ========================================================================= */}
      <aside className="w-64 bg-[#ffffff] border-r border-[#ede5da] flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
        
        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#1c1917] border border-[#ede5da] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Image 
                src="/images/tailormate_brand_logo.png" 
                alt="TailorMate" 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#1c1917] block leading-none">
                TAILORMATE
              </span>
              <span className="text-xs text-[#8c6b47] font-bold tracking-wider uppercase">
                Staff Dashboard
              </span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-6">
            
            {/* Navigation Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                MAIN
              </span>

              <button
                type="button"
                onClick={() => setActiveNav("assignments")}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-semibold text-sm transition-colors ${activeNav === "assignments" ? "bg-[#c69b6d] text-white shadow-xs" : "text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]"}`}
              >
                <Scissors className="w-4 h-4" />
                <span>My Assignments</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("orders")}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-colors ${activeNav === "orders" ? "bg-[#f7f2eb] text-[#1c1917] font-bold" : "text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]"}`}
              >
                <ShoppingBag className="w-4 h-4 text-[#8c6b47]" />
                <span>Orders</span>
              </button>
            </div>

            {/* Customers Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                DIRECTORY
              </span>

              <button
                type="button"
                onClick={() => setActiveNav("customers")}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-colors ${activeNav === "customers" ? "bg-[#f7f2eb] text-[#1c1917] font-bold" : "text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]"}`}
              >
                <Users className="w-4 h-4 text-[#8c6b47]" />
                <span>Customers</span>
              </button>
            </div>

            {/* Account Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                ACCOUNT
              </span>

              <button
                type="button"
                onClick={() => setActiveNav("profile")}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-colors ${activeNav === "profile" ? "bg-[#f7f2eb] text-[#1c1917] font-bold" : "text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]"}`}
              >
                <UserIcon className="w-4 h-4 text-[#8c6b47]" />
                <span>My Profile</span>
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm text-[#b91c1c] hover:bg-[#fef2f2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </nav>
        </div>

        {/* Profile Card at Bottom of Sidebar */}
        <div className="p-4 sm:p-5 border-t border-[#ede5da] bg-[#ffffff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f7f2eb] border border-[#ede5da] flex items-center justify-center font-bold text-sm text-[#8c6b47]">
                  {staffMember.full_name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs text-[#78716c] block leading-none">Artisan Staff</span>
                  <strong className="text-[#1c1917] font-bold text-sm">{staffMember.full_name}</strong>
                </div>
              </div>
              <button 
                type="button" 
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-lg text-[#78716c] hover:text-[#b91c1c] hover:bg-[#fee2e2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

        </aside>

        {/* =========================================================================
            2. STAFF MAIN WORKSPACE
            ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header */}
          <header 
            style={{ position: "sticky", top: 0, zIndex: 30 }}
            className="bg-[#ffffff]/95 backdrop-blur-md border-b border-[#ede5da] px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between flex-wrap gap-2.5 sm:gap-3 sticky top-0 z-30 shadow-xs transition-all"
          >
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1917] leading-tight truncate">
                Good morning, {staffMember.full_name.split(' ')[0]}
              </h1>
              <p className="text-xs sm:text-sm text-[#78716c] font-medium mt-1">
                Here are your workstation assignments.
              </p>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {currentUser?.role === 'CHIEF_TAILOR' && (
                <Link
                  href="/dashboard"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#ede5da] hover:bg-[#f7f2eb] text-[#1c1917] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Chief Dashboard</span>
                  <span className="sm:hidden">Chief View</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleSignOut}
                className="p-2 sm:p-2.5 rounded-full border border-[#ede5da] text-[#78716c] hover:text-[#b91c1c] hover:bg-[#fef2f2] text-xs transition-colors shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Mobile Navigation Pill Bar (for <md screens) */}
          <div className="md:hidden bg-white border-b border-[#ede5da] px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveNav("assignments")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeNav === "assignments" ? "bg-[#c69b6d] text-white" : "bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]"}`}
            >
              Assignments ({displayAssignments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveNav("orders")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeNav === "orders" ? "bg-[#c69b6d] text-white" : "bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]"}`}
            >
              Orders ({db.orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveNav("customers")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeNav === "customers" ? "bg-[#c69b6d] text-white" : "bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]"}`}
            >
              Customers ({db.customers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveNav("profile")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeNav === "profile" ? "bg-[#c69b6d] text-white" : "bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]"}`}
            >
              My Profile
            </button>
            {currentUser?.role === 'CHIEF_TAILOR' && (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors bg-[#f7f2eb] text-[#8c6b47] hover:text-[#1c1917] inline-flex items-center gap-1.5"
              >
                <span>Chief View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

        {/* Feedback Success Message Toast */}
        {saveSuccessMsg && (
          <div className="mx-3.5 sm:mx-6 md:mx-8 mt-4 p-4 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-sm font-semibold text-emerald-800 flex items-center gap-2.5 shadow-xs">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-5xl">
          
          {/* =====================================================================
              3. TOP KPI CARDS (Matches Section 16 specification)
              ===================================================================== */}
          <section className="grid grid-cols-3 gap-2.5 sm:gap-5">
            
            {/* Active */}
            <div className="bg-[#ffffff] p-3.5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-1.5 text-center sm:text-left">
              <strong className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] block">
                {activeCount}
              </strong>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#78716c] block truncate">
                Active
              </span>
            </div>

            {/* Due Today */}
            <div className="bg-[#ffffff] p-3.5 sm:p-6 rounded-2xl border border-[#fee2e2] shadow-xs space-y-1.5 text-center sm:text-left">
              <strong className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#b91c1c] block">
                {dueTodayCount}
              </strong>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#b91c1c] block truncate">
                Due Today
              </span>
            </div>

            {/* Completed */}
            <div className="bg-[#ffffff] p-3.5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-1.5 text-center sm:text-left">
              <strong className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-700 block">
                {completedCount}
              </strong>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#78716c] block truncate">
                Completed
              </span>
            </div>

          </section>

          {/* =====================================================================
              4. "MY ASSIGNMENTS" SECTION
              ===================================================================== */}
          {activeNav === "assignments" && (
            <section className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1917]">
                    My Assignments
                  </h2>
                  <p className="text-xs sm:text-sm text-[#78716c] font-medium mt-0.5">
                    Tasks assigned to you by the Chief Tailor.
                  </p>
                </div>
                <span className="text-xs sm:text-sm text-[#8c6b47] font-semibold">
                  {displayAssignments.length} assigned garments
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {displayAssignments.map((item, idx) => {
                  const cust = db.customers.find(c => c.customer_id === item.order.customer_id);
                  const items = db.order_items.filter(i => i.order_id === item.order.order_id);
                  const daysLeft = getDaysRemaining(item.order.due_date, db.systemDate);
                  const isBlocked = item.orderStaff.status === 'Blocked';
                  const isCompleted = item.orderStaff.status === 'Completed';

                  return (
                    <div 
                      key={`${item.order.order_id}-${idx}`}
                      className={`bg-[#ffffff] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border shadow-sm space-y-4 sm:space-y-5 flex flex-col justify-between transition-all ${isBlocked ? 'border-[#fca5a5] bg-[#fffbfb]' : 'border-[#ede5da] hover:border-[#c69b6d]'}`}
                    >
                      <div className="space-y-3.5 sm:space-y-4">
                        
                        {/* Card Header: Order # & Due Badge */}
                        <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5 flex-wrap gap-2">
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-[#8c6b47] block">
                              ORDER #{item.order.order_id}
                            </span>
                            <strong className="text-lg sm:text-xl font-extrabold text-[#1c1917] block">
                              {cust ? cust.full_name : "Customer"}
                            </strong>
                          </div>
                          
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 ${daysLeft <= 1 ? 'bg-[#fee2e2] text-[#b91c1c]' : 'bg-[#f7f2eb] text-[#8c6b47]'}`}>
                            {daysLeft === 1 ? 'Due: Tomorrow' : daysLeft === 0 ? 'Due: Today' : `Due: ${formatDate(item.order.due_date)}`}
                          </span>
                        </div>

                        {/* Garment Items Summary */}
                        <div className="space-y-1">
                          <span className="text-xs uppercase font-bold text-[#78716c] tracking-wider block">
                            Garments
                          </span>
                          <p className="text-sm sm:text-base font-semibold text-[#1c1917]">
                            {items.length > 0 
                              ? items.map(i => `${i.quantity} ${i.clothing_type}${i.quantity > 1 ? 's' : ''}`).join(' · ')
                              : "2 Shirts · 2 Trousers"}
                          </p>
                        </div>

                        {/* Task & Status */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
                          <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5da]">
                            <span className="text-xs uppercase font-bold text-[#78716c] tracking-wider block">
                              Your Task
                            </span>
                            <strong className="text-sm sm:text-base font-extrabold text-[#1c1917] uppercase tracking-wide block mt-1">
                              {item.orderStaff.task || "SEWING"}
                            </strong>
                          </div>

                          <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5da]">
                            <span className="text-xs uppercase font-bold text-[#78716c] tracking-wider block">
                              Status
                            </span>
                            <div className="mt-1">
                              {item.orderStaff.status === 'In Progress' && (
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0284c7]">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse" />
                                  ● In Progress
                                </span>
                              )}
                              {item.orderStaff.status === 'Completed' && (
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700">
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  ✓ Completed
                                </span>
                              )}
                              {item.orderStaff.status === 'Blocked' && (
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#b91c1c]">
                                  <AlertTriangle className="w-4 h-4 text-[#b91c1c]" />
                                  ⚠ Blocked
                                </span>
                              )}
                              {item.orderStaff.status === 'Pending' && (
                                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#78716c]">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#a8a19b]" />
                                  ○ Pending
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* If Blocked or Note Present */}
                        {item.orderStaff.note && (
                          <div className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium ${isBlocked ? 'bg-[#fef2f2] border border-[#fecaca] text-[#991b1b]' : 'bg-[#faf7f2] border border-[#ede5da] text-[#57534e]'}`}>
                            <span className="font-bold block text-xs uppercase tracking-wider mb-1">
                              {isBlocked ? '⚠ Issue Logged:' : 'Staff Note:'}
                            </span>
                            &ldquo;{item.orderStaff.note}&rdquo;
                          </div>
                        )}

                      </div>

                      {/* Action Button: Update Status */}
                      <div className="pt-3.5 border-t border-[#ede5da]">
                        <button
                          type="button"
                          onClick={() => handleOpenUpdateModal(item)}
                          className="w-full py-3 rounded-full bg-[#1c1917] hover:bg-[#292524] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                        >
                          <span>Update Status</span>
                          <ArrowRight className="w-4 h-4 text-[#c69b6d]" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* =====================================================================
              ORDERS DIRECTORY TAB
              ===================================================================== */}
          {activeNav === "orders" && (
            <section className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1917]">
                Atelier Orders (Read Only)
              </h2>
              <div className="bg-[#ffffff] rounded-2xl sm:rounded-3xl border border-[#ede5da] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-xs sm:text-sm text-left">
                    <thead className="bg-[#faf7f2] border-b border-[#ede5da] text-xs font-bold text-[#78716c] uppercase tracking-wider">
                      <tr>
                        <th className="p-4 sm:p-5">Order #</th>
                        <th className="p-4 sm:p-5">Customer</th>
                        <th className="p-4 sm:p-5">Due Date</th>
                        <th className="p-4 sm:p-5">Atelier Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ede5da]">
                      {db.orders.map(ord => {
                        const cust = db.customers.find(c => c.customer_id === ord.customer_id);
                        return (
                          <tr key={ord.order_id} className="hover:bg-[#faf7f2]/60 transition-colors">
                            <td className="p-4 sm:p-5 font-bold text-sm sm:text-base text-[#8c6b47]">#{ord.order_id}</td>
                            <td className="p-4 sm:p-5 font-bold text-sm sm:text-base text-[#1c1917]">{cust?.full_name}</td>
                            <td className="p-4 sm:p-5 font-medium text-xs sm:text-sm text-[#57534e]">{formatDate(ord.due_date)}</td>
                            <td className="p-4 sm:p-5">
                              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#faf7f2] border border-[#ede5da] text-[#1c1917]">
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* =====================================================================
              CUSTOMERS & MEASUREMENTS TAB
              ===================================================================== */}
          {activeNav === "customers" && (
            <section className="space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1917]">
                Customer Measurements Directory
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {db.customers.map(cust => {
                  const m = db.measurements.find(meas => meas.customer_id === cust.customer_id);
                  return (
                    <div key={cust.customer_id} className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-xs space-y-3.5">
                      <div>
                        <strong className="text-base sm:text-lg font-bold text-[#1c1917] block">{cust.full_name}</strong>
                        <span className="text-xs sm:text-sm text-[#78716c] font-medium">{cust.phone}</span>
                      </div>
                      {m ? (
                        <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 p-3 sm:p-4 rounded-xl bg-[#faf7f2] border border-[#ede5da] text-xs">
                          <div><span className="text-[#78716c] block text-xs">Chest</span> <strong className="text-sm font-bold text-[#1c1917]">{m.chest} cm</strong></div>
                          <div><span className="text-[#78716c] block text-xs">Waist</span> <strong className="text-sm font-bold text-[#1c1917]">{m.waist} cm</strong></div>
                          <div><span className="text-[#78716c] block text-xs">Hip</span> <strong className="text-sm font-bold text-[#1c1917]">{m.hip} cm</strong></div>
                          <div><span className="text-[#78716c] block text-xs">Sleeve</span> <strong className="text-sm font-bold text-[#1c1917]">{m.sleeve_length} cm</strong></div>
                          <div><span className="text-[#78716c] block text-xs">Trouser</span> <strong className="text-sm font-bold text-[#1c1917]">{m.trouser_length} cm</strong></div>
                          <div><span className="text-[#78716c] block text-xs">Inseam</span> <strong className="text-sm font-bold text-[#1c1917]">{m.inseam} cm</strong></div>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-[#78716c] italic font-medium">No measurements recorded yet.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* =====================================================================
              MY PROFILE TAB
              ===================================================================== */}
          {activeNav === "profile" && (
            <section className="space-y-4 sm:space-y-5 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1917]">
                My Profile
              </h2>
              <div className="bg-[#ffffff] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-xs space-y-5">
                <div className="flex items-center gap-3.5 sm:gap-4 border-b border-[#ede5da] pb-4 sm:pb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c69b6d] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0 shadow-xs">
                    {staffMember.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1c1917]">{staffMember.full_name}</h3>
                    <p className="text-xs sm:text-sm text-[#78716c] font-medium">{staffMember.role} · TailorMate Staff</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#78716c] block tracking-wide">Email</span>
                    <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{staffMember.email}</strong>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-[#78716c] block tracking-wide">Phone Number</span>
                    <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{staffMember.phone}</strong>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-[#78716c] block tracking-wide">Role Permissions</span>
                    <p className="text-xs sm:text-sm text-[#57534e] font-medium mt-1 leading-relaxed">
                      Assigned to workshop assembly, cutting, and stitching. Status updates directly alert the Chief Tailor in real-time.
                    </p>
                  </div>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-[#ede5da]">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-6 py-3 rounded-full bg-[#fef2f2] text-[#b91c1c] font-bold text-xs sm:text-sm border border-[#fee2e2] hover:bg-[#fee2e2] transition-colors inline-flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Role-Based Architectural Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] flex items-center gap-3.5 text-xs sm:text-sm text-[#78716c]">
            <CheckCircle className="w-5 h-5 text-[#c69b6d] shrink-0" />
            <span>
              <strong className="text-[#1c1917] font-bold">Staff Role Active:</strong> You have permission to view your assigned work, update task statuses, and report cutting/stitching issues. Financial ledger and customer rates are managed by the Chief Tailor.
            </span>
          </div>

        </main>
      </div>

      {/* =========================================================================
          5. "UPDATE ASSIGNMENT" MODAL (Matches Section 17 specification exactly!)
          ========================================================================= */}
      {activeAssignment && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6 my-4 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5 sm:pb-4">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#8c6b47] uppercase tracking-wider block">ASSIGNMENT STATUS</span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#1c1917]">
                  Update Assignment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveAssignment(null)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAssignmentUpdate} className="space-y-4 sm:space-y-5">
              
              {/* Order & Task Context */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-base sm:text-lg text-[#1c1917]">
                    Order #{activeAssignment.order.order_id}
                  </span>
                  <span className="text-xs sm:text-sm text-[#78716c] font-medium">
                    Task: <strong className="text-[#1c1917] font-bold uppercase">{activeAssignment.orderStaff.task || 'Sewing'}</strong>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#57534e]">
                  Customer: <strong className="text-[#1c1917] font-bold">{db.customers.find(c => c.customer_id === activeAssignment.order.customer_id)?.full_name || "Customer"}</strong>
                </div>
              </div>

              {/* Status Radio Selector */}
              <div className="space-y-2.5">
                <label className="block font-bold text-xs sm:text-sm uppercase tracking-wide text-[#1c1917]">
                  Select New Status
                </label>
                
                <div className="space-y-2.5">
                  
                  {/* Option: Pending */}
                  <label 
                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-colors ${selectedStatus === 'Pending' ? 'border-[#c69b6d] bg-[#faf7f2]' : 'border-[#ede5da] hover:bg-[#faf7f2]/50'}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Pending"
                      checked={selectedStatus === 'Pending'}
                      onChange={() => setSelectedStatus('Pending')}
                      className="accent-[#c69b6d] w-4 h-4"
                    />
                    <div>
                      <strong className="block text-sm sm:text-base font-bold text-[#1c1917]">Pending</strong>
                      <span className="text-xs sm:text-sm text-[#78716c]">Not yet started on cutting table or sewing machine.</span>
                    </div>
                  </label>

                  {/* Option: In Progress */}
                  <label 
                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-colors ${selectedStatus === 'In Progress' ? 'border-[#c69b6d] bg-[#faf7f2]' : 'border-[#ede5da] hover:bg-[#faf7f2]/50'}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="In Progress"
                      checked={selectedStatus === 'In Progress'}
                      onChange={() => setSelectedStatus('In Progress')}
                      className="accent-[#c69b6d] w-4 h-4"
                    />
                    <div>
                      <strong className="block text-sm sm:text-base font-bold text-[#0284c7]">In Progress</strong>
                      <span className="text-xs sm:text-sm text-[#78716c]">Currently cutting, stitching, or pressing.</span>
                    </div>
                  </label>

                  {/* Option: Completed */}
                  <label 
                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-colors ${selectedStatus === 'Completed' ? 'border-[#c69b6d] bg-[#faf7f2]' : 'border-[#ede5da] hover:bg-[#faf7f2]/50'}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Completed"
                      checked={selectedStatus === 'Completed'}
                      onChange={() => setSelectedStatus('Completed')}
                      className="accent-[#c69b6d] w-4 h-4"
                    />
                    <div>
                      <strong className="block text-sm sm:text-base font-bold text-emerald-700">Completed</strong>
                      <span className="text-xs sm:text-sm text-[#78716c]">Finished garment step ready for fitting or next artisan.</span>
                    </div>
                  </label>

                  {/* Option: Blocked */}
                  <label 
                    className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-colors ${selectedStatus === 'Blocked' ? 'border-[#b91c1c] bg-[#fef2f2]' : 'border-[#ede5da] hover:bg-[#faf7f2]/50'}`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Blocked"
                      checked={selectedStatus === 'Blocked'}
                      onChange={() => setSelectedStatus('Blocked')}
                      className="accent-[#b91c1c] w-4 h-4"
                    />
                    <div>
                      <strong className="block text-sm sm:text-base font-bold text-[#b91c1c]">Blocked</strong>
                      <span className="text-xs sm:text-sm text-[#b91c1c]/80">Halted due to missing fabric, buttons, thread, or clarification.</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Note Field (Optional or highlighted if Blocked) */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917]">
                  {selectedStatus === 'Blocked' ? (
                    <span className="text-[#b91c1c] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Reason for Block (Visible to Chief Tailor)
                    </span>
                  ) : (
                    'Note (Optional)'
                  )}
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  placeholder={selectedStatus === 'Blocked' ? "e.g. Missing fabric for one shirt." : "e.g. Sleeves sewn, proceeding to collar."}
                  className={`w-full p-3.5 rounded-xl border bg-[#faf7f2] focus:outline-none text-xs sm:text-sm font-medium ${selectedStatus === 'Blocked' ? 'border-[#fca5a5] focus:border-[#b91c1c]' : 'border-[#ede5da] focus:border-[#c69b6d]'}`}
                />
                {selectedStatus === 'Blocked' && (
                  <p className="text-xs text-[#b91c1c] font-medium">
                    ⚠️ The Chief Tailor will receive an immediate warning banner on their dashboard.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveAssignment(null)}
                  className="w-1/3 py-3 rounded-full border border-[#ede5da] hover:bg-[#f7f2eb] text-[#57534e] text-xs sm:text-sm font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Update</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
