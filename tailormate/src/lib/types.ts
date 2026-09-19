export type UserRole = 'CHIEF_TAILOR' | 'STAFF';

export interface Business {
  business_id: number;
  name: string;
  phone: string;
  address: string;
  currency: string;
  created_at: string;
}

export interface User {
  user_id: number;
  business_id: number;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export interface Customer {
  customer_id: number;
  business_id?: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  created_at?: string;
}

export interface Measurement {
  measurement_id: number;
  customer_id: number;
  measured_at: string;
  neck?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  shoulder?: number;
  sleeve_length?: number;
  shirt_length?: number;
  trouser_length?: number;
  inseam?: number;
  notes?: string;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Ready' | 'Collected' | 'Cancelled';
export type PaymentStatus = 'Unpaid' | 'Partially Paid' | 'Fully Paid';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Blocked';

export interface Order {
  order_id: number;
  business_id?: number;
  customer_id: number;
  order_date: string;
  due_date: string;
  status: OrderStatus;
  notes?: string;
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  clothing_type: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Staff {
  staff_id: number;
  business_id?: number;
  full_name: string;
  phone: string;
  email?: string;
  role: string;
}

export interface OrderStaff {
  order_id: number;
  staff_id: number;
  task: string;
  assigned_at: string;
  status: TaskStatus;
  note?: string;
}

export interface Payment {
  payment_id: number;
  order_id: number;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference: string;
}

export interface OrderFinancials {
  totalBill: number;
  amountPaid: number;
  balance: number;
  paymentStatus: PaymentStatus;
}

export interface DueAlertOrder extends Order {
  customer?: Customer;
  daysRemaining: number;
  alertLevel: string;
}
