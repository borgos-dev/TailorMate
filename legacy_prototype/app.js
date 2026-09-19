/**
 * Tailoring Order Management System - Front-End Logic
 * Relational simulation of MySQL database:
 * tables: customers, measurements, orders, order_items, staff, order_staff, payments
 */

// Initial Seed Data mirroring tailoring_management.sql
const DEFAULT_DATABASE = {
  systemDate: '2026-09-15',
  customers: [
    {
      customer_id: 1,
      full_name: 'John Doe',
      phone: '+234 801 234 5678',
      email: 'john.doe@example.com',
      address: '12 Victoria Island, Lagos'
    },
    {
      customer_id: 2,
      full_name: 'Sarah Mensah',
      phone: '+234 802 345 6789',
      email: 'sarah.m@example.com',
      address: '45 Allen Avenue, Ikeja, Lagos'
    },
    {
      customer_id: 3,
      full_name: 'Michael Adeleke',
      phone: '+234 803 456 7890',
      email: 'michael.a@example.com',
      address: '8 Marina Street, Lagos Island'
    },
    {
      customer_id: 4,
      full_name: 'Amara Okafor',
      phone: '+234 804 567 8901',
      email: 'amara.okafor@example.com',
      address: '21 Admiralty Way, Lekki Phase 1'
    }
  ],
  measurements: [
    {
      measurement_id: 1,
      customer_id: 1,
      measured_at: '2026-09-01',
      neck: 16.5,
      chest: 40.0,
      waist: 34.0,
      hip: 39.0,
      shoulder: 18.5,
      sleeve_length: 25.0,
      shirt_length: 31.0,
      trouser_length: 41.0,
      inseam: 31.5,
      notes: 'Prefers slim fit senator style'
    },
    {
      measurement_id: 2,
      customer_id: 2,
      measured_at: '2026-09-03',
      neck: 14.0,
      chest: 36.0,
      waist: 29.0,
      hip: 40.5,
      shoulder: 15.5,
      sleeve_length: 22.0,
      shirt_length: 26.0,
      trouser_length: 40.0,
      inseam: 30.0,
      notes: 'Floor-length dress adjustment'
    },
    {
      measurement_id: 3,
      customer_id: 3,
      measured_at: '2026-09-05',
      neck: 17.0,
      chest: 42.5,
      waist: 36.0,
      hip: 42.0,
      shoulder: 19.0,
      sleeve_length: 25.5,
      shirt_length: 32.0,
      trouser_length: 42.5,
      inseam: 32.0,
      notes: 'Regular fit traditional agbada'
    },
    {
      measurement_id: 4,
      customer_id: 4,
      measured_at: '2026-09-10',
      neck: 14.5,
      chest: 37.0,
      waist: 30.0,
      hip: 41.0,
      shoulder: 16.0,
      sleeve_length: 23.0,
      shirt_length: 27.5,
      trouser_length: 39.5,
      inseam: 29.5,
      notes: 'Fitted jumpsuit'
    }
  ],
  staff: [
    {
      staff_id: 1,
      full_name: 'Master David Obi',
      phone: '+234 809 111 2233',
      role: 'Chief Tailor / Pattern Cutter'
    },
    {
      staff_id: 2,
      full_name: 'Ibrahim Musa',
      phone: '+234 809 222 3344',
      role: 'Apparel Assembly / Stitching'
    },
    {
      staff_id: 3,
      full_name: 'Blessing Eze',
      phone: '+234 809 333 4455',
      role: 'Finishing & Embroidery Specialist'
    }
  ],
  orders: [
    {
      order_id: 101,
      customer_id: 1,
      order_date: '2026-09-05',
      due_date: '2026-09-18',
      status: 'Ready',
      notes: 'White senator suit with front embroidery. Ready for collection.'
    },
    {
      order_id: 102,
      customer_id: 1,
      order_date: '2026-09-10',
      due_date: '2026-09-16',
      status: 'In Progress',
      notes: 'URGENT: Due tomorrow! Customer must be contacted before close of business.'
    },
    {
      order_id: 103,
      customer_id: 2,
      order_date: '2026-09-08',
      due_date: '2026-09-22',
      status: 'In Progress',
      notes: 'Navy blue corporate dress and jacket.'
    },
    {
      order_id: 104,
      customer_id: 3,
      order_date: '2026-09-12',
      due_date: '2026-09-25',
      status: 'Pending',
      notes: 'Agbada set (Fabric supplied by client). Awaiting final cutting.'
    },
    {
      order_id: 105,
      customer_id: 4,
      order_date: '2026-09-02',
      due_date: '2026-09-12',
      status: 'Collected',
      notes: 'Completed and collected on time with full payment.'
    }
  ],
  order_items: [
    { order_item_id: 1, order_id: 101, clothing_type: 'Senator Suit', description: '2-piece white senator with gold chest pocket detail', quantity: 1, unit_price: 28000 },
    { order_item_id: 2, order_id: 102, clothing_type: 'Casual Kaftan', description: 'Short-sleeve sky blue linen kaftan', quantity: 2, unit_price: 18000 },
    { order_item_id: 3, order_id: 103, clothing_type: 'Corporate Dress', description: 'Pleated evening dress with matching belt', quantity: 1, unit_price: 35000 },
    { order_item_id: 4, order_id: 103, clothing_type: 'Formal Blazer', description: 'Fitted dark blue blazer jacket', quantity: 1, unit_price: 22000 },
    { order_item_id: 5, order_id: 104, clothing_type: '3-Piece Agbada', description: 'Royal blue damask 3-piece agbada set', quantity: 1, unit_price: 65000 },
    { order_item_id: 6, order_id: 105, clothing_type: 'Ankara Jumpsuit', description: 'Custom flared jumpsuit with side pockets', quantity: 1, unit_price: 25000 }
  ],
  order_staff: [
    { order_id: 101, staff_id: 1, assigned_at: '2026-09-05' },
    { order_id: 101, staff_id: 3, assigned_at: '2026-09-07' },
    { order_id: 102, staff_id: 1, assigned_at: '2026-09-10' },
    { order_id: 102, staff_id: 2, assigned_at: '2026-09-11' },
    { order_id: 103, staff_id: 2, assigned_at: '2026-09-08' },
    { order_id: 104, staff_id: 1, assigned_at: '2026-09-12' },
    { order_id: 105, staff_id: 1, assigned_at: '2026-09-02' },
    { order_id: 105, staff_id: 2, assigned_at: '2026-09-03' }
  ],
  payments: [
    { payment_id: 1, order_id: 101, amount: 28000.00, payment_date: '2026-09-05', payment_method: 'Bank Transfer', reference: 'TRX-10101-FULL' },
    { payment_id: 2, order_id: 102, amount: 20000.00, payment_date: '2026-09-10', payment_method: 'Cash', reference: 'RCPT-0045-DEPOSIT' },
    { payment_id: 3, order_id: 103, amount: 30000.00, payment_date: '2026-09-08', payment_method: 'POS / Card', reference: 'POS-8921-PARTIAL' },
    { payment_id: 4, order_id: 104, amount: 40000.00, payment_date: '2026-09-12', payment_method: 'Bank Transfer', reference: 'TRX-9942-DEPOSIT' },
    { payment_id: 5, order_id: 105, amount: 25000.00, payment_date: '2026-09-02', payment_method: 'Cash', reference: 'RCPT-0038-FULL' }
  ]
};

// Database State Store
class DatabaseStore {
  constructor() {
    this.STORAGE_KEY = 'tailoring_management_db_v1';
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read from localStorage, using default seed:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATABASE));
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    this.save();
  }

  // Helper Relations
  getCustomer(customerId) {
    return this.data.customers.find(c => c.customer_id === Number(customerId));
  }

  getMeasurementForCustomer(customerId) {
    return this.data.measurements.find(m => m.customer_id === Number(customerId));
  }

  getOrderItems(orderId) {
    return this.data.order_items.filter(i => i.order_id === Number(orderId));
  }

  getOrderPayments(orderId) {
    return this.data.payments.filter(p => p.order_id === Number(orderId));
  }

  getOrderStaff(orderId) {
    const assignments = this.data.order_staff.filter(os => os.order_id === Number(orderId));
    return assignments.map(a => this.data.staff.find(s => s.staff_id === a.staff_id)).filter(Boolean);
  }

  calculateOrderFinancials(orderId) {
    const items = this.getOrderItems(orderId);
    const totalBill = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const payments = this.getOrderPayments(orderId);
    const amountPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const balance = Math.max(0, totalBill - amountPaid);

    let paymentStatus = 'Unpaid';
    if (amountPaid >= totalBill && totalBill > 0) {
      paymentStatus = 'Fully Paid';
    } else if (amountPaid > 0) {
      paymentStatus = 'Partially Paid';
    }

    return { totalBill, amountPaid, balance, paymentStatus };
  }

  // Section 7 Due-Date Reminder Logic
  getDaysRemaining(dueDateStr) {
    const refDate = new Date(this.data.systemDate);
    const dueDate = new Date(dueDateStr);
    const diffTime = dueDate.getTime() - refDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDueAlerts() {
    return this.data.orders.map(order => {
      const daysRemaining = this.getDaysRemaining(order.due_date);
      const isUnfinished = ['Pending', 'In Progress'].includes(order.status);
      
      let alertLevel = null;
      if (isUnfinished) {
        if (daysRemaining < 0) {
          alertLevel = 'OVERDUE - Contact Customer Immediately';
        } else if (daysRemaining <= 1) {
          alertLevel = 'CRITICAL - Due within 24-48 Hours';
        } else if (daysRemaining <= 3) {
          alertLevel = 'Approaching Deadline';
        }
      }

      return {
        ...order,
        customer: this.getCustomer(order.customer_id),
        daysRemaining,
        alertLevel
      };
    }).filter(item => item.alertLevel !== null)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
  }
}

// Global Application Instance
const db = new DatabaseStore();

// Utility Formatters
function formatCurrency(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// UI Controllers & Renderers
const UI = {
  currentTab: 'orders',

  init() {
    this.bindEvents();
    this.renderAll();
    this.populateDropdowns();
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.app-sidebar .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = item.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });

    document.getElementById('btn-quick-defense').addEventListener('click', () => {
      this.switchTab('defense');
    });

    // Reset Demo Data
    document.getElementById('btn-reset-demo').addEventListener('click', () => {
      if (confirm('Reset all customer, order, and payment records to the original SQL sample data?')) {
        db.reset();
        this.renderAll();
        this.populateDropdowns();
        alert('Database state successfully reset to initial SQL sample data!');
      }
    });

    // Filters for Orders
    document.getElementById('filter-orders-search').addEventListener('input', () => this.renderOrdersTable());
    document.getElementById('filter-orders-status').addEventListener('change', () => this.renderOrdersTable());
    document.getElementById('filter-orders-payment').addEventListener('change', () => this.renderOrdersTable());

    // Filter for Customers
    document.getElementById('filter-customers-search').addEventListener('input', () => this.renderCustomersTable());

    // Open Modals
    document.getElementById('btn-open-new-order').addEventListener('click', () => {
      this.openModal('modal-new-order');
    });

    // Close Modals via Close buttons or overlays
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        this.closeModal(targetId);
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    // Form Submissions
    document.getElementById('form-new-order').addEventListener('submit', (e) => this.handleCreateOrder(e));
    document.getElementById('form-record-payment').addEventListener('submit', (e) => this.handleRecordPayment(e));
  },

  switchTab(tabId) {
    this.currentTab = tabId;

    // Sidebar active pill
    document.querySelectorAll('.app-sidebar .nav-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
    });

    // Pane displays
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.style.display = pane.id === `pane-${tabId}` ? 'block' : 'none';
    });

    // Header Title Update
    const titles = {
      orders: { title: 'Order Management & Due-Date Monitor', desc: 'Monitor upcoming deadlines, tailor assignments, and payment statuses' },
      customers: { title: 'Customer Registry & Body Measurements', desc: 'Normalized 1NF customer contacts with 1:N anatomical measurement histories' },
      staff: { title: 'Staff Tailors & Order Assignments', desc: 'Many-to-Many assignments resolving cutting, assembly, and embroidery duties' },
      payments: { title: 'Payment Transactions & Ledger', desc: 'Financial records decoupled from physical garment progress' },
      defense: { title: 'Academic Defense & Presentation Guide', desc: 'Complete 1NF, 2NF, 3NF explanations, SQL definitions, and examiner defense answers' }
    };

    if (titles[tabId]) {
      document.getElementById('current-view-title').textContent = titles[tabId].title;
      document.getElementById('current-view-desc').textContent = titles[tabId].desc;
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  renderAll() {
    this.renderAlertBanner();
    this.renderKPIs();
    this.renderOrdersTable();
    this.renderCustomersTable();
    this.renderStaffTable();
    this.renderPaymentsTable();
  },

  // =========================================================================
  // Section 7: Render Due-Date Reminder Banner
  // =========================================================================
  renderAlertBanner() {
    const alerts = db.getDueAlerts();
    const banner = document.getElementById('deadline-banner');
    const container = document.getElementById('alert-items-container');
    const badge = document.getElementById('alert-summary-badge');
    const navBadge = document.getElementById('badge-orders-due');

    if (alerts.length === 0) {
      banner.style.display = 'none';
      navBadge.style.display = 'none';
      return;
    }

    banner.style.display = 'block';
    navBadge.style.display = 'inline-block';
    navBadge.textContent = `${alerts.length} Alert${alerts.length > 1 ? 's' : ''}`;
    badge.textContent = `${alerts.length} Order${alerts.length > 1 ? 's' : ''} Need Urgent Attention`;

    container.innerHTML = alerts.map(order => {
      const financials = db.calculateOrderFinancials(order.order_id);
      const isCritical = order.daysRemaining <= 1;

      return `
        <div class="alert-order-card">
          <div class="alert-card-top">
            <div>
              <span class="alert-order-id">Order #${order.order_id}</span>
              <div class="alert-customer-info">
                <strong>${order.customer?.full_name || 'Customer'}</strong> (${order.customer?.phone})
              </div>
            </div>
            <span class="urgency-badge ${isCritical ? 'urgency-critical' : 'urgency-warning'}">
              ${order.alertLevel}
            </span>
          </div>

          <div class="alert-detail-line">
            <span>Agreed Due Date: <strong>${formatDate(order.due_date)}</strong></span>
            <span style="color: #c2410c; font-weight: 700;">
              ${order.daysRemaining === 0 ? 'Due Today!' : order.daysRemaining === 1 ? 'Due Tomorrow (24h)' : `Due in ${order.daysRemaining} days`}
            </span>
          </div>

          <div class="alert-detail-line">
            <span>Work Status: <strong>${order.status}</strong></span>
            <span>Balance Remaining: <strong>${formatCurrency(financials.balance)}</strong></span>
          </div>

          <div class="alert-card-actions">
            <button type="button" class="btn btn-sm btn-gold" onclick="UI.openWhatsAppModal(${order.order_id})">
              <span>📱 Send Early WhatsApp Notice</span>
            </button>
            <button type="button" class="btn btn-sm btn-outline" onclick="UI.showOrderDetails(${order.order_id})">
              <span>View / Update Order</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  // =========================================================================
  // Render KPI Metrics
  // =========================================================================
  renderKPIs() {
    const activeOrders = db.data.orders.filter(o => ['Pending', 'In Progress', 'Ready'].includes(o.status)).length;
    const dueSoon = db.getDueAlerts().filter(o => o.daysRemaining <= 2).length;
    const readyOrders = db.data.orders.filter(o => o.status === 'Ready').length;

    let totalBalance = 0;
    db.data.orders.forEach(o => {
      const f = db.calculateOrderFinancials(o.order_id);
      totalBalance += f.balance;
    });

    document.getElementById('kpi-active-orders').textContent = activeOrders;
    document.getElementById('kpi-due-soon').textContent = dueSoon;
    document.getElementById('kpi-ready-orders').textContent = readyOrders;
    document.getElementById('kpi-unpaid-balance').textContent = formatCurrency(totalBalance);
  },

  // =========================================================================
  // Render Orders Table
  // =========================================================================
  renderOrdersTable() {
    const tbody = document.getElementById('orders-tbody');
    const searchVal = document.getElementById('filter-orders-search').value.toLowerCase();
    const statusVal = document.getElementById('filter-orders-status').value;
    const paymentVal = document.getElementById('filter-orders-payment').value;

    const filtered = db.data.orders.filter(order => {
      const customer = db.getCustomer(order.customer_id);
      const financials = db.calculateOrderFinancials(order.order_id);

      // Search match
      const matchSearch = String(order.order_id).includes(searchVal) ||
        (customer && customer.full_name.toLowerCase().includes(searchVal)) ||
        (customer && customer.phone.includes(searchVal));

      // Status match
      const matchStatus = statusVal === 'ALL' || order.status === statusVal;

      // Payment match
      const matchPayment = paymentVal === 'ALL' || financials.paymentStatus === paymentVal;

      return matchSearch && matchStatus && matchPayment;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 30px;">No matching orders found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(order => {
      const customer = db.getCustomer(order.customer_id);
      const financials = db.calculateOrderFinancials(order.order_id);
      const daysRemaining = db.getDaysRemaining(order.due_date);

      let statusPillClass = 'status-pending';
      if (order.status === 'In Progress') statusPillClass = 'status-in-progress';
      if (order.status === 'Ready') statusPillClass = 'status-ready';
      if (order.status === 'Collected') statusPillClass = 'status-collected';
      if (order.status === 'Cancelled') statusPillClass = 'status-cancelled';

      let payPillClass = 'payment-unpaid';
      if (financials.paymentStatus === 'Fully Paid') payPillClass = 'payment-fully-paid';
      if (financials.paymentStatus === 'Partially Paid') payPillClass = 'payment-partially-paid';

      // Due date urgency display
      let timelineBadge = '';
      if (order.status !== 'Ready' && order.status !== 'Collected') {
        if (daysRemaining <= 1) {
          timelineBadge = `<span style="display:block; font-size: 11px; color: #dc2626; font-weight: 700;">⚠️ Due tomorrow!</span>`;
        } else if (daysRemaining <= 3) {
          timelineBadge = `<span style="display:block; font-size: 11px; color: #ea580c; font-weight: 600;">Due in ${daysRemaining} days</span>`;
        }
      }

      return `
        <tr>
          <td><strong style="font-family: 'JetBrains Mono', monospace; color: var(--primary);">#${order.order_id}</strong></td>
          <td>
            <div style="font-weight: 600;">${customer ? customer.full_name : 'Unknown'}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${customer ? customer.phone : ''}</div>
          </td>
          <td>${formatDate(order.order_date)}</td>
          <td>
            <div>${formatDate(order.due_date)}</div>
            ${timelineBadge}
          </td>
          <td>
            <span class="status-pill ${statusPillClass}">
              <span class="status-dot"></span>
              ${order.status}
            </span>
          </td>
          <td>
            <span class="payment-pill ${payPillClass}">
              ${financials.paymentStatus}
            </span>
          </td>
          <td><strong>${formatCurrency(financials.totalBill)}</strong></td>
          <td style="color: ${financials.balance > 0 ? '#b45309' : '#16a34a'}; font-weight: 600;">
            ${formatCurrency(financials.balance)}
          </td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn btn-outline btn-sm" onclick="UI.showOrderDetails(${order.order_id})">
                Details
              </button>
              <button type="button" class="btn btn-sm btn-gold" onclick="UI.openWhatsAppModal(${order.order_id})" title="Preview WhatsApp notification">
                💬
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  // =========================================================================
  // Render Customers Table
  // =========================================================================
  renderCustomersTable() {
    const tbody = document.getElementById('customers-tbody');
    const searchVal = document.getElementById('filter-customers-search').value.toLowerCase();

    const filtered = db.data.customers.filter(c => {
      return c.full_name.toLowerCase().includes(searchVal) ||
             c.phone.includes(searchVal) ||
             (c.email && c.email.toLowerCase().includes(searchVal)) ||
             (c.address && c.address.toLowerCase().includes(searchVal));
    });

    tbody.innerHTML = filtered.map(c => {
      const measurement = db.getMeasurementForCustomer(c.customer_id);
      const measuredText = measurement ? formatDate(measurement.measured_at) : 'No measurements on file';

      return `
        <tr>
          <td><strong style="font-family: 'JetBrains Mono'; color: var(--primary);">#${c.customer_id}</strong></td>
          <td><strong style="font-size: 14px;">${c.full_name}</strong></td>
          <td>${c.phone}</td>
          <td>${c.email || '—'}</td>
          <td>${c.address || '—'}</td>
          <td>
            <span style="font-size: 12px; color: var(--text-secondary);">${measuredText}</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline btn-sm" onclick="UI.showMeasurements(${c.customer_id})">
              📏 View Measurements
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // =========================================================================
  // Render Staff Table (M:N Assignment Roster)
  // =========================================================================
  renderStaffTable() {
    const tbody = document.getElementById('table-staff').querySelector('tbody');
    tbody.innerHTML = db.data.staff.map(s => {
      // Find orders assigned to this staff
      const assignedOrderIds = db.data.order_staff
        .filter(os => os.staff_id === s.staff_id)
        .map(os => os.order_id);

      const activeAssigned = db.data.orders.filter(o => assignedOrderIds.includes(o.order_id) && o.status !== 'Collected');

      const orderBadges = activeAssigned.map(o => `
        <span style="display: inline-block; padding: 2px 7px; background: #e2e8f0; border-radius: 4px; font-size: 11px; margin-right: 4px; font-family: 'JetBrains Mono';">
          Order #${o.order_id} (${o.status})
        </span>
      `).join('') || '<span style="color: var(--text-muted); font-size: 12px;">No active orders</span>';

      return `
        <tr>
          <td><strong style="font-family: 'JetBrains Mono';">STF-${s.staff_id}</strong></td>
          <td><strong>${s.full_name}</strong></td>
          <td><span style="color: #1e40af; font-weight: 500;">${s.role}</span></td>
          <td>${s.phone}</td>
          <td>${orderBadges}</td>
        </tr>
      `;
    }).join('');
  },

  // =========================================================================
  // Render Payments Table
  // =========================================================================
  renderPaymentsTable() {
    const tbody = document.getElementById('payments-tbody');
    tbody.innerHTML = db.data.payments.map(p => {
      const order = db.data.orders.find(o => o.order_id === p.order_id);
      const customer = order ? db.getCustomer(order.customer_id) : null;

      return `
        <tr>
          <td><strong style="font-family: 'JetBrains Mono';">PAY-${p.payment_id}</strong></td>
          <td><strong>#${p.order_id}</strong></td>
          <td>${customer ? customer.full_name : 'Unknown'}</td>
          <td>${formatDate(p.payment_date)}</td>
          <td><strong style="color: #15803d;">${formatCurrency(p.amount)}</strong></td>
          <td>${p.payment_method}</td>
          <td><span style="font-family: 'JetBrains Mono'; font-size: 11px; color: var(--text-muted);">${p.reference || '—'}</span></td>
        </tr>
      `;
    }).join('');
  },

  // =========================================================================
  // Populate Form Dropdowns
  // =========================================================================
  populateDropdowns() {
    const custSelect = document.getElementById('order-customer-select');
    custSelect.innerHTML = db.data.customers.map(c => `
      <option value="${c.customer_id}">${c.full_name} (${c.phone})</option>
    `).join('');

    const staffSelect = document.getElementById('order-assigned-staff');
    staffSelect.innerHTML = db.data.staff.map(s => `
      <option value="${s.staff_id}">${s.full_name} — ${s.role}</option>
    `).join('');
  },

  // =========================================================================
  // Modal: Show Order Details & Allow Live Edits
  // =========================================================================
  showOrderDetails(orderId) {
    const order = db.data.orders.find(o => o.order_id === Number(orderId));
    if (!order) return;

    const customer = db.getCustomer(order.customer_id);
    const items = db.getOrderItems(order.order_id);
    const staffAssigned = db.getOrderStaff(order.order_id);
    const payments = db.getOrderPayments(order.order_id);
    const financials = db.calculateOrderFinancials(order.order_id);

    document.getElementById('modal-order-title').textContent = `Order #${order.order_id} Details`;

    const body = document.getElementById('modal-order-body');
    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid var(--border-light); margin-bottom: 16px;">
        <div>
          <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">${customer?.full_name || 'Customer'}</h4>
          <p style="font-size: 12px; color: var(--text-secondary);">${customer?.phone} • ${customer?.address}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 11px; color: var(--text-muted); display: block;">Due Date:</span>
          <strong style="font-size: 14px; color: #ea580c;">${formatDate(order.due_date)}</strong>
        </div>
      </div>

      <!-- Quick Status Switcher -->
      <div style="background: #f8fafc; padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <label style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Update Work Status:</label>
          <div style="font-size: 11px; color: var(--text-muted);">Changes will immediately re-evaluate due date alert logic</div>
        </div>
        <select class="form-control" style="width: 170px;" onchange="UI.updateOrderStatus(${order.order_id}, this.value)">
          <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${order.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Ready" ${order.status === 'Ready' ? 'selected' : ''}>Ready</option>
          <option value="Collected" ${order.status === 'Collected' ? 'selected' : ''}>Collected</option>
          <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </div>

      <!-- Clothing Items (order_items) -->
      <h5 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Garment Items (order_items table)</h5>
      <div style="background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead style="background: #f8fafc; border-bottom: 1px solid var(--border-light); font-size: 11px; color: #64748b;">
            <tr>
              <th style="padding: 8px 12px; text-align: left;">Clothing Type</th>
              <th style="padding: 8px 12px; text-align: left;">Description</th>
              <th style="padding: 8px 12px; text-align: center;">Qty</th>
              <th style="padding: 8px 12px; text-align: right;">Unit Price</th>
              <th style="padding: 8px 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(i => `
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 8px 12px; font-weight: 600;">${i.clothing_type}</td>
                <td style="padding: 8px 12px; color: var(--text-secondary); font-size: 12px;">${i.description || '—'}</td>
                <td style="padding: 8px 12px; text-align: center;">${i.quantity}</td>
                <td style="padding: 8px 12px; text-align: right;">${formatCurrency(i.unit_price)}</td>
                <td style="padding: 8px 12px; text-align: right; font-weight: 600;">${formatCurrency(i.quantity * i.unit_price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Assigned Staff (order_staff M:N) -->
      <h5 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Assigned Tailors (order_staff junction table)</h5>
      <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
        ${staffAssigned.map(s => `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 6px 12px; font-size: 12px;">
            <strong>${s.full_name}</strong> <span style="color: #1d4ed8;">(${s.role})</span>
          </div>
        `).join('') || '<p style="font-size: 12px; color: var(--text-muted);">No tailors assigned.</p>'}
      </div>

      <!-- Financial Status Summary (Section 6) -->
      <div style="background: #f8fafc; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
          <span>Total Garment Bill:</span>
          <strong>${formatCurrency(financials.totalBill)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; color: #16a34a;">
          <span>Amount Paid:</span>
          <strong>${formatCurrency(financials.amountPaid)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; border-top: 1px dashed var(--border-light); padding-top: 6px;">
          <span>Balance Remaining:</span>
          <strong style="color: ${financials.balance > 0 ? '#ea580c' : '#16a34a'};">${formatCurrency(financials.balance)}</strong>
        </div>
      </div>

      <!-- Payment History & Quick Add Button -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h5 style="font-size: 13px; font-weight: 700;">Recorded Payments (${payments.length})</h5>
        ${financials.balance > 0 ? `
          <button type="button" class="btn btn-sm btn-gold" onclick="UI.openRecordPayment(${order.order_id})">
            ➕ Record Payment
          </button>
        ` : '<span style="font-size: 12px; color: #16a34a; font-weight: 600;">✓ Fully Paid</span>'}
      </div>

      <div style="font-size: 12px; color: var(--text-secondary);">
        ${payments.map(p => `
          <div style="padding: 6px 10px; background: #fff; border: 1px solid var(--border-light); border-radius: 6px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>${formatDate(p.payment_date)} • ${p.payment_method} (${p.reference || 'No ref'})</span>
            <strong style="color: #16a34a;">${formatCurrency(p.amount)}</strong>
          </div>
        `).join('') || '<p style="color: var(--text-muted);">No payments recorded yet.</p>'}
      </div>
    `;

    this.openModal('modal-order-details');
  },

  // Update order status live
  updateOrderStatus(orderId, newStatus) {
    const order = db.data.orders.find(o => o.order_id === Number(orderId));
    if (order) {
      order.status = newStatus;
      db.save();
      this.renderAll();
      this.showOrderDetails(orderId);
    }
  },

  // =========================================================================
  // Modal: Customer Measurements Viewer
  // =========================================================================
  showMeasurements(customerId) {
    const customer = db.getCustomer(customerId);
    const m = db.getMeasurementForCustomer(customerId);

    document.getElementById('modal-measurements-customer-name').textContent = `${customer.full_name} — Measurement Profile`;

    const body = document.getElementById('modal-measurements-body');
    if (!m) {
      body.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No measurements recorded for this customer yet.</p>`;
    } else {
      body.innerHTML = `
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
          Recorded Date: <strong>${formatDate(m.measured_at)}</strong>
        </div>
        <div class="measurements-grid">
          <div class="measure-box"><span>Neck</span><strong>${m.neck ? m.neck + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Chest / Bust</span><strong>${m.chest ? m.chest + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Waist</span><strong>${m.waist ? m.waist + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Hip</span><strong>${m.hip ? m.hip + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Shoulder</span><strong>${m.shoulder ? m.shoulder + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Sleeve</span><strong>${m.sleeve_length ? m.sleeve_length + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Shirt Length</span><strong>${m.shirt_length ? m.shirt_length + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Trouser Length</span><strong>${m.trouser_length ? m.trouser_length + '"' : '—'}</strong></div>
          <div class="measure-box"><span>Inseam</span><strong>${m.inseam ? m.inseam + '"' : '—'}</strong></div>
        </div>
        ${m.notes ? `
          <div style="margin-top: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; color: var(--text-secondary);">
            <strong>Tailor's Fit Notes:</strong> ${m.notes}
          </div>
        ` : ''}
      `;
    }

    this.openModal('modal-measurements');
  },

  // =========================================================================
  // Modal: Record Payment
  // =========================================================================
  openRecordPayment(orderId) {
    const order = db.data.orders.find(o => o.order_id === Number(orderId));
    if (!order) return;

    const financials = db.calculateOrderFinancials(orderId);
    document.getElementById('payment-order-id').value = order.order_id;
    document.getElementById('payment-display-order').value = `Order #${order.order_id} (Remaining Balance: ${formatCurrency(financials.balance)})`;
    document.getElementById('payment-amount').value = financials.balance;
    document.getElementById('payment-amount').max = financials.balance;
    document.getElementById('payment-reference').value = `TRX-${order.order_id}-${Math.floor(1000 + Math.random() * 9000)}`;

    this.openModal('modal-add-payment');
  },

  handleRecordPayment(e) {
    e.preventDefault();
    const orderId = Number(document.getElementById('payment-order-id').value);
    const amount = Number(document.getElementById('payment-amount').value);
    const method = document.getElementById('payment-method').value;
    const ref = document.getElementById('payment-reference').value;

    const newPayment = {
      payment_id: db.data.payments.length ? Math.max(...db.data.payments.map(p => p.payment_id)) + 1 : 1,
      order_id: orderId,
      amount: amount,
      payment_date: db.data.systemDate,
      payment_method: method,
      reference: ref
    };

    db.data.payments.push(newPayment);
    db.save();

    this.closeModal('modal-add-payment');
    this.renderAll();
    this.showOrderDetails(orderId);
  },

  // =========================================================================
  // Modal: Create New Order
  // =========================================================================
  handleCreateOrder(e) {
    e.preventDefault();

    const customerId = Number(document.getElementById('order-customer-select').value);
    const dueDate = document.getElementById('order-due-date').value;
    const clothingType = document.getElementById('order-clothing-type').value;
    const unitPrice = Number(document.getElementById('order-unit-price').value);
    const desc = document.getElementById('order-garment-desc').value;
    const staffId = Number(document.getElementById('order-assigned-staff').value);
    const initialDeposit = Number(document.getElementById('order-initial-deposit').value) || 0;
    const notes = document.getElementById('order-notes').value;

    const newOrderId = db.data.orders.length ? Math.max(...db.data.orders.map(o => o.order_id)) + 1 : 101;

    // 1. Insert into orders table
    const newOrder = {
      order_id: newOrderId,
      customer_id: customerId,
      order_date: db.data.systemDate,
      due_date: dueDate,
      status: 'Pending',
      notes: notes
    };
    db.data.orders.push(newOrder);

    // 2. Insert into order_items table (1NF / 2NF)
    const newItemId = db.data.order_items.length ? Math.max(...db.data.order_items.map(i => i.order_item_id)) + 1 : 1;
    db.data.order_items.push({
      order_item_id: newItemId,
      order_id: newOrderId,
      clothing_type: clothingType,
      description: desc,
      quantity: 1,
      unit_price: unitPrice
    });

    // 3. Insert into order_staff table (M:N)
    if (staffId) {
      db.data.order_staff.push({
        order_id: newOrderId,
        staff_id: staffId,
        assigned_at: db.data.systemDate
      });
    }

    // 4. Insert into payments table if deposit provided
    if (initialDeposit > 0) {
      const newPayId = db.data.payments.length ? Math.max(...db.data.payments.map(p => p.payment_id)) + 1 : 1;
      db.data.payments.push({
        payment_id: newPayId,
        order_id: newOrderId,
        amount: initialDeposit,
        payment_date: db.data.systemDate,
        payment_method: 'Cash',
        reference: `DEPOSIT-${newOrderId}`
      });
    }

    db.save();
    document.getElementById('form-new-order').reset();
    this.closeModal('modal-new-order');
    this.renderAll();
    alert(`Order #${newOrderId} successfully created and linked!`);
  },

  // =========================================================================
  // Modal: WhatsApp Simulator (Proposal Section 8 & Presentation Flow Item 10)
  // =========================================================================
  openWhatsAppModal(orderId) {
    const order = db.data.orders.find(o => o.order_id === Number(orderId));
    if (!order) return;

    const customer = db.getCustomer(order.customer_id);
    const items = db.getOrderItems(order.order_id);
    const financials = db.calculateOrderFinancials(order.order_id);
    const daysRemaining = db.getDaysRemaining(order.due_date);

    document.getElementById('wa-customer-name').textContent = customer.full_name;
    document.getElementById('wa-customer-phone').textContent = customer.phone;

    let messageText = '';
    let incomingText = '';

    if (order.status === 'Ready') {
      incomingText = `Hello Master Tailor, please is my order #${order.order_id} ready?`;
      messageText = `Dear ${customer.full_name}, good day! ✨ Great news: your tailoring order #${order.order_id} (${items.map(i => i.clothing_type).join(', ')}) is now COMPLETE and ready for collection at our atelier. Outstanding balance: ${formatCurrency(financials.balance)}. We look forward to seeing you!`;
    } else if (order.status === 'In Progress' && daysRemaining <= 1) {
      incomingText = `Good day, checking in on my order #${order.order_id} scheduled for collection tomorrow.`;
      messageText = `Dear ${customer.full_name}, greetings from Sartorial Atelier. Regarding your order #${order.order_id} (${items.map(i => i.clothing_type).join(', ')}): our senior tailor is currently applying the final hand-stitched detailing. To guarantee our highest standard, could we kindly agree on collection for ${formatDate(new Date(Date.now() + 2 * 86400000))}? Thank you for your trust and understanding!`;
    } else {
      incomingText = `Hello tailor, just checking order status for #${order.order_id}.`;
      messageText = `Hello ${customer.full_name}, your order #${order.order_id} is progressing smoothly. Work Status: ${order.status}. Collection date: ${formatDate(order.due_date)}. We will keep you updated!`;
    }

    document.getElementById('wa-incoming-text').innerHTML = `
      ${incomingText}
      <div class="whatsapp-timestamp">10:14 AM</div>
    `;

    document.getElementById('wa-bubble-message').innerHTML = `
      ${messageText}
      <div class="whatsapp-timestamp">10:15 AM ✓✓</div>
    `;

    // WhatsApp Web Direct URL generator
    const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    document.getElementById('wa-open-link').href = waUrl;

    this.openModal('modal-whatsapp');
  }
};

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
