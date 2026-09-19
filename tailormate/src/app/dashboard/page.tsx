"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  getDatabase, 
  saveDatabase, 
  resetDatabase, 
  calculateFinancials, 
  getDaysRemaining, 
  getDueAlerts, 
  formatCurrency, 
  formatDate,
  getCurrentUser,
  setCurrentUser,
  inviteStaffMember,
  DatabaseSchema
} from "@/lib/store";
import { 
  Order, 
  Customer, 
  Measurement, 
  Staff, 
  OrderItem, 
  Payment, 
  OrderStatus,
  TaskStatus,
  User
} from "@/lib/types";
import { 
  Scissors, 
  CalendarClock, 
  Ruler, 
  Users, 
  CreditCard, 
  Plus, 
  RotateCcw, 
  Search, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  X,
  LayoutDashboard,
  ShoppingBag,
  UserCheck,
  TrendingUp,
  Settings,
  User as UserIcon,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  LogOut,
  UserPlus,
  Trash2,
  Check
} from "lucide-react";

export default function ChiefTailorDashboard() {
  const router = useRouter();
  const [db, setDb] = useState<DatabaseSchema | null>(null);
  const [currentUser, setUserState] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'orders' | 'customers' | 'measurements' | 'payments' | 'staff' | 'reports'>('dashboard');
  
  // Modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [selectedCustomerForMeasurement, setSelectedCustomerForMeasurement] = useState<Customer | null>(null);
  const [whatsappOrder, setWhatsappOrder] = useState<Order | null>(null);
  const [paymentModalOrder, setPaymentModalOrder] = useState<Order | null>(null);

  // Multi-section New Order Form State
  const [orderCustomerMode, setOrderCustomerMode] = useState<'existing' | 'new'>('existing');
  const [inlineCustName, setInlineCustName] = useState('');
  const [inlineCustPhone, setInlineCustPhone] = useState('');
  const [inlineCustAddress, setInlineCustAddress] = useState('');
  const [newOrderCustId, setNewOrderCustId] = useState<number>(1);
  const [newOrderDate, setNewOrderDate] = useState('2026-09-16');
  const [newOrderDueDate, setNewOrderDueDate] = useState('2026-09-22');
  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>('Pending');
  const [newOrderNotes, setNewOrderNotes] = useState('');
  
  // Dynamic Clothing Items list
  const [orderItemsList, setOrderItemsList] = useState<Array<{ clothing_type: string; description: string; quantity: number; unit_price: number }>>([
    { clothing_type: 'Shirt', description: 'White long-sleeve shirt, French cuffs', quantity: 2, unit_price: 25000 }
  ]);

  // Measurements choice & Family / Multi-Person Support
  interface FamilySizingMember {
    id: string;
    label: string;
    neck: number;
    chest: number;
    waist: number;
    hip: number;
    shoulder: number;
    sleeve_length: number;
    shirt_length: number;
    trouser_length: number;
    inseam: number;
    notes: string;
  }

  const [measurementMode, setMeasurementMode] = useState<'existing' | 'new'>('existing');
  const [familySizingList, setFamilySizingList] = useState<FamilySizingMember[]>([
    {
      id: '1',
      label: 'Main Client (Adult)',
      neck: 39,
      chest: 102,
      waist: 88,
      hip: 100,
      shoulder: 45,
      sleeve_length: 62,
      shirt_length: 76,
      trouser_length: 104,
      inseam: 78,
      notes: ''
    }
  ]);

  const handleAddFamilyMember = () => {
    const nextNum = familySizingList.length + 1;
    setFamilySizingList([
      ...familySizingList,
      {
        id: Date.now().toString(),
        label: `Child / Family Member ${nextNum}`,
        neck: 34,
        chest: 70,
        waist: 62,
        hip: 72,
        shoulder: 36,
        sleeve_length: 50,
        shirt_length: 58,
        trouser_length: 80,
        inseam: 60,
        notes: ''
      }
    ]);
  };

  const handleRemoveFamilyMember = (id: string) => {
    if (familySizingList.length <= 1) return;
    setFamilySizingList(familySizingList.filter(m => m.id !== id));
  };

  const handleUpdateFamilyMember = (id: string, field: keyof FamilySizingMember, val: any) => {
    setFamilySizingList(familySizingList.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  // Staff Assignment check-boxes
  const [assignedStaffList, setAssignedStaffList] = useState<Array<{ staff_id: number; task: string }>>([
    { staff_id: 2, task: 'Sewing' } // Juspen
  ]);

  // Deposit Payment
  const [newOrderDeposit, setNewOrderDeposit] = useState<number>(30000);
  const [newOrderPayMethod, setNewOrderPayMethod] = useState('Cash');
  const [newOrderPayRef, setNewOrderPayRef] = useState('RCPT-INIT');

  // Quick Customer Add
  const [custFullName, setCustFullName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custIncludeMeasurements, setCustIncludeMeasurements] = useState(false);
  const [custNeck, setCustNeck] = useState<number>(39);
  const [custChest, setCustChest] = useState<number>(100);
  const [custWaist, setCustWaist] = useState<number>(86);
  const [custShoulder, setCustShoulder] = useState<number>(45);
  const [custSleeve, setCustSleeve] = useState<number>(62);
  const [custTrouser, setCustTrouser] = useState<number>(104);
  const [custInseam, setCustInseam] = useState<number>(78);
  const [custMeasNotes, setCustMeasNotes] = useState<string>('');

  // Vault Sizing Modal Form
  const [showVaultAddForm, setShowVaultAddForm] = useState(false);
  const [vaultNeck, setVaultNeck] = useState<number>(39);
  const [vaultChest, setVaultChest] = useState<number>(100);
  const [vaultWaist, setVaultWaist] = useState<number>(86);
  const [vaultShoulder, setVaultShoulder] = useState<number>(45);
  const [vaultSleeve, setVaultSleeve] = useState<number>(62);
  const [vaultTrouser, setVaultTrouser] = useState<number>(104);
  const [vaultInseam, setVaultInseam] = useState<number>(78);
  const [vaultNotes, setVaultNotes] = useState<string>('');

  // Quick Staff Add
  const [staffFullName, setStaffFullName] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffRole, setStaffRole] = useState('Sewing Specialist');

  // Record Payment modal
  const [payAmount, setPayAmount] = useState<number>(0);
  const [payMethod, setPayMethod] = useState('Cash');
  const [payRef, setPayRef] = useState('');

  useEffect(() => {
    const loadedDb = getDatabase();
    const user = getCurrentUser();
    setDb(loadedDb);
    setUserState(user);

    // Strict Role Protection: Staff cannot access Chief Tailor Dashboard
    if (user && user.role === 'STAFF') {
      router.replace('/staff');
    }
  }, [router]);

  if (!db) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center text-[#c69b6d]">
        <Clock className="w-6 h-6 animate-spin mr-2" />
        <span className="font-medium text-base text-[#1c1917]">Loading TailorMate Workshop...</span>
      </div>
    );
  }

  const currentBusiness = db.businesses[0] || {
    name: "Sally's Tailoring Atelier",
    currency: "FCFA"
  };

  // Order items total calculation
  const orderTotal = orderItemsList.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
  const remainingBalance = Math.max(0, orderTotal - newOrderDeposit);

  // Check for any blocked staff tasks (issues reported)
  const blockedTasks = db.order_staff.filter(os => os.status === 'Blocked');

  const handleSignOut = () => {
    router.push('/auth/signin');
  };

  const handleAddItemRow = () => {
    setOrderItemsList([
      ...orderItemsList,
      { clothing_type: 'Trouser', description: 'Classic tailored black trousers', quantity: 1, unit_price: 30000 }
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (orderItemsList.length <= 1) return;
    setOrderItemsList(orderItemsList.filter((_, i) => i !== index));
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    const nextCustId = Math.max(...db.customers.map(c => c.customer_id), 0) + 1;
    const newCust: Customer = {
      customer_id: nextCustId,
      full_name: custFullName,
      phone: custPhone,
      email: custEmail,
      address: custAddress,
      created_at: db.systemDate
    };

    let updatedMeasurements = [...db.measurements];
    if (custIncludeMeasurements) {
      const nextMeasId = Math.max(...db.measurements.map(m => m.measurement_id), 0) + 1;
      updatedMeasurements.push({
        measurement_id: nextMeasId,
        customer_id: nextCustId,
        measured_at: db.systemDate,
        neck: Number(custNeck),
        chest: Number(custChest),
        waist: Number(custWaist),
        shoulder: Number(custShoulder),
        sleeve_length: Number(custSleeve),
        trouser_length: Number(custTrouser),
        inseam: Number(custInseam),
        notes: custMeasNotes || 'Recorded on client registration'
      });
    }

    const updatedDb: DatabaseSchema = {
      ...db,
      customers: [...db.customers, newCust],
      measurements: updatedMeasurements
    };
    setDb(updatedDb);
    saveDatabase(updatedDb);
    setNewOrderCustId(nextCustId);
    setShowAddCustomerModal(false);
    setCustFullName('');
    setCustPhone('');
    setCustEmail('');
    setCustAddress('');
    setCustIncludeMeasurements(false);
    setCustMeasNotes('');
  };

  const handleSaveVaultMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerForMeasurement || !db) return;
    const nextMeasId = Math.max(...db.measurements.map(m => m.measurement_id), 0) + 1;
    const newMeas: Measurement = {
      measurement_id: nextMeasId,
      customer_id: selectedCustomerForMeasurement.customer_id,
      measured_at: db.systemDate,
      neck: Number(vaultNeck),
      chest: Number(vaultChest),
      waist: Number(vaultWaist),
      shoulder: Number(vaultShoulder),
      sleeve_length: Number(vaultSleeve),
      trouser_length: Number(vaultTrouser),
      inseam: Number(vaultInseam),
      notes: vaultNotes || 'Updated profile record'
    };

    const updatedDb: DatabaseSchema = {
      ...db,
      measurements: [newMeas, ...db.measurements]
    };
    setDb(updatedDb);
    saveDatabase(updatedDb);
    setShowVaultAddForm(false);
    setVaultNotes('');
  };

  const handleInviteStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const res = inviteStaffMember({
      fullName: staffFullName,
      phone: staffPhone,
      email: staffEmail,
      role: staffRole
    });

    setDb(getDatabase());
    setShowAddStaffModal(false);
    alert(`Invitation sent to ${res.staff.full_name} (${res.staff.role}). Staff account created.`);
    setStaffFullName('');
    setStaffPhone('');
    setStaffEmail('');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    // 0. Determine Customer (Returning or New inline)
    let targetCustId = Number(newOrderCustId);
    let updatedCustomers = [...db.customers];

    if (orderCustomerMode === 'new') {
      if (!inlineCustName.trim()) {
        alert("Please enter the customer's full name.");
        return;
      }
      targetCustId = Math.max(...db.customers.map(c => c.customer_id), 0) + 1;
      const newCust: Customer = {
        customer_id: targetCustId,
        full_name: inlineCustName.trim(),
        phone: inlineCustPhone.trim() || '+237 600 000 000',
        email: '',
        address: inlineCustAddress.trim() || 'Workshop Walk-in',
        created_at: db.systemDate
      };
      updatedCustomers.push(newCust);
    }

    const nextOrderId = Math.max(...db.orders.map(o => o.order_id), 100) + 1;
    
    // 1. Order Record
    const newOrder: Order = {
      order_id: nextOrderId,
      customer_id: targetCustId,
      order_date: newOrderDate,
      due_date: newOrderDueDate,
      status: newOrderStatus,
      notes: newOrderNotes || 'Created from workshop dashboard'
    };

    // 2. Order Items
    let currentItemId = Math.max(...db.order_items.map(i => i.order_item_id), 0);
    const newItems: OrderItem[] = orderItemsList.map(item => {
      currentItemId += 1;
      return {
        order_item_id: currentItemId,
        order_id: nextOrderId,
        clothing_type: item.clothing_type,
        description: item.description,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price)
      };
    });

    // 3. Measurements (Supports Family / Children Sizing)
    let updatedMeasurements = [...db.measurements];
    if (measurementMode === 'new') {
      let currentMeasId = Math.max(...db.measurements.map(m => m.measurement_id), 0);
      familySizingList.forEach(mem => {
        currentMeasId += 1;
        updatedMeasurements.push({
          measurement_id: currentMeasId,
          customer_id: targetCustId,
          measured_at: db.systemDate,
          neck: Number(mem.neck),
          chest: Number(mem.chest),
          waist: Number(mem.waist),
          hip: Number(mem.hip),
          shoulder: Number(mem.shoulder),
          sleeve_length: Number(mem.sleeve_length),
          shirt_length: Number(mem.shirt_length),
          trouser_length: Number(mem.trouser_length),
          inseam: Number(mem.inseam),
          notes: `${mem.label}${mem.notes ? ` (${mem.notes})` : ''} - Order #${nextOrderId}`
        });
      });
    }

    // 4. Staff Task Assignments
    const newAssignments = assignedStaffList.map(as => ({
      order_id: nextOrderId,
      staff_id: as.staff_id,
      task: as.task,
      assigned_at: db.systemDate,
      status: 'In Progress' as TaskStatus
    }));

    // 5. Payment Ledger
    let updatedPayments = [...db.payments];
    if (Number(newOrderDeposit) > 0) {
      const nextPayId = Math.max(...db.payments.map(p => p.payment_id), 0) + 1;
      updatedPayments.push({
        payment_id: nextPayId,
        order_id: nextOrderId,
        amount: Number(newOrderDeposit),
        payment_date: db.systemDate,
        payment_method: newOrderPayMethod,
        reference: newOrderPayRef || `RCPT-${nextOrderId}-INIT`
      });
    }

    const updatedDb: DatabaseSchema = {
      ...db,
      customers: updatedCustomers,
      orders: [newOrder, ...db.orders],
      order_items: [...db.order_items, ...newItems],
      measurements: updatedMeasurements,
      order_staff: [...db.order_staff, ...newAssignments],
      payments: updatedPayments
    };

    setDb(updatedDb);
    saveDatabase(updatedDb);

    setFamilySizingList([
      {
        id: '1',
        label: 'Main Client (Adult)',
        neck: 39,
        chest: 102,
        waist: 88,
        hip: 100,
        shoulder: 45,
        sleeve_length: 62,
        shirt_length: 76,
        trouser_length: 104,
        inseam: 78,
        notes: ''
      }
    ]);
    setInlineCustName('');
    setInlineCustPhone('');
    setInlineCustAddress('');
    setOrderCustomerMode('existing');
    setShowNewOrderModal(false);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalOrder || payAmount <= 0) return;

    const nextPayId = Math.max(...db.payments.map(p => p.payment_id), 0) + 1;
    const newPayment: Payment = {
      payment_id: nextPayId,
      order_id: paymentModalOrder.order_id,
      amount: Number(payAmount),
      payment_date: db.systemDate,
      payment_method: payMethod,
      reference: payRef || `RCPT-${paymentModalOrder.order_id}-BAL`
    };

    const updatedDb = {
      ...db,
      payments: [...db.payments, newPayment]
    };

    setDb(updatedDb);
    saveDatabase(updatedDb);
    setPaymentModalOrder(null);
    setPayAmount(0);
    setPayRef('');
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] flex selection:bg-[#e8dcce] selection:text-[#1c1917]">
      
      {/* =========================================================================
          CHIEF TAILOR SIDEBAR
          ========================================================================= */}
      <aside className="w-64 lg:w-72 bg-[#ffffff] border-r border-[#ede5da] flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
        
        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#1c1917] border border-[#ede5da] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Image 
                src="/images/tailormate_brand_logo.png" 
                alt="TailorMate" 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#1c1917] block leading-none">
                TAILORMATE
              </span>
              <span className="text-xs text-[#8c6b47] font-bold tracking-wider uppercase mt-1 block">
                Chief Tailor
              </span>
            </div>
          </Link>

          {/* Navigation Groups */}
          <nav className="space-y-6 text-sm">
            
            {/* Main */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${activeSection === 'dashboard' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span className="text-sm">Dashboard</span>
              </button>
            </div>

            {/* WORKSHOP Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                WORKSHOP
              </span>
              
              <button
                type="button"
                onClick={() => setActiveSection('customers')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'customers' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <Users className={`w-4 h-4 shrink-0 ${activeSection === 'customers' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Customers</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('orders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'orders' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <ShoppingBag className={`w-4 h-4 shrink-0 ${activeSection === 'orders' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('measurements')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'measurements' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <Ruler className={`w-4 h-4 shrink-0 ${activeSection === 'measurements' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Measurements</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('payments')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'payments' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <CreditCard className={`w-4 h-4 shrink-0 ${activeSection === 'payments' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Payments</span>
              </button>
            </div>

            {/* TEAM Group */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                TEAM
              </span>

              <button
                type="button"
                onClick={() => setActiveSection('staff')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'staff' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <UserCheck className={`w-4 h-4 shrink-0 ${activeSection === 'staff' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Staff</span>
              </button>

              <Link
                href="/staff"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#8c6b47] shrink-0" />
                  <span className="text-sm">Assignments</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#a8a19b]" />
              </Link>
            </div>

            {/* INSIGHTS */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                INSIGHTS
              </span>
              <button
                type="button"
                onClick={() => setActiveSection('reports')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${activeSection === 'reports' ? 'bg-[#c69b6d] text-white font-semibold shadow-xs' : 'text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917]'}`}
              >
                <TrendingUp className={`w-4 h-4 shrink-0 ${activeSection === 'reports' ? 'text-white' : 'text-[#8c6b47]'}`} />
                <span className="text-sm">Reports</span>
              </button>
            </div>

            {/* SETTINGS */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8c6b47] tracking-wider uppercase px-3 block">
                SETTINGS
              </span>
              <button
                type="button"
                onClick={() => alert(`TailorMate Settings:\nBusiness: ${currentBusiness.name}\nCurrency: ${currentBusiness.currency}\nThreshold: 72 Hours`)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#57534e] hover:bg-[#faf7f2] hover:text-[#1c1917] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#8c6b47] shrink-0" />
                <span className="text-sm">Settings</span>
              </button>
            </div>

          </nav>
        </div>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-[#ede5da] bg-[#ffffff]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f7f2eb] border border-[#ede5da] flex items-center justify-center font-bold text-sm text-[#8c6b47]">
                {currentUser?.full_name?.charAt(0) || 'S'}
              </div>
              <div>
                <span className="text-xs text-[#78716c] block leading-none mb-1">Chief Tailor</span>
                <strong className="text-sm text-[#1c1917] font-semibold block">{currentUser?.full_name || 'Sally'}</strong>
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
          MAIN WORKSPACE
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar (Sticky to top of window) */}
        <header 
          style={{ position: "sticky", top: 0, zIndex: 30 }} 
          className="bg-[#ffffff]/95 backdrop-blur-md border-b border-[#ede5da] px-4 sm:px-8 py-3.5 sm:py-4.5 flex items-center justify-between flex-wrap gap-3 sm:gap-4 sticky top-0 z-30 shadow-xs transition-all"
        >
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1917] leading-none truncate">
              Good morning, {currentUser?.full_name?.split(' ')[0] || 'Sally'}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716c] mt-1 font-medium">
              Here&apos;s what&apos;s happening in your workshop today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Reset Seed Button */}
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset workshop database to default demonstration state?")) {
                  resetDatabase();
                  setDb(getDatabase());
                }
              }}
              title="Reset sample data"
              className="p-2.5 rounded-full border border-[#ede5da] text-[#78716c] hover:text-[#1c1917] hover:bg-[#f7f2eb] text-sm transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Quick Add Customer Only */}
            <button
              type="button"
              onClick={() => setShowAddCustomerModal(true)}
              title="Register a contact profile without placing an order today"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#ede5da] hover:bg-[#f7f2eb] text-[#57534e] hover:text-[#1c1917] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shrink-0"
            >
              <UserPlus className="w-4 h-4 text-[#8c6b47]" />
              <span className="hidden sm:inline">+ Customer Only</span>
              <span className="sm:hidden">+ Client</span>
            </button>

            {/* + New Order Button */}
            <button
              type="button"
              onClick={() => setShowNewOrderModal(true)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Order</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Pill Bar (visible only on <md screens so mobile users can freely navigate tabs) */}
        <div className="md:hidden bg-white border-b border-[#ede5da] px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveSection('dashboard')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'dashboard' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('orders')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'orders' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Orders ({db.orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('customers')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'customers' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Customers ({db.customers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('measurements')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'measurements' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Measurements
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('payments')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'payments' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Payments
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('staff')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'staff' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Staff ({db.staff.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('reports')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeSection === 'reports' ? 'bg-[#c69b6d] text-white shadow-xs' : 'bg-[#faf7f2] text-[#57534e] hover:text-[#1c1917]'}`}
          >
            Reports
          </button>
          <Link
            href="/staff"
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors bg-[#f7f2eb] text-[#8c6b47] hover:text-[#1c1917] inline-flex items-center gap-1.5"
          >
            <span>Staff Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* WORKSPACE CONTENT */}
        <main className="p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-7xl">

          {/* =====================================================================
              BLOCKED ISSUE ALERT BANNER (If any staff reported an issue)
              ===================================================================== */}
          {blockedTasks.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fef2f2] border border-[#fca5a5] shadow-xs flex items-center justify-between flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-3.5 text-[#b91c1c]">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <strong className="block text-base font-bold">
                    ⚠️ Artisan Alert on Order #{blockedTasks[0].order_id}
                  </strong>
                  <span className="text-sm font-medium">
                    Staff member reported: &ldquo;{blockedTasks[0].note || 'Issue reported during garment assembly'}&rdquo;
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const ord = db.orders.find(o => o.order_id === blockedTasks[0].order_id);
                  if (ord) setSelectedOrder(ord);
                }}
                className="px-4 py-2 rounded-full bg-[#b91c1c] text-white font-semibold text-xs sm:text-sm shadow-xs hover:bg-[#991b1b] transition-colors"
              >
                Review Order Issue
              </button>
            </div>
          )}

          {/* =====================================================================
              14. OVERVIEW CARDS (4 CARDS)
              ===================================================================== */}
          {activeSection === 'dashboard' && (
            <>
              <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            
            {/* Card 1 */}
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#78716c]">
                <span className="font-bold uppercase tracking-wider text-xs sm:text-[13px] text-[#8c6b47]">ACTIVE ORDERS</span>
                <span className="text-xs sm:text-[13px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">+4 this week</span>
              </div>
              <strong className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] block">
                34
              </strong>
              <p className="text-xs sm:text-sm text-[#78716c] font-medium">In production queue</p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#fee2e2] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#b91c1c]">
                <span className="font-bold uppercase tracking-wider text-xs sm:text-[13px]">DUE TODAY</span>
                <span className="text-xs sm:text-[13px] font-bold bg-[#fee2e2] text-[#b91c1c] px-2.5 py-0.5 rounded-full">Needs attention</span>
              </div>
              <strong className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#b91c1c] block">
                3
              </strong>
              <p className="text-xs sm:text-sm text-[#b91c1c] font-medium">Immediate action needed</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#c2410c]">
                <span className="font-bold uppercase tracking-wider text-xs sm:text-[13px]">DUE SOON</span>
                <span className="text-xs sm:text-[13px] text-[#c2410c] font-bold bg-orange-50 px-2.5 py-0.5 rounded-full">Next 3 days</span>
              </div>
              <strong className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] block">
                7
              </strong>
              <p className="text-xs sm:text-sm text-[#78716c] font-medium">Within 72h window</p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#78716c]">
                <span className="font-bold uppercase tracking-wider text-xs sm:text-[13px] text-[#8c6b47]">OUTSTANDING</span>
                <span className="text-xs sm:text-[13px] text-[#8c6b47] font-bold bg-[#f7f2eb] px-2.5 py-0.5 rounded-full">12 orders</span>
              </div>
              <strong className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1917] block truncate">
                285,000 FCFA
              </strong>
              <p className="text-xs sm:text-sm text-[#78716c] font-medium">Pending collections</p>
            </div>

          </section>

          {/* =====================================================================
              15. MOST IMPORTANT SECTION: ORDERS NEEDING ATTENTION
              ===================================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#b91c1c]" />
                  <span>Orders Needing Attention</span>
                </h2>
                <p className="text-sm text-[#78716c] mt-0.5 font-medium">
                  Active orders approaching due dates requiring supervisor action.
                </p>
              </div>
            </div>

            <div className="bg-[#ffffff] rounded-2xl border border-[#ede5da] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-[#faf7f2] border-b border-[#ede5da] text-[#78716c] uppercase font-bold text-xs tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Order</th>
                      <th className="py-4 px-5">Customer</th>
                      <th className="py-4 px-5">Items</th>
                      <th className="py-4 px-5">Due</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ede5da]">
                    
                    {/* Row 1: #102 */}
                    <tr className="hover:bg-[#fffdfa] transition-colors">
                      <td className="py-4 px-5 font-bold text-base text-[#1c1917]">
                        #102
                      </td>
                      <td className="py-4 px-5 font-semibold text-[#1c1917]">
                        <span className="text-base font-bold block">Mavis</span>
                        <span className="block text-xs text-[#78716c] font-medium mt-0.5">+237 671 234 567</span>
                      </td>
                      <td className="py-4 px-5 text-[#57534e] text-sm font-medium">
                        2 Shirts<br />
                        2 Trousers
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-3 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] font-bold text-xs">
                          Tomorrow
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[#b91c1c] font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          ⚠ In Progress
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 102);
                            if (ord) setSelectedOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                        >
                          View Order
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 102);
                            if (ord) setWhatsappOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#f7f2eb] hover:bg-[#ede5da] text-[#1c1917] font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4 text-[#059669]" />
                          <span>Contact Customer</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 2: #108 */}
                    <tr className="hover:bg-[#fffdfa] transition-colors">
                      <td className="py-4 px-5 font-bold text-base text-[#1c1917]">
                        #108
                      </td>
                      <td className="py-4 px-5 font-semibold text-[#1c1917]">
                        <span className="text-base font-bold block">Gwen</span>
                        <span className="block text-xs text-[#78716c] font-medium mt-0.5">+237 672 345 678</span>
                      </td>
                      <td className="py-4 px-5 text-[#57534e] text-sm font-medium">
                        Dress
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-3 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] font-bold text-xs">
                          Today
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[#d97706] font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          ⚠ Cutting
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 108) || db.orders[0];
                            setSelectedOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                        >
                          View Order
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 108) || db.orders[0];
                            setWhatsappOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#f7f2eb] hover:bg-[#ede5da] text-[#1c1917] font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4 text-[#059669]" />
                          <span>Contact Customer</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 3: #115 */}
                    <tr className="hover:bg-[#fffdfa] transition-colors">
                      <td className="py-4 px-5 font-bold text-base text-[#1c1917]">
                        #115
                      </td>
                      <td className="py-4 px-5 font-semibold text-[#1c1917]">
                        <span className="text-base font-bold block">Senorita</span>
                        <span className="block text-xs text-[#78716c] font-medium mt-0.5">+237 673 456 789</span>
                      </td>
                      <td className="py-4 px-5 text-[#57534e] text-sm font-medium">
                        3 Shirts
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] font-bold text-xs">
                          Sep 18
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[#2563eb] font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          In Progress
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 115) || db.orders[0];
                            setSelectedOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                        >
                          View Order
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const ord = db.orders.find(o => o.order_id === 115) || db.orders[0];
                            setWhatsappOrder(ord);
                          }}
                          className="px-4 py-2 rounded-full bg-[#f7f2eb] hover:bg-[#ede5da] text-[#1c1917] font-semibold text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4 text-[#059669]" />
                          <span>Contact Customer</span>
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =====================================================================
              16. TODAY'S WORK & 17. STAFF OVERVIEW
              ===================================================================== */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* 16. Today's Work Timeline */}
            <section className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-[#1c1917]">
                Today&apos;s Work
              </h3>
              
              <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-4">
                <div className="space-y-4 divide-y divide-[#ede5da]">
                  
                  <div className="pt-3 first:pt-0 flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs sm:text-sm font-bold text-[#8c6b47] pt-0.5">08:30</span>
                      <div>
                        <strong className="text-base font-bold text-[#1c1917] block">Order #102 • Mavis</strong>
                        <span className="text-sm text-[#57534e]">Task: Sewing • Assigned to: <strong className="text-[#1c1917]">Juspen</strong></span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#e0f2fe] text-[#0369a1] font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      In Progress
                    </span>
                  </div>

                  <div className="pt-4 flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs sm:text-sm font-bold text-[#8c6b47] pt-0.5">10:00</span>
                      <div>
                        <strong className="text-base font-bold text-[#1c1917] block">Order #108 • Gwen</strong>
                        <span className="text-sm text-[#57534e]">Task: Cutting • Assigned to: <strong className="text-[#1c1917]">Nelson</strong></span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      Completed
                    </span>
                  </div>

                  <div className="pt-4 flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs sm:text-sm font-bold text-[#8c6b47] pt-0.5">14:00</span>
                      <div>
                        <strong className="text-base font-bold text-[#1c1917] block">Order #115 • Senorita</strong>
                        <span className="text-sm text-[#57534e]">Task: Finishing • Assigned to: <strong className="text-[#1c1917]">Wansi</strong></span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f7f2eb] text-[#78716c] font-bold text-xs flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#78716c]" />
                      Pending
                    </span>
                  </div>

                </div>
              </div>
            </section>

            {/* 17. Team Overview */}
            <section className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1c1917]">
                  Team Overview
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowAddStaffModal(true)}
                  className="text-sm text-[#8c6b47] hover:underline font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Staff</span>
                </button>
              </div>

              <div className="bg-[#ffffff] p-5 sm:p-6 rounded-2xl border border-[#ede5da] shadow-xs space-y-3">
                {db.staff.map(st => (
                  <div key={st.staff_id} className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5da] flex items-center justify-between gap-3">
                    <div>
                      <strong className="text-base text-[#1c1917] block font-bold">{st.full_name}</strong>
                      <span className="text-sm text-[#78716c] font-medium">{st.role}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 shrink-0 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* =====================================================================
              18. RECENT PAYMENTS
              ===================================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-bold text-[#1c1917]">
                Recent Payments
              </h3>
              <button
                type="button"
                onClick={() => setActiveSection('payments')}
                className="px-5 py-2 rounded-full bg-[#ffffff] border border-[#ede5da] text-xs sm:text-sm font-semibold text-[#1c1917] hover:bg-[#f7f2eb] transition-colors shadow-xs"
              >
                View All Payments
              </button>
            </div>

            <div className="bg-[#ffffff] rounded-2xl border border-[#ede5da] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead className="bg-[#faf7f2] border-b border-[#ede5da] text-[#78716c] uppercase font-bold text-xs tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">Customer</th>
                      <th className="py-3.5 px-5">Order</th>
                      <th className="py-3.5 px-5">Amount</th>
                      <th className="py-3.5 px-5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ede5da]">
                    {db.payments.slice(-4).reverse().map(p => {
                      const ord = db.orders.find(o => o.order_id === p.order_id);
                      const cust = db.customers.find(c => c.customer_id === ord?.customer_id);
                      return (
                        <tr key={p.payment_id} className="hover:bg-[#faf7f2]">
                          <td className="py-3.5 px-5 font-bold text-base text-[#1c1917]">{cust?.full_name || 'Client'}</td>
                          <td className="py-3.5 px-5 font-semibold text-[#8c6b47]">#{p.order_id}</td>
                          <td className="py-3.5 px-5 font-extrabold text-base sm:text-lg text-emerald-700">{formatCurrency(p.amount)}</td>
                          <td className="py-3.5 px-5 text-sm text-[#78716c] font-medium">{formatDate(p.payment_date)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
            </>
          )}

          {/* =====================================================================
              REPOSITORIES VIEWS: CUSTOMERS / ORDERS / MEASUREMENTS / STAFF
              ===================================================================== */}
          {activeSection !== 'dashboard' && (
            <section className="bg-[#ffffff] p-5 sm:p-7 rounded-2xl border border-[#ede5da] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#ede5da] pb-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c1917] capitalize">
                  Workshop {activeSection}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveSection('dashboard')}
                  className="text-xs sm:text-sm text-[#8c6b47] hover:underline font-semibold"
                >
                  ← Back to Overview
                </button>
              </div>

              {/* Customers View */}
              {activeSection === 'customers' && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddCustomerModal(true)}
                      className="px-5 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Add New Customer</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {db.customers.map(c => (
                      <div key={c.customer_id} className="p-4 sm:p-5 rounded-2xl border border-[#ede5da] bg-[#faf7f2] space-y-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-base font-bold text-[#1c1917] block">{c.full_name}</strong>
                            <span className="text-xs sm:text-sm text-[#78716c] font-medium">{c.phone} • {c.email || 'No email registered'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedCustomerForMeasurement(c)}
                            className="px-3.5 py-1.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs font-semibold shrink-0 transition-colors"
                          >
                            Measurements
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-[#57534e] font-medium">{c.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Measurements View */}
              {activeSection === 'measurements' && (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {db.measurements.map(m => {
                    const cust = db.customers.find(c => c.customer_id === m.customer_id);
                    return (
                      <div key={m.measurement_id} className="p-4 sm:p-5 rounded-2xl border border-[#ede5da] bg-[#faf7f2] space-y-3">
                        <div className="flex justify-between items-center">
                          <strong className="text-base font-bold text-[#1c1917]">{cust?.full_name}</strong>
                          <span className="text-xs sm:text-sm text-[#78716c] font-medium">{formatDate(m.measured_at)}</span>
                        </div>
                        <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 text-xs sm:text-sm pt-1 font-medium">
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Chest: <strong>{m.chest} cm</strong></span>
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Waist: <strong>{m.waist} cm</strong></span>
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Shoulder: <strong>{m.shoulder} cm</strong></span>
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Sleeve: <strong>{m.sleeve_length} cm</strong></span>
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Trouser: <strong>{m.trouser_length} cm</strong></span>
                          <span className="bg-white p-2 rounded-lg border border-[#ede5da]">Inseam: <strong>{m.inseam} cm</strong></span>
                        </div>
                        {m.notes && <p className="text-xs sm:text-sm text-[#8c6b47] italic pt-1 font-medium">&ldquo;{m.notes}&rdquo;</p>}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Staff View */}
              {activeSection === 'staff' && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddStaffModal(true)}
                      className="px-5 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Invite New Staff Member</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {db.staff.map(s => (
                      <div key={s.staff_id} className="p-4 sm:p-5 rounded-2xl border border-[#ede5da] bg-[#faf7f2] space-y-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-base font-bold text-[#1c1917] block">{s.full_name}</strong>
                            <span className="text-sm font-semibold text-[#8c6b47]">{s.role}</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                            Active
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#78716c] font-medium">{s.phone} • {s.email || 'atelier.staff@tailormate.com'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders View */}
              {activeSection === 'orders' && (
                <div className="space-y-3.5">
                  {db.orders.map(o => {
                    const cust = db.customers.find(c => c.customer_id === o.customer_id);
                    const items = db.order_items.filter(i => i.order_id === o.order_id);
                    const fin = calculateFinancials(o.order_id, db);
                    return (
                      <div key={o.order_id} className="p-4 sm:p-5 rounded-2xl border border-[#ede5da] bg-[#faf7f2] flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-bold text-base text-[#1c1917]">Order #{o.order_id}</span>
                            <strong className="text-base font-bold text-[#1c1917]">{cust?.full_name}</strong>
                            <span className="px-3 py-1 rounded-full bg-[#ede5da] text-[#1c1917] text-xs font-bold">
                              {o.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#57534e] mt-1 font-medium">{items.map(i => `${i.quantity}x ${i.clothing_type}`).join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="block font-extrabold text-base sm:text-lg text-[#1c1917]">{formatCurrency(fin.totalPrice)}</span>
                            <span className="block text-xs sm:text-sm text-emerald-700 font-bold">{fin.paymentStatus}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(o)}
                            className="px-4 py-2 rounded-full bg-[#1c1917] hover:bg-[#2c2825] text-white text-xs sm:text-sm font-semibold shrink-0 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Payments View */}
              {activeSection === 'payments' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-sm text-[#78716c] font-medium">
                      Comprehensive payment receipts &amp; transaction ledger across all atelier orders.
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#ede5da] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm min-w-[560px]">
                        <thead className="bg-[#faf7f2] border-b border-[#ede5da] text-[#78716c] uppercase font-bold text-xs tracking-wider">
                          <tr>
                            <th className="py-3.5 px-5">Receipt Ref</th>
                            <th className="py-3.5 px-5">Order #</th>
                            <th className="py-3.5 px-5">Customer</th>
                            <th className="py-3.5 px-5">Method</th>
                            <th className="py-3.5 px-5">Date</th>
                            <th className="py-3.5 px-5 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ede5da]">
                          {db.payments.map(p => {
                            const ord = db.orders.find(o => o.order_id === p.order_id);
                            const cust = db.customers.find(c => c.customer_id === ord?.customer_id);
                            return (
                              <tr key={p.payment_id} className="hover:bg-[#faf7f2]/70 transition-colors">
                                <td className="py-3.5 px-5 font-mono text-xs sm:text-sm text-[#8c6b47] font-bold">{p.reference || `RCPT-${p.payment_id}`}</td>
                                <td className="py-3.5 px-5 font-bold text-[#1c1917]">#{p.order_id}</td>
                                <td className="py-3.5 px-5 font-bold text-[#1c1917]">{cust?.full_name || 'Customer'}</td>
                                <td className="py-3.5 px-5">
                                  <span className="px-2.5 py-1 rounded-full bg-[#f7f2eb] border border-[#ede5da] text-xs font-semibold">
                                    {p.payment_method}
                                  </span>
                                </td>
                                <td className="py-3.5 px-5 text-xs sm:text-sm text-[#78716c] font-medium">{formatDate(p.payment_date)}</td>
                                <td className="py-3.5 px-5 font-extrabold text-base text-emerald-700 text-right">{formatCurrency(p.amount)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Reports View */}
              {activeSection === 'reports' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-sm text-[#78716c] font-medium">
                      Operational performance, financial summaries, and artisan task metrics.
                    </span>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-full bg-[#1c1917] text-white text-xs sm:text-sm font-semibold hover:bg-[#2c2825] transition-colors"
                    >
                      Export / Print Report
                    </button>
                  </div>

                  {/* High Level KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                    <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ede5da]">
                      <span className="text-xs uppercase font-bold text-[#8c6b47] tracking-wider block">Total Revenue Collected</span>
                      <strong className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] block mt-1">
                        {formatCurrency(db.payments.reduce((acc, p) => acc + p.amount, 0))}
                      </strong>
                      <span className="text-xs sm:text-sm text-emerald-700 font-bold mt-1 block">From {db.payments.length} transactions</span>
                    </div>

                    <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ede5da]">
                      <span className="text-xs uppercase font-bold text-[#8c6b47] tracking-wider block">Outstanding Balance</span>
                      <strong className="text-2xl sm:text-3xl font-extrabold text-[#b91c1c] block mt-1">
                        {formatCurrency(
                          db.orders.reduce((acc, o) => {
                            const fin = calculateFinancials(o.order_id, db);
                            return acc + fin.balanceRemaining;
                          }, 0)
                        )}
                      </strong>
                      <span className="text-xs sm:text-sm text-[#78716c] mt-1 block font-medium">Uncollected order balances</span>
                    </div>

                    <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ede5da]">
                      <span className="text-xs uppercase font-bold text-[#8c6b47] tracking-wider block">Order Completion Rate</span>
                      <strong className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] block mt-1">
                        {Math.round((db.orders.filter(o => o.status === 'Ready' || o.status === 'Collected').length / (db.orders.length || 1)) * 100)}%
                      </strong>
                      <span className="text-xs sm:text-sm text-[#78716c] mt-1 block font-medium">
                        {db.orders.filter(o => o.status === 'Ready' || o.status === 'Collected').length} of {db.orders.length} orders finished
                      </span>
                    </div>

                    <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#ede5da]">
                      <span className="text-xs uppercase font-bold text-[#8c6b47] tracking-wider block">Registered Clients</span>
                      <strong className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] block mt-1">
                        {db.customers.length}
                      </strong>
                      <span className="text-xs sm:text-sm text-[#78716c] mt-1 block font-medium">{db.measurements.length} saved measurement vaults</span>
                    </div>
                  </div>

                  {/* Production & Artisan Productivity Grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Artisan Productivity */}
                    <div className="bg-white rounded-2xl border border-[#ede5da] p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#ede5da] pb-3">
                        <strong className="text-base font-bold text-[#1c1917]">Artisan Task Progress</strong>
                        <span className="text-xs sm:text-sm font-semibold text-[#78716c]">{db.staff.length} Active Tailors</span>
                      </div>
                      <div className="space-y-3.5">
                        {db.staff.map(s => {
                          const tasks = db.order_staff.filter(os => os.staff_id === s.staff_id);
                          const completed = tasks.filter(os => os.status === 'Completed').length;
                          const inProgress = tasks.filter(os => os.status === 'In Progress').length;
                          const rate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
                          return (
                            <div key={s.staff_id} className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#ede5da] space-y-2">
                              <div className="flex justify-between items-center">
                                <div>
                                  <strong className="text-sm font-bold text-[#1c1917]">{s.full_name}</strong>
                                  <span className="text-xs text-[#8c6b47] font-semibold block">{s.role}</span>
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-[#1c1917]">{rate}% done</span>
                              </div>
                              <div className="w-full bg-[#ede5da] h-2.5 rounded-full overflow-hidden">
                                <div className="bg-[#c69b6d] h-full rounded-full transition-all" style={{ width: `${rate}%` }} />
                              </div>
                              <div className="flex justify-between text-xs text-[#78716c] font-medium">
                                <span>{inProgress} active / {tasks.length} total tasks</span>
                                <span>{completed} finished</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Workflow Stages */}
                    <div className="bg-white rounded-2xl border border-[#ede5da] p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#ede5da] pb-3">
                        <strong className="text-base font-bold text-[#1c1917]">Order Pipeline Stages</strong>
                        <span className="text-xs sm:text-sm font-semibold text-[#78716c]">{db.orders.length} Total Orders</span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: 'Pending / Unstarted', count: db.orders.filter(o => o.status === 'Pending').length, color: 'bg-amber-500' },
                          { label: 'In Progress (Cutting / Sewing)', count: db.orders.filter(o => o.status === 'In Progress').length, color: 'bg-blue-500' },
                          { label: 'Ready for Fitting / Pickup', count: db.orders.filter(o => o.status === 'Ready').length, color: 'bg-purple-500' },
                          { label: 'Completed & Collected', count: db.orders.filter(o => o.status === 'Collected').length, color: 'bg-emerald-500' },
                        ].map((stage, idx) => {
                          const pct = Math.round((stage.count / (db.orders.length || 1)) * 100);
                          return (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs sm:text-sm font-medium">
                                <span className="text-[#57534e]">{stage.label}</span>
                                <span className="font-bold text-[#1c1917]">{stage.count} ({pct}%)</span>
                              </div>
                              <div className="w-full bg-[#ede5da] h-2.5 rounded-full overflow-hidden">
                                <div className={`${stage.color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </section>
          )}

        </main>

      </div>

      {/* =========================================================================
          MULTI-SECTION NEW ORDER MODAL (+ NEW ORDER)
          Designed directly from your database structure
          ========================================================================= */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-6 my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-4">
              <div>
                <span className="text-xs font-bold text-[#8c6b47] uppercase tracking-wider block">
                  RELATIONAL WORKSHOP ORDER CREATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] mt-0.5">
                  Create New Bespoke Order
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowNewOrderModal(false)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-6 text-sm">
              
              {/* 1. CUSTOMER */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917] block">
                      1. WHO IS THIS ORDER FOR?
                    </strong>
                    <span className="text-xs sm:text-sm text-[#78716c] font-medium">
                      Choose an existing client or enter a new customer below
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#ede5da]">
                    <button
                      type="button"
                      onClick={() => setOrderCustomerMode('existing')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${orderCustomerMode === 'existing' ? 'bg-[#c69b6d] text-white' : 'text-[#57534e] hover:text-[#1c1917]'}`}
                    >
                      Returning Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderCustomerMode('new')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${orderCustomerMode === 'new' ? 'bg-[#c69b6d] text-white' : 'text-[#57534e] hover:text-[#1c1917]'}`}
                    >
                      + New Client
                    </button>
                  </div>
                </div>

                {orderCustomerMode === 'existing' ? (
                  <select
                    value={newOrderCustId}
                    onChange={e => setNewOrderCustId(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-[#ede5da] bg-white font-medium text-sm"
                  >
                    {db.customers.map(c => (
                      <option key={c.customer_id} value={c.customer_id}>
                        {c.full_name} ({c.phone}) — {c.address}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Patrick Mboma"
                        value={inlineCustName}
                        onChange={e => setInlineCustName(e.target.value)}
                        required={orderCustomerMode === 'new'}
                        className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Phone Number *</label>
                      <input
                        type="text"
                        placeholder="e.g. +237 671 234 567"
                        value={inlineCustPhone}
                        onChange={e => setInlineCustPhone(e.target.value)}
                        required={orderCustomerMode === 'new'}
                        className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Address / Quarter</label>
                      <input
                        type="text"
                        placeholder="e.g. Bonapriso, Douala"
                        value={inlineCustAddress}
                        onChange={e => setInlineCustAddress(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. ORDER INFORMATION */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917] block">
                  2. ORDER INFORMATION
                </strong>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Order Date</label>
                    <input
                      type="date"
                      value={newOrderDate}
                      onChange={e => setNewOrderDate(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Expected Collection Date</label>
                    <input
                      type="date"
                      value={newOrderDueDate}
                      onChange={e => setNewOrderDueDate(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Initial Status</label>
                    <select
                      value={newOrderStatus}
                      onChange={e => setNewOrderStatus(e.target.value as OrderStatus)}
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm font-medium"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready">Ready</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Styling / Fabric Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Customer requested slim fit, navy blue cashmere..."
                    value={newOrderNotes}
                    onChange={e => setNewOrderNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm"
                  />
                </div>
              </div>

              {/* 3. CLOTHING ITEMS (Dynamic Multi-Item List) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917]">
                    3. CLOTHING ITEMS
                  </strong>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="text-xs sm:text-sm text-[#8c6b47] hover:underline font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {orderItemsList.map((item, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#ede5da] space-y-2.5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#1c1917]">Item #{idx + 1}</span>
                          <span className="text-xs sm:text-sm text-[#78716c]">
                            • Total: <strong className="text-[#8c6b47]">{formatCurrency((item.quantity || 1) * (item.unit_price || 0))}</strong>
                          </span>
                        </div>
                        {orderItemsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItemRow(idx)}
                            className="text-[#b91c1c] hover:opacity-80 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                        <div className="sm:col-span-4 min-w-0">
                          <label className="block text-xs font-semibold text-[#78716c] mb-1">Clothing Type</label>
                          <input
                            type="text"
                            placeholder="e.g. Shirt, Trouser, Kaftan"
                            value={item.clothing_type}
                            onChange={e => {
                              const updated = [...orderItemsList];
                              updated[idx].clothing_type = e.target.value;
                              setOrderItemsList(updated);
                            }}
                            required
                            className="w-full min-w-0 p-2.5 text-sm rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d]"
                          />
                        </div>

                        <div className="sm:col-span-4 min-w-0">
                          <label className="block text-xs font-semibold text-[#78716c] mb-1">Description &amp; Details</label>
                          <input
                            type="text"
                            placeholder="e.g. White long-sleeve, French cuffs"
                            value={item.description}
                            onChange={e => {
                              const updated = [...orderItemsList];
                              updated[idx].description = e.target.value;
                              setOrderItemsList(updated);
                            }}
                            required
                            className="w-full min-w-0 p-2.5 text-sm rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d]"
                          />
                        </div>

                        <div className="grid grid-cols-5 sm:col-span-4 gap-2 min-w-0">
                          <div className="col-span-2 min-w-0">
                            <label className="block text-xs font-semibold text-[#78716c] mb-1">Qty</label>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={e => {
                                const updated = [...orderItemsList];
                                updated[idx].quantity = Math.max(1, Number(e.target.value) || 1);
                                setOrderItemsList(updated);
                              }}
                              className="w-full min-w-0 p-2.5 text-sm rounded-xl border border-[#ede5da] bg-[#faf7f2] text-center focus:outline-none focus:border-[#c69b6d] font-bold"
                            />
                          </div>

                          <div className="col-span-3 min-w-0">
                            <label className="block text-xs font-semibold text-[#78716c] mb-1 truncate">
                              Price ({currentBusiness?.currency || 'FCFA'})
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={item.unit_price}
                              onChange={e => {
                                const updated = [...orderItemsList];
                                updated[idx].unit_price = Math.max(0, Number(e.target.value) || 0);
                                setOrderItemsList(updated);
                              }}
                              className="w-full min-w-0 p-2.5 text-sm rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold text-sm sm:text-base text-[#1c1917] pt-1">
                  Items Subtotal: <span className="text-[#c69b6d]">{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              {/* 4. MEASUREMENTS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917]">
                    4. MEASUREMENTS
                  </strong>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMeasurementMode('existing')}
                      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${measurementMode === 'existing' ? 'bg-[#c69b6d] text-white' : 'bg-white border border-[#ede5da] text-[#57534e]'}`}
                    >
                      Use Existing Latest
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementMode('new')}
                      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${measurementMode === 'new' ? 'bg-[#c69b6d] text-white' : 'bg-white border border-[#ede5da] text-[#57534e]'}`}
                    >
                      Record New
                    </button>
                  </div>
                </div>

                {measurementMode === 'new' ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-[#78716c]">
                      <span>Record individual or multiple sizing profiles for this order:</span>
                      <button
                        type="button"
                        onClick={handleAddFamilyMember}
                        className="px-3.5 py-1.5 rounded-full bg-[#ede5da] hover:bg-[#c69b6d] hover:text-white text-[#1c1917] font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>+ Add Child / Family Member</span>
                      </button>
                    </div>

                    {familySizingList.map((mem, memIdx) => (
                      <div key={mem.id} className="p-4 bg-white rounded-xl border border-[#ede5da] space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="w-6 h-6 rounded-full bg-[#f7f2eb] text-[#8c6b47] font-bold text-xs flex items-center justify-center shrink-0">
                              {memIdx + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Name / Role (e.g. Mom, Junior - Son, Chloe)"
                              value={mem.label}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'label', e.target.value)}
                              className="font-bold text-xs sm:text-sm text-[#1c1917] bg-[#faf7f2] border border-[#ede5da] rounded-xl px-3 py-1.5 w-full max-w-xs focus:outline-none focus:border-[#c69b6d]"
                            />
                          </div>

                          {familySizingList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFamilyMember(mem.id)}
                              className="text-[#78716c] hover:text-[#b91c1c] p-1.5 rounded-md transition-colors"
                              title="Remove this member's sizing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-7 gap-2 text-xs">
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Neck</label>
                            <input
                              type="number"
                              value={mem.neck}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'neck', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Chest</label>
                            <input
                              type="number"
                              value={mem.chest}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'chest', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Waist</label>
                            <input
                              type="number"
                              value={mem.waist}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'waist', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Shoulder</label>
                            <input
                              type="number"
                              value={mem.shoulder}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'shoulder', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Sleeve</label>
                            <input
                              type="number"
                              value={mem.sleeve_length}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'sleeve_length', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Trouser</label>
                            <input
                              type="number"
                              value={mem.trouser_length}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'trouser_length', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Inseam</label>
                            <input
                              type="number"
                              value={mem.inseam}
                              onChange={e => handleUpdateFamilyMember(mem.id, 'inseam', Number(e.target.value))}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-center font-bold text-sm"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Fitting notes (e.g. Growing allowance, slim fit, school uniform)"
                          value={mem.notes}
                          onChange={e => handleUpdateFamilyMember(mem.id, 'notes', e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-xs sm:text-sm font-medium"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    {(() => {
                      const existingRecords = db.measurements.filter(m => m.customer_id === Number(newOrderCustId));
                      if (existingRecords.length === 0) {
                        return (
                          <div className="p-4 bg-white rounded-xl border border-[#ede5da] text-xs sm:text-sm text-[#78716c] flex items-center justify-between">
                            <span>No saved sizing profile found for this client.</span>
                            <button
                              type="button"
                              onClick={() => setMeasurementMode('new')}
                              className="text-[#8c6b47] hover:underline font-bold"
                            >
                              Record Sizing Now →
                            </button>
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-2">
                          <span className="text-xs sm:text-sm text-[#78716c] font-medium block">
                            ✓ {existingRecords.length} saved sizing profile(s) found for this client / family:
                          </span>
                          <div className="grid sm:grid-cols-2 gap-2.5">
                            {existingRecords.map(rec => (
                              <div key={rec.measurement_id} className="p-3 bg-white rounded-xl border border-[#ede5da] text-xs sm:text-sm space-y-1">
                                <div className="flex justify-between font-bold text-[#1c1917]">
                                  <span>{rec.notes || `Profile #${rec.measurement_id}`}</span>
                                  <span className="text-xs text-[#78716c] font-normal">{formatDate(rec.measured_at)}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-[#78716c]">
                                  Chest: {rec.chest}cm • Waist: {rec.waist}cm • Shld: {rec.shoulder}cm • Trs: {rec.trouser_length}cm
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* 5. ASSIGN WORK */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917] block">
                  5. ASSIGN WORK (STAFF &amp; TASKS)
                </strong>

                <div className="grid sm:grid-cols-3 gap-3">
                  {db.staff.slice(1).map(st => {
                    const isAssigned = assignedStaffList.some(a => a.staff_id === st.staff_id);
                    const currentTask = assignedStaffList.find(a => a.staff_id === st.staff_id)?.task || (st.role.includes('Sewing') ? 'Sewing' : st.role.includes('Cutting') ? 'Cutting' : 'Finishing');
                    
                    return (
                      <div key={st.staff_id} className={`p-3.5 rounded-xl border transition-all ${isAssigned ? 'bg-white border-[#c69b6d] shadow-xs' : 'bg-white border-[#ede5da]'}`}>
                        <label className="flex items-center gap-2.5 cursor-pointer mb-2">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={e => {
                              if (e.target.checked) {
                                setAssignedStaffList([...assignedStaffList, { staff_id: st.staff_id, task: currentTask }]);
                              } else {
                                setAssignedStaffList(assignedStaffList.filter(a => a.staff_id !== st.staff_id));
                              }
                            }}
                            className="rounded text-[#c69b6d] w-4 h-4"
                          />
                          <span className="font-bold text-sm text-[#1c1917]">{st.full_name}</span>
                        </label>

                        {isAssigned && (
                          <div>
                            <label className="block text-xs font-semibold text-[#78716c] mb-1">Specific Task</label>
                            <input
                              type="text"
                              value={currentTask}
                              onChange={e => {
                                const updated = assignedStaffList.map(a => a.staff_id === st.staff_id ? { ...a, task: e.target.value } : a);
                                setAssignedStaffList(updated);
                              }}
                              className="w-full p-2 rounded-lg border border-[#ede5da] bg-[#faf7f2] text-xs sm:text-sm font-medium"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6. PAYMENT */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3.5">
                <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1917] block">
                  6. PAYMENT DEPOSIT
                </strong>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Deposit Amount (FCFA)</label>
                    <input
                      type="number"
                      value={newOrderDeposit}
                      onChange={e => setNewOrderDeposit(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white font-extrabold text-emerald-700 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Payment Method</label>
                    <select
                      value={newOrderPayMethod}
                      onChange={e => setNewOrderPayMethod(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm font-medium"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="POS / Card">POS / Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#78716c] mb-1">Reference</label>
                    <input
                      type="text"
                      value={newOrderPayRef}
                      onChange={e => setNewOrderPayRef(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 text-sm border-t border-[#ede5da]">
                  <span className="font-medium text-[#57534e]">Remaining Balance to Collect:</span>
                  <strong className="text-[#b91c1c] text-base font-extrabold">{formatCurrency(remainingBalance)}</strong>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="p-5 rounded-2xl bg-[#1c1917] text-white space-y-2.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#a8a19b]">Order Total:</span>
                  <strong className="text-lg text-white font-extrabold">{formatCurrency(orderTotal)}</strong>
                </div>
                <div className="flex justify-between items-center text-sm text-emerald-400">
                  <span>Initial Paid Deposit:</span>
                  <strong className="font-bold">{formatCurrency(newOrderDeposit)}</strong>
                </div>
                <div className="flex justify-between items-center text-sm text-[#c69b6d]">
                  <span>Outstanding at Collection:</span>
                  <strong className="font-bold">{formatCurrency(remainingBalance)}</strong>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-6 py-2.5 sm:py-3 rounded-full border border-[#ede5da] text-[#78716c] hover:bg-[#faf7f2] font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 sm:py-3 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-sm sm:text-base shadow-md inline-flex items-center gap-2 transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>Create Order</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW CUSTOMER
          ========================================================================= */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917]">
                Add New Customer
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddCustomerModal(false)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mavis Lum"
                  value={custFullName}
                  onChange={e => setCustFullName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium focus:outline-none focus:border-[#c69b6d]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. +237 671 234 567"
                  value={custPhone}
                  onChange={e => setCustPhone(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium focus:outline-none focus:border-[#c69b6d]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="e.g. client@example.com"
                  value={custEmail}
                  onChange={e => setCustEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium focus:outline-none focus:border-[#c69b6d]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Address / Quarter</label>
                <input
                  type="text"
                  placeholder="e.g. Bonamoussadi, Douala"
                  value={custAddress}
                  onChange={e => setCustAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium focus:outline-none focus:border-[#c69b6d]"
                />
              </div>

              {/* Optional Initial Measurements Section */}
              <div className="pt-2.5 border-t border-[#ede5da]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1c1917] text-xs sm:text-sm">Include Body Measurements</span>
                  <button
                    type="button"
                    onClick={() => setCustIncludeMeasurements(!custIncludeMeasurements)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${custIncludeMeasurements ? 'bg-[#c69b6d] text-white' : 'bg-[#faf7f2] border border-[#ede5da] text-[#57534e]'}`}
                  >
                    {custIncludeMeasurements ? "✓ Recording Measurements" : "+ Add Measurements Now"}
                  </button>
                </div>

                {custIncludeMeasurements && (
                  <div className="mt-3.5 p-4 bg-[#faf7f2] rounded-xl border border-[#ede5da] space-y-3">
                    <span className="text-xs uppercase font-bold text-[#8c6b47] tracking-wider block">
                      Initial Anatomical Sizing (cm)
                    </span>
                    <div className="grid grid-cols-3 xs:grid-cols-4 gap-2 text-xs">
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Neck</label>
                        <input
                          type="number"
                          value={custNeck}
                          onChange={e => setCustNeck(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Chest</label>
                        <input
                          type="number"
                          value={custChest}
                          onChange={e => setCustChest(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Waist</label>
                        <input
                          type="number"
                          value={custWaist}
                          onChange={e => setCustWaist(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Shoulder</label>
                        <input
                          type="number"
                          value={custShoulder}
                          onChange={e => setCustShoulder(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Sleeve</label>
                        <input
                          type="number"
                          value={custSleeve}
                          onChange={e => setCustSleeve(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Trouser</label>
                        <input
                          type="number"
                          value={custTrouser}
                          onChange={e => setCustTrouser(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#78716c] uppercase font-bold mb-1">Inseam</label>
                        <input
                          type="number"
                          value={custInseam}
                          onChange={e => setCustInseam(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-[#ede5da] bg-white text-center font-bold text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Sizing notes (e.g. Slim fit preference, broad shoulders)"
                        value={custMeasNotes}
                        onChange={e => setCustMeasNotes(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-white text-xs sm:text-sm font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#ede5da] text-[#78716c] hover:bg-[#faf7f2] font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-7 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-sm transition-colors shadow-xs"
                >
                  Save Customer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: INVITE STAFF MEMBER
          ========================================================================= */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917]">
                Add Staff Member
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddStaffModal(false)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteStaff} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Nelson T."
                  value={staffFullName}
                  onChange={e => setStaffFullName(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. +237 672 345 678"
                  value={staffPhone}
                  onChange={e => setStaffPhone(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="e.g. nelson@example.com"
                  value={staffEmail}
                  onChange={e => setStaffEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] mb-1.5">Role</label>
                <select
                  value={staffRole}
                  onChange={e => setStaffRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-sm font-medium"
                >
                  <option value="Sewing Specialist">Sewing Specialist</option>
                  <option value="Pattern Cutting">Pattern Cutting</option>
                  <option value="Finishing & Embroidery">Finishing &amp; Embroidery</option>
                  <option value="General Artisan">General Artisan</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#ede5da] text-[#78716c] hover:bg-[#faf7f2] font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-7 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-sm transition-colors shadow-xs"
                >
                  Invite Staff
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VIEW ORDER DETAILS
          ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-4">
              <div>
                <span className="text-xs font-bold text-[#8c6b47] uppercase tracking-wider">ORDER #{selectedOrder.order_id}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] mt-0.5">
                  {db.customers.find(c => c.customer_id === selectedOrder.customer_id)?.full_name}
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Financial Summary */}
            {(() => {
              const fin = calculateFinancials(selectedOrder.order_id, db);
              return (
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ede5da] grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <span className="text-xs font-bold text-[#78716c] uppercase block mb-0.5">Total</span>
                    <strong className="text-sm sm:text-base font-extrabold text-[#1c1917] truncate block">{formatCurrency(fin.totalPrice)}</strong>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#78716c] uppercase block mb-0.5">Paid</span>
                    <strong className="text-sm sm:text-base font-extrabold text-emerald-700 truncate block">{formatCurrency(fin.totalPaid)}</strong>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#78716c] uppercase block mb-0.5">Balance</span>
                    <strong className="text-sm sm:text-base font-extrabold text-[#b91c1c] truncate block">{formatCurrency(fin.balanceRemaining)}</strong>
                  </div>
                </div>
              );
            })()}

            {/* Garments list */}
            <div className="space-y-2.5">
              <span className="font-bold text-[#78716c] uppercase tracking-wider text-xs">Garments</span>
              <div className="space-y-2">
                {db.order_items.filter(i => i.order_id === selectedOrder.order_id).map(item => (
                  <div key={item.order_item_id} className="p-3 rounded-xl bg-[#faf7f2] flex justify-between gap-3">
                    <div>
                      <strong className="text-base font-bold text-[#1c1917] block">{item.quantity}x {item.clothing_type}</strong>
                      <p className="text-xs sm:text-sm text-[#78716c] font-medium">{item.description}</p>
                    </div>
                    <span className="font-extrabold text-base text-[#1c1917] shrink-0">{formatCurrency(item.unit_price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Assigned */}
            <div className="space-y-2.5">
              <span className="font-bold text-[#78716c] uppercase tracking-wider text-xs">Staff Tasks</span>
              <div className="space-y-2">
                {db.order_staff.filter(os => os.order_id === selectedOrder.order_id).map((os, idx) => {
                  const st = db.staff.find(s => s.staff_id === os.staff_id);
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-[#faf7f2] flex justify-between items-center gap-3">
                      <div>
                        <strong className="text-base font-bold text-[#1c1917] block">{st?.full_name}</strong>
                        <span className="text-xs sm:text-sm text-[#78716c] font-medium block">Task: {os.task}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${os.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : os.status === 'Blocked' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'}`}>
                        {os.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setPaymentModalOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#2c2825] text-white text-xs sm:text-sm font-bold text-center transition-colors"
              >
                + Record Payment
              </button>

              <button
                type="button"
                onClick={() => {
                  setWhatsappOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: WHATSAPP SIMULATION
          ========================================================================= */}
      {whatsappOrder && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 space-y-4 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <h3 className="text-lg sm:text-2xl font-bold text-[#1c1917] truncate">
                  WhatsApp Client Dispatch
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setWhatsappOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#ecfdf5] border border-[#d1fae5] space-y-2.5 text-sm sm:text-base text-[#065f46] leading-relaxed">
              <p><strong className="font-bold">To:</strong> {db.customers.find(c => c.customer_id === whatsappOrder.customer_id)?.full_name}</p>
              <p className="border-t border-[#a7f3d0] pt-2.5 text-sm sm:text-base font-medium">
                &ldquo;Hello! This is TailorMate Atelier regarding your Order #{whatsappOrder.order_id}. Your suiting pieces are currently {whatsappOrder.status}. Expected collection is {formatDate(whatsappOrder.due_date)}.&rdquo;
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWhatsappOrder(null)}
                className="px-5 py-2.5 rounded-full border border-[#ede5da] text-xs sm:text-sm font-semibold text-[#78716c] hover:bg-[#faf7f2]"
              >
                Close
              </button>
              <a
                href={`https://wa.me/?text=Hello!%20This%20is%20TailorMate%20Atelier%20regarding%20Order%20%23${whatsappOrder.order_id}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>Send WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CUSTOMER MEASUREMENT VAULT
          ========================================================================= */}
      {selectedCustomerForMeasurement && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-xl rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5">
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#8c6b47] uppercase tracking-wider">Sizing Profile</span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#1c1917]">
                  {selectedCustomerForMeasurement.full_name}
                </h3>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowVaultAddForm(!showVaultAddForm)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${showVaultAddForm ? 'bg-[#ede5da] text-[#1c1917]' : 'bg-[#c69b6d] hover:bg-[#8c6b47] text-white'}`}
                >
                  {showVaultAddForm ? "Cancel" : "+ Record Sizing"}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setSelectedCustomerForMeasurement(null);
                    setShowVaultAddForm(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Inline Add Measurement Form */}
            {showVaultAddForm && (
              <form onSubmit={handleSaveVaultMeasurement} className="p-4 sm:p-5 bg-[#faf7f2] rounded-2xl border border-[#ede5da] space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8c6b47]">
                    New Body Measurements (cm)
                  </span>
                  <span className="text-xs text-[#78716c] font-medium">Measured today</span>
                </div>

                <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Neck</label>
                    <input
                      type="number"
                      value={vaultNeck}
                      onChange={e => setVaultNeck(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Chest</label>
                    <input
                      type="number"
                      value={vaultChest}
                      onChange={e => setVaultChest(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Waist</label>
                    <input
                      type="number"
                      value={vaultWaist}
                      onChange={e => setVaultWaist(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Shoulder</label>
                    <input
                      type="number"
                      value={vaultShoulder}
                      onChange={e => setVaultShoulder(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Sleeve</label>
                    <input
                      type="number"
                      value={vaultSleeve}
                      onChange={e => setVaultSleeve(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Trouser</label>
                    <input
                      type="number"
                      value={vaultTrouser}
                      onChange={e => setVaultTrouser(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#78716c] uppercase mb-1">Inseam</label>
                    <input
                      type="number"
                      value={vaultInseam}
                      onChange={e => setVaultInseam(Number(e.target.value))}
                      className="w-full p-2 rounded-xl border border-[#ede5da] bg-white text-center font-bold text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Sizing notes (e.g. Kaftan fit, tailored waist)"
                    value={vaultNotes}
                    onChange={e => setVaultNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ede5da] bg-white text-xs sm:text-sm font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowVaultAddForm(false)}
                    className="px-4 py-2 rounded-full border border-[#ede5da] text-xs sm:text-sm font-semibold text-[#78716c]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    Save Measurements
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3.5 sm:space-y-4">
              {db.measurements.filter(m => m.customer_id === selectedCustomerForMeasurement.customer_id).length === 0 && !showVaultAddForm && (
                <div className="p-7 text-center rounded-2xl bg-[#faf7f2] border border-dashed border-[#ede5da] space-y-3">
                  <Ruler className="w-10 h-10 text-[#8c6b47] mx-auto opacity-60" />
                  <p className="text-xs sm:text-sm text-[#78716c] font-medium">
                    No sizing profiles recorded yet for {selectedCustomerForMeasurement.full_name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowVaultAddForm(true)}
                    className="px-5 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Record Initial Sizing</span>
                  </button>
                </div>
              )}

              {db.measurements
                .filter(m => m.customer_id === selectedCustomerForMeasurement.customer_id)
                .map(m => (
                  <div key={m.measurement_id} className="p-4 sm:p-5 rounded-2xl bg-[#faf7f2] border border-[#ede5da] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base font-bold text-[#1c1917]">Profile Record #{m.measurement_id}</span>
                      <span className="text-xs sm:text-sm text-[#78716c] font-medium">{formatDate(m.measured_at)}</span>
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Neck</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.neck} cm</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Chest</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.chest} cm</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Waist</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.waist} cm</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Shoulder</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.shoulder} cm</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Sleeve</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.sleeve_length} cm</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-[#ede5da]">
                        <span className="text-xs text-[#78716c] font-semibold block uppercase">Trouser</span>
                        <strong className="text-sm sm:text-base font-bold text-[#1c1917]">{m.trouser_length} cm</strong>
                      </div>
                    </div>

                    {m.notes && (
                      <p className="text-xs sm:text-sm text-[#8c6b47] italic font-medium pt-1">
                        Note: &ldquo;{m.notes}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedCustomerForMeasurement(null);
                  setShowVaultAddForm(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#2c2825] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: RECORD PAYMENT
          ========================================================================= */}
      {paymentModalOrder && (
        <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl sm:rounded-3xl border border-[#ede5da] shadow-2xl p-5 sm:p-7 space-y-4 my-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#ede5da] pb-3.5">
              <h3 className="text-lg sm:text-2xl font-bold text-[#1c1917]">
                Record Payment for Order #{paymentModalOrder.order_id}
              </h3>
              <button 
                type="button" 
                onClick={() => setPaymentModalOrder(null)}
                className="p-1.5 rounded-full hover:bg-[#f7f2eb] text-[#78716c]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Amount (FCFA)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={e => setPayAmount(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full p-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] focus:outline-none focus:border-[#c69b6d] text-sm sm:text-base font-bold text-[#1c1917]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={e => setPayMethod(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-xs sm:text-sm font-medium text-[#1c1917]"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Mobile Money (MTN / Orange)">Mobile Money</option>
                  <option value="POS / Card">POS / Card</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#1c1917] uppercase tracking-wide mb-1.5">Receipt Reference</label>
                <input
                  type="text"
                  placeholder="e.g. RCPT-102-FINAL"
                  value={payRef}
                  onChange={e => setPayRef(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#ede5da] bg-[#faf7f2] text-xs sm:text-sm font-medium text-[#1c1917]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentModalOrder(null)}
                  className="px-5 py-2.5 rounded-full border border-[#ede5da] text-xs sm:text-sm font-semibold text-[#78716c] hover:bg-[#faf7f2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#c69b6d] hover:bg-[#8c6b47] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  Save Payment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
