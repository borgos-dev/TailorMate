import { 
  Customer, 
  Measurement, 
  Order, 
  OrderItem, 
  Staff, 
  OrderStaff, 
  Payment, 
  OrderFinancials, 
  DueAlertOrder,
  Business,
  User,
  TaskStatus
} from './types';

export interface DatabaseSchema {
  systemDate: string;
  businesses: Business[];
  users: User[];
  customers: Customer[];
  measurements: Measurement[];
  staff: Staff[];
  orders: Order[];
  order_items: OrderItem[];
  order_staff: OrderStaff[];
  payments: Payment[];
}

export const DEFAULT_DATABASE: DatabaseSchema = {
  systemDate: '2026-09-16',
  businesses: [
    {
      business_id: 1,
      name: "Sally's Tailoring Atelier",
      phone: '+237 671 234 567',
      address: 'Akwa, Douala, Cameroon',
      currency: 'FCFA',
      created_at: '2026-01-10'
    }
  ],
  users: [
    {
      user_id: 1,
      business_id: 1,
      full_name: 'Sally',
      email: 'sally@example.com',
      phone: '+237 671 234 567',
      role: 'CHIEF_TAILOR',
      created_at: '2026-01-10'
    },
    {
      user_id: 2,
      business_id: 1,
      full_name: 'Juspen',
      email: 'juspen@example.com',
      phone: '+237 672 345 678',
      role: 'STAFF',
      created_at: '2026-02-15'
    },
    {
      user_id: 3,
      business_id: 1,
      full_name: 'Nelson',
      email: 'nelson@example.com',
      phone: '+237 673 456 789',
      role: 'STAFF',
      created_at: '2026-02-15'
    },
    {
      user_id: 4,
      business_id: 1,
      full_name: 'Wansi',
      email: 'wansi@example.com',
      phone: '+237 674 567 890',
      role: 'STAFF',
      created_at: '2026-03-01'
    }
  ],
  customers: [
    {
      customer_id: 1,
      business_id: 1,
      full_name: 'Mavis',
      phone: '+237 671 234 567',
      email: 'mavis@example.com',
      address: 'Bonamoussadi, Douala'
    },
    {
      customer_id: 2,
      business_id: 1,
      full_name: 'Gwen',
      phone: '+237 672 345 678',
      email: 'gwen@example.com',
      address: 'Denver, Bonapriso, Douala'
    },
    {
      customer_id: 3,
      business_id: 1,
      full_name: 'Senorita',
      phone: '+237 673 456 789',
      email: 'senorita@example.com',
      address: 'Makepe, Douala'
    },
    {
      customer_id: 4,
      business_id: 1,
      full_name: 'Wansi T.',
      phone: '+237 674 567 890',
      email: 'wansi.client@example.com',
      address: 'Bali, Douala'
    }
  ],
  measurements: [
    {
      measurement_id: 1,
      customer_id: 1,
      measured_at: '2026-09-01',
      neck: 39.0,
      chest: 102.0,
      waist: 88.0,
      hip: 100.0,
      shoulder: 45.0,
      sleeve_length: 62.0,
      shirt_length: 76.0,
      trouser_length: 104.0,
      inseam: 78.0,
      notes: 'Prefers classic slim fit finish'
    },
    {
      measurement_id: 2,
      customer_id: 2,
      measured_at: '2026-09-03',
      neck: 36.0,
      chest: 92.0,
      waist: 74.0,
      hip: 102.0,
      shoulder: 40.0,
      sleeve_length: 56.0,
      shirt_length: 68.0,
      trouser_length: 102.0,
      inseam: 76.0,
      notes: 'Evening gown floor-length cut'
    },
    {
      measurement_id: 3,
      customer_id: 3,
      measured_at: '2026-09-05',
      neck: 42.0,
      chest: 108.0,
      waist: 92.0,
      hip: 106.0,
      shoulder: 48.0,
      sleeve_length: 64.0,
      shirt_length: 80.0,
      trouser_length: 106.0,
      inseam: 80.0,
      notes: 'Ceremonial senator cut'
    },
    {
      measurement_id: 4,
      customer_id: 4,
      measured_at: '2026-09-10',
      neck: 37.0,
      chest: 94.0,
      waist: 76.0,
      hip: 104.0,
      shoulder: 41.0,
      sleeve_length: 58.0,
      shirt_length: 70.0,
      trouser_length: 100.0,
      inseam: 74.0,
      notes: 'Tailored corporate blazer adjustment'
    }
  ],
  staff: [
    {
      staff_id: 1,
      business_id: 1,
      full_name: 'Sally',
      phone: '+237 671 234 567',
      email: 'sally@example.com',
      role: 'Chief Tailor / Atelier Owner'
    },
    {
      staff_id: 2,
      business_id: 1,
      full_name: 'Juspen',
      phone: '+237 672 345 678',
      email: 'juspen@example.com',
      role: 'Sewing Specialist'
    },
    {
      staff_id: 3,
      business_id: 1,
      full_name: 'Nelson',
      phone: '+237 673 456 789',
      email: 'nelson@example.com',
      role: 'Pattern Cutting'
    },
    {
      staff_id: 4,
      business_id: 1,
      full_name: 'Wansi',
      phone: '+237 674 567 890',
      email: 'wansi@example.com',
      role: 'Finishing & Embroidery'
    }
  ],
  orders: [
    {
      order_id: 101,
      business_id: 1,
      customer_id: 1,
      order_date: '2026-09-05',
      due_date: '2026-09-18',
      status: 'Ready',
      notes: 'White senator suit with front embroidery. Ready for collection.'
    },
    {
      order_id: 102,
      business_id: 1,
      customer_id: 1,
      order_date: '2026-09-10',
      due_date: '2026-09-17',
      status: 'In Progress',
      notes: 'URGENT: Due tomorrow! 2 Shirts + 2 Trousers.'
    },
    {
      order_id: 108,
      business_id: 1,
      customer_id: 2,
      order_date: '2026-09-12',
      due_date: '2026-09-16',
      status: 'In Progress',
      notes: 'Ceremonial silk dress. Due today!'
    },
    {
      order_id: 115,
      business_id: 1,
      customer_id: 3,
      order_date: '2026-09-14',
      due_date: '2026-09-18',
      status: 'Pending',
      notes: '3 Custom senator shirts.'
    },
    {
      order_id: 105,
      business_id: 1,
      customer_id: 4,
      order_date: '2026-09-02',
      due_date: '2026-09-12',
      status: 'Collected',
      notes: 'Completed and collected on time with full payment.'
    }
  ],
  order_items: [
    { order_item_id: 1, order_id: 101, clothing_type: 'Senator Suit', description: '2-piece white senator with gold pocket', quantity: 1, unit_price: 35000 },
    { order_item_id: 2, order_id: 102, clothing_type: 'Shirt', description: 'White long-sleeve shirt, French cuffs', quantity: 2, unit_price: 25000 },
    { order_item_id: 3, order_id: 102, clothing_type: 'Trouser', description: 'Black classic trousers', quantity: 2, unit_price: 30000 },
    { order_item_id: 4, order_id: 108, clothing_type: 'Dress', description: 'Pleated silk evening dress', quantity: 1, unit_price: 45000 },
    { order_item_id: 5, order_id: 115, clothing_type: 'Senator Shirt', description: 'Sky blue linen senator shirt', quantity: 3, unit_price: 22000 },
    { order_item_id: 6, order_id: 105, clothing_type: 'Ankara Jumpsuit', description: 'Custom flared jumpsuit with pockets', quantity: 1, unit_price: 30000 }
  ],
  order_staff: [
    { order_id: 101, staff_id: 2, task: 'Sewing', assigned_at: '2026-09-05', status: 'Completed' },
    { order_id: 101, staff_id: 4, task: 'Finishing', assigned_at: '2026-09-07', status: 'Completed' },
    { order_id: 102, staff_id: 2, task: 'Sewing', assigned_at: '2026-09-10', status: 'In Progress', note: 'Stitching collar and buttonholes' },
    { order_id: 102, staff_id: 3, task: 'Cutting', assigned_at: '2026-09-10', status: 'Completed' },
    { order_id: 108, staff_id: 3, task: 'Cutting', assigned_at: '2026-09-12', status: 'In Progress' },
    { order_id: 108, staff_id: 2, task: 'Sewing', assigned_at: '2026-09-12', status: 'Pending' },
    { order_id: 115, staff_id: 4, task: 'Finishing', assigned_at: '2026-09-14', status: 'Pending' }
  ],
  payments: [
    { payment_id: 1, order_id: 101, amount: 35000, payment_date: '2026-09-05', payment_method: 'Bank Transfer', reference: 'TRX-101-FULL' },
    { payment_id: 2, order_id: 102, amount: 50000, payment_date: '2026-09-10', payment_method: 'Cash', reference: 'RCPT-102-DEP' },
    { payment_id: 3, order_id: 108, amount: 20000, payment_date: '2026-09-12', payment_method: 'Mobile Money', reference: 'MOMO-108-INIT' },
    { payment_id: 4, order_id: 115, amount: 45000, payment_date: '2026-09-14', payment_method: 'Cash', reference: 'RCPT-115-DEP' }
  ]
};

const STORAGE_KEY = 'tailormate_database_v3';
const USER_KEY = 'tailormate_current_user_v3';

export function getDatabase(): DatabaseSchema {
  if (typeof window === 'undefined') return DEFAULT_DATABASE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveDatabase(DEFAULT_DATABASE);
      return DEFAULT_DATABASE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading database, resetting to default:', err);
    return DEFAULT_DATABASE;
  }
}

export function saveDatabase(db: DatabaseSchema): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function resetDatabase(): DatabaseSchema {
  if (typeof window === 'undefined') return DEFAULT_DATABASE;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATABASE));
  return DEFAULT_DATABASE;
}

// Session & Authentication Helpers
export function getCurrentUser(): User {
  if (typeof window === 'undefined') return DEFAULT_DATABASE.users[0];
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      setCurrentUser(DEFAULT_DATABASE.users[0]);
      return DEFAULT_DATABASE.users[0];
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DATABASE.users[0];
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loginUser(identifier: string): User | null {
  const db = getDatabase();
  const cleanId = identifier.trim().toLowerCase();
  
  // Find by email, phone, or name prefix (e.g. "sally", "juspen")
  const user = db.users.find(u => 
    u.email.toLowerCase() === cleanId || 
    u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '') ||
    u.full_name.toLowerCase().includes(cleanId)
  );

  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function registerBusinessAccount(
  accountData: { fullName: string; phone: string; email: string },
  businessData: { name: string; phone: string; address: string; currency: string }
): { user: User; business: Business } {
  const db = getDatabase();

  const nextBizId = Math.max(...db.businesses.map(b => b.business_id), 0) + 1;
  const nextUserId = Math.max(...db.users.map(u => u.user_id), 0) + 1;
  const nextStaffId = Math.max(...db.staff.map(s => s.staff_id), 0) + 1;

  const newBusiness: Business = {
    business_id: nextBizId,
    name: businessData.name,
    phone: businessData.phone || accountData.phone,
    address: businessData.address,
    currency: businessData.currency || 'FCFA',
    created_at: db.systemDate
  };

  const newUser: User = {
    user_id: nextUserId,
    business_id: nextBizId,
    full_name: accountData.fullName,
    email: accountData.email,
    phone: accountData.phone,
    role: 'CHIEF_TAILOR',
    created_at: db.systemDate
  };

  const newStaff: Staff = {
    staff_id: nextStaffId,
    business_id: nextBizId,
    full_name: accountData.fullName,
    email: accountData.email,
    phone: accountData.phone,
    role: 'Chief Tailor / Business Owner'
  };

  const updatedDb: DatabaseSchema = {
    ...db,
    businesses: [...db.businesses, newBusiness],
    users: [...db.users, newUser],
    staff: [...db.staff, newStaff]
  };

  saveDatabase(updatedDb);
  setCurrentUser(newUser);

  return { user: newUser, business: newBusiness };
}

export function inviteStaffMember(staffData: {
  fullName: string;
  phone: string;
  email: string;
  role: string;
}): { staff: Staff; user: User } {
  const db = getDatabase();
  const currentUser = getCurrentUser();

  const nextStaffId = Math.max(...db.staff.map(s => s.staff_id), 0) + 1;
  const nextUserId = Math.max(...db.users.map(u => u.user_id), 0) + 1;

  const newStaff: Staff = {
    staff_id: nextStaffId,
    business_id: currentUser.business_id,
    full_name: staffData.fullName,
    phone: staffData.phone,
    email: staffData.email,
    role: staffData.role
  };

  const newUser: User = {
    user_id: nextUserId,
    business_id: currentUser.business_id,
    full_name: staffData.fullName,
    email: staffData.email,
    phone: staffData.phone,
    role: 'STAFF',
    created_at: db.systemDate
  };

  const updatedDb: DatabaseSchema = {
    ...db,
    staff: [...db.staff, newStaff],
    users: [...db.users, newUser]
  };

  saveDatabase(updatedDb);
  return { staff: newStaff, user: newUser };
}

export function updateStaffTask(
  orderId: number,
  staffId: number,
  status: TaskStatus,
  note?: string
): void {
  const db = getDatabase();
  const updatedAssignments = db.order_staff.map(os => {
    if (os.order_id === orderId && os.staff_id === staffId) {
      return { ...os, status, note: note || os.note };
    }
    return os;
  });

  const updatedDb = { ...db, order_staff: updatedAssignments };
  saveDatabase(updatedDb);
}

// Calculations
export function calculateFinancials(orderId: number, db: DatabaseSchema): {
  totalPrice: number;
  totalPaid: number;
  balanceRemaining: number;
  paymentStatus: 'Unpaid' | 'Partially Paid' | 'Fully Paid';
} {
  const items = db.order_items.filter(i => i.order_id === orderId);
  const totalPrice = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);

  const payments = db.payments.filter(p => p.order_id === orderId);
  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount), 0);

  const balanceRemaining = Math.max(0, totalPrice - totalPaid);

  let paymentStatus: 'Unpaid' | 'Partially Paid' | 'Fully Paid' = 'Unpaid';
  if (totalPaid >= totalPrice && totalPrice > 0) {
    paymentStatus = 'Fully Paid';
  } else if (totalPaid > 0) {
    paymentStatus = 'Partially Paid';
  }

  return { totalPrice, totalPaid, balanceRemaining, paymentStatus };
}

export function getDaysRemaining(dueDateStr: string, currentDateStr: string): number {
  const due = new Date(dueDateStr);
  const current = new Date(currentDateStr);
  const diffTime = due.getTime() - current.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDueAlerts(db: DatabaseSchema): DueAlertOrder[] {
  return db.orders
    .map(order => {
      const daysRemaining = getDaysRemaining(order.due_date, db.systemDate);
      const isUnfinished = ['Pending', 'In Progress'].includes(order.status);
      let alertLevel: string | null = null;

      if (isUnfinished) {
        if (daysRemaining < 0) {
          alertLevel = 'OVERDUE - Contact Customer Immediately';
        } else if (daysRemaining <= 1) {
          alertLevel = 'CRITICAL - Due within 24-48 Hours';
        } else if (daysRemaining <= 3) {
          alertLevel = 'Approaching Deadline';
        }
      }

      const customer = db.customers.find(c => c.customer_id === order.customer_id);

      return {
        ...order,
        customer,
        daysRemaining,
        alertLevel: alertLevel || ''
      };
    })
    .filter(o => o.alertLevel !== '')
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}

export function formatCurrency(amount: number): string {
  return Number(amount).toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' FCFA';
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
