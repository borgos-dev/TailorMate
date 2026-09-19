-- =============================================================================
-- TAILORING ORDER MANAGEMENT SYSTEM
-- Database Definition, Sample Data & Key Queries
-- Compatible with MySQL 8.0+ / MySQL Workbench
-- =============================================================================

-- 1. DATABASE CREATION
DROP DATABASE IF EXISTS tailoring_management;
CREATE DATABASE tailoring_management;
USE tailoring_management;

-- =============================================================================
-- 2. TABLE DEFINITIONS (Normalized to 3NF)
-- =============================================================================

-- Table: customers
-- Purpose: Stores customer identity and contact information
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: measurements
-- Purpose: Maintains body measurements and historical measurement profiles
CREATE TABLE measurements (
    measurement_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    measured_at DATE NOT NULL,
    neck DECIMAL(5,2),
    chest DECIMAL(5,2),
    waist DECIMAL(5,2),
    hip DECIMAL(5,2),
    shoulder DECIMAL(5,2),
    sleeve_length DECIMAL(5,2),
    shirt_length DECIMAL(5,2),
    trouser_length DECIMAL(5,2),
    inseam DECIMAL(5,2),
    notes VARCHAR(255),
    CONSTRAINT fk_measurements_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: orders
-- Purpose: Tracks customer orders, deadlines, work status, and special instructions
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('Pending', 'In Progress', 'Ready', 'Collected', 'Cancelled') NOT NULL DEFAULT 'Pending',
    notes TEXT,
    CONSTRAINT fk_orders_customer 
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id) 
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Table: order_items
-- Purpose: Individual clothing items included within an order (1NF & 2NF compliance)
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    clothing_type VARCHAR(50) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_order_items_order 
        FOREIGN KEY (order_id) REFERENCES orders(order_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: staff
-- Purpose: Tailors and staff members working in the tailoring shop
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(50) NOT NULL
);

-- Table: order_staff
-- Purpose: Junction table resolving the Many-to-Many (M:N) relationship between Orders and Staff
CREATE TABLE order_staff (
    order_id INT NOT NULL,
    staff_id INT NOT NULL,
    assigned_at DATE NOT NULL,
    PRIMARY KEY (order_id, staff_id),
    CONSTRAINT fk_order_staff_order 
        FOREIGN KEY (order_id) REFERENCES orders(order_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_staff_staff 
        FOREIGN KEY (staff_id) REFERENCES staff(staff_id) 
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Table: payments
-- Purpose: Payment records and transaction history (separated from work progress)
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(30) DEFAULT 'Cash',
    reference VARCHAR(100),
    CONSTRAINT fk_payments_order 
        FOREIGN KEY (order_id) REFERENCES orders(order_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =============================================================================
-- 3. REALISTIC SAMPLE DATA FOR TESTING & DEMONSTRATION
-- =============================================================================

-- Sample Customers
INSERT INTO customers (customer_id, full_name, phone, email, address) VALUES
(1, 'Mavis', '+234 801 234 5678', 'mavis@example.com', '12 Victoria Island, Lagos'),
(2, 'Gwen', '+234 802 345 6789', 'gwen@example.com', '45 Allen Avenue, Ikeja, Lagos'),
(3, 'Senorita', '+234 803 456 7890', 'senorita@example.com', '8 Marina Street, Lagos Island'),
(4, 'Wansi T.', '+234 804 567 8901', 'wansi.client@example.com', '21 Admiralty Way, Lekki Phase 1');

-- Sample Measurements
INSERT INTO measurements (customer_id, measured_at, neck, chest, waist, hip, shoulder, sleeve_length, shirt_length, trouser_length, inseam, notes) VALUES
(1, '2026-09-01', 16.5, 40.0, 34.0, 39.0, 18.5, 25.0, 31.0, 41.0, 31.5, 'Prefers slim fit senator style'),
(2, '2026-09-03', 14.0, 36.0, 29.0, 40.5, 15.5, 22.0, 26.0, 40.0, 30.0, 'Floor-length dress adjustment'),
(3, '2026-09-05', 17.0, 42.5, 36.0, 42.0, 19.0, 25.5, 32.0, 42.5, 32.0, 'Regular fit traditional agbada'),
(4, '2026-09-10', 14.5, 37.0, 30.0, 41.0, 16.0, 23.0, 27.5, 39.5, 29.5, 'Fitted jumpsuit');

-- Sample Staff
INSERT INTO staff (staff_id, full_name, phone, role) VALUES
(1, 'Sally', '+234 809 111 2233', 'Chief Tailor / Pattern Cutter'),
(2, 'Juspen', '+234 809 222 3344', 'Apparel Assembly / Stitching'),
(3, 'Nelson', '+234 809 333 4455', 'Cutting Specialist'),
(4, 'Wansi', '+234 809 444 5566', 'Finishing & Embroidery Specialist');

-- Sample Orders
-- Demonstrates order #102 due tomorrow and in progress (matches document example!)
INSERT INTO orders (order_id, customer_id, order_date, due_date, status, notes) VALUES
(101, 1, '2026-09-05', '2026-09-18', 'Ready', 'White senator suit with front embroidery. Ready for collection.'),
(102, 1, '2026-09-10', '2026-09-16', 'In Progress', 'URGENT: Due tomorrow! Customer must be contacted before close of business.'),
(103, 2, '2026-09-08', '2026-09-22', 'In Progress', 'Navy blue corporate dress and jacket.'),
(104, 3, '2026-09-12', '2026-09-25', 'Pending', 'Agbada set (Fabric supplied by client). Awaiting final cutting.'),
(105, 4, '2026-09-02', '2026-09-12', 'Collected', 'Completed and collected on time with full payment.');

-- Sample Order Items
INSERT INTO order_items (order_id, clothing_type, description, quantity, unit_price) VALUES
(101, 'Senator Suit', '2-piece white senator with gold chest pocket detail', 1, 28000.00),
(102, 'Casual Kaftan', 'Short-sleeve sky blue linen kaftan', 2, 18000.00),
(103, 'Corporate Dress', 'Pleated evening dress with matching belt', 1, 35000.00),
(103, 'Formal Blazer', 'Fitted dark blue blazer jacket', 1, 22000.00),
(104, '3-Piece Agbada', 'Royal blue damask 3-piece agbada set', 1, 65000.00),
(105, 'Ankara Jumpsuit', 'Custom flared jumpsuit with side pockets', 1, 25000.00);

-- Assign Staff to Orders (M:N relationship)
INSERT INTO order_staff (order_id, staff_id, assigned_at) VALUES
(101, 1, '2026-09-05'),
(101, 3, '2026-09-07'),
(102, 1, '2026-09-10'),
(102, 2, '2026-09-11'),
(103, 2, '2026-09-08'),
(104, 1, '2026-09-12'),
(105, 1, '2026-09-02'),
(105, 2, '2026-09-03');

-- Sample Payments
INSERT INTO payments (order_id, amount, payment_date, payment_method, reference) VALUES
(101, 28000.00, '2026-09-05', 'Bank Transfer', 'TRX-10101-FULL'),
(102, 20000.00, '2026-09-10', 'Cash', 'RCPT-0045-DEPOSIT'),
(103, 30000.00, '2026-09-08', 'POS / Card', 'POS-8921-PARTIAL'),
(104, 40000.00, '2026-09-12', 'Bank Transfer', 'TRX-9942-DEPOSIT'),
(105, 25000.00, '2026-09-02', 'Cash', 'RCPT-0038-FULL');

-- =============================================================================
-- 4. ESSENTIAL DEMONSTRATION & DEFENSE QUERIES
-- =============================================================================

-- Query A: DUE DATE MONITOR & EARLY CUSTOMER NOTIFICATION (Section 7)
SELECT 
    o.order_id,
    c.full_name AS customer_name,
    c.phone AS customer_phone,
    o.due_date,
    DATEDIFF(o.due_date, '2026-09-15') AS days_remaining,
    o.status AS work_status,
    CASE 
        WHEN DATEDIFF(o.due_date, '2026-09-15') < 0 THEN 'OVERDUE - Contact Customer Immediately'
        WHEN DATEDIFF(o.due_date, '2026-09-15') <= 1 THEN 'CRITICAL - Due within 24-48 Hours'
        ELSE 'Approaching Deadline'
    END AS alert_level
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status IN ('Pending', 'In Progress')
  AND o.due_date <= DATE_ADD('2026-09-15', INTERVAL 3 DAY)
ORDER BY o.due_date ASC;

-- Query B: ORDER FINANCIAL STATUS (Work Status vs Payment Status)
SELECT 
    o.order_id,
    c.full_name AS customer_name,
    o.status AS work_status,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_bill,
    COALESCE(p.total_paid, 0) AS amount_paid,
    (COALESCE(SUM(oi.quantity * oi.unit_price), 0) - COALESCE(p.total_paid, 0)) AS balance_remaining,
    CASE 
        WHEN COALESCE(p.total_paid, 0) = 0 THEN 'Unpaid'
        WHEN COALESCE(p.total_paid, 0) < COALESCE(SUM(oi.quantity * oi.unit_price), 0) THEN 'Partially Paid'
        ELSE 'Fully Paid'
    END AS payment_status
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN (
    SELECT order_id, SUM(amount) AS total_paid
    FROM payments
    GROUP BY order_id
) p ON o.order_id = p.order_id
GROUP BY o.order_id, c.full_name, o.status, p.total_paid;
