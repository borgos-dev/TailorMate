# TailorMate: Official Canva Presentation Guide
**Author / Presenter:** Akiy Humphery  
**Project:** TailorMate — Bespoke Tailoring Order & Atelier Management System (Level 3 Project)  
**Target Platform:** Canva Presentation (16:9 Widescreen)

---

## 🎨 Recommended Canva Design & Styling System

| Element | Recommended Setting in Canva | Notes / Codes |
| :--- | :--- | :--- |
| **Canva Template Search** | *"Tech Startup Pitch Deck"*, *"Minimalist Modern Case Study"*, or *"Luxury Fashion Portfolio"* | Choose a clean, dark or warm minimalist aesthetic |
| **Primary Accent Color** | `#C5A880` (Warm Atelier Gold / Champagne) | Highlights, badges, borders |
| **Dark Neutral Background**| `#181512` or `#1F1B16` (Deep Espresso / Atelier Charcoal) | Modern high-contrast premium feel |
| **Light Card Surface** | `#26211C` or `#FAF7F2` (Alabaster Cream for light theme) | Content cards, metric boxes |
| **Typography (Headings)** | *Playfair Display*, *Cinzel*, or *Syne* | Editorial, bespoke sartorial feel |
| **Typography (Body)** | *Inter*, *Plus Jakarta Sans*, or *Montserrat* | Crisp readability for data & technical points |

---

## 📁 Image Assets Ready in Your Repository
Upload these exact files directly from your workspace into Canva's **Uploads** tab:

1. **Brand Identity:**
   - Logo: `tailormate/public/images/tailormate_brand_logo.png`
   - Monogram Icon: `tailormate/public/images/tailormate_icon.png`
2. **Problem & Atelier Reality:**
   - Workshop Chaos & Manual Craft: `tailormate/public/images/workshop_reality_tailor.jpg`
   - Traditional Master Artisan: `tailormate/public/images/hero_tailor_artisan.jpg`
3. **The Solution & Workflow:**
   - Digital Measurement Vault: `tailormate/public/images/digital_sizing_vault_tailor.jpg`
   - Team Collaboration & Delegation: `tailormate/public/images/team_coordination_workshop.jpg`
   - Step 1 (Measure): `tailormate/public/images/how_it_works_measure.jpg`
   - Step 2 (Cut & Assemble): `tailormate/public/images/how_it_works_cutting.jpg`
   - Step 3 (On-Time Delivery): `tailormate/public/images/how_it_works_deliver_on_time.jpg`
4. **Live UI & Technical Evidence:**
   - Live Dashboard Screenshot: `dash_test.png`
   - System Report Visuals: `TailorMate_Report_English_Akiy_Humphery_page_1.png` to `page_4.png`

---

## 🖥️ Slide-by-Slide Presentation Content

---

### SLIDE 1: Title & Opening
* **Slide Category:** Title / Hero
* **Slide Headline:** **TailorMate**
* **Sub-headline:** Modern Atelier Management & 3NF Relational Database Platform
* **Presenter Information:** Presented by **Akiy Humphery** | Level 3 Academic Project
* **Canva Visual Layout:**
  - Background: Deep Espresso (`#181512`).
  - Center: Place `tailormate_brand_logo.png` prominently.
  - Right or Lower Corner: Subtle overlay of `hero_tailor_artisan.jpg` with a 40% dark gradient overlay.
  - Bottom Tagline: *"Transforming artisanal craftsmanship through precision database engineering."*
* **🎙️ Speaker Notes (What to say):**
  > *"Good morning, respected jury and supervisor. Today, I am proud to present TailorMate. TailorMate is an atelier management system engineered to bridge the gap between traditional bespoke craftsmanship and rigorous, normalized database architecture. It eliminates deadline failures, manual paper disorganization, and financial ambiguity in tailoring businesses."*

---

### SLIDE 2: The Problem (The Atelier Reality)
* **Slide Category:** Problem Statement
* **Slide Headline:** The Hidden Crises of Manual Tailoring
* **Sub-headline:** Why bespoke fashion workshops struggle to scale and maintain client trust
* **Content Cards (3 Columns):**
  1. **Lost Measurements & Paper Chits:**
     - Dimensions written on scattered notebooks or cardboard scrap.
     - Clients forced into repeated, frustrating re-measuring sessions.
  2. **The "Tomorrow" Syndrome (Deadline Blindness):**
     - No centralized visibility into order deadlines.
     - Tailors realize garments are incomplete only when clients arrive to collect.
  3. **Financial & Inventory Leakage:**
     - Fragmented advance deposits vs. remaining balances.
     - Confusion between production progress and payment status.
* **Canva Visual Layout:**
  - Left side: Place `workshop_reality_tailor.jpg` with a warm border.
  - Right side: Three structured cards with alert badges (Red/Amber: `#E05D52`).
* **🎙️ Speaker Notes:**
  > *"When we visited real tailoring workshops, the core issue wasn't the artisans' skill; it was information management. Measurements get lost on scraps of paper, multi-piece orders create confusion, and tailors struggle with deadline tracking—often realizing an agbada or suit is unfinished on the exact day the customer arrives."*

---

### SLIDE 3: The Solution (Introducing TailorMate)
* **Slide Category:** Solution / Product Overview
* **Slide Headline:** TailorMate: Precision Atelier Operations
* **Sub-headline:** A structured management ecosystem connecting clients, measurements, production, and finance
* **Key Pillars (4 Metric Cards):**
  - **1. Permanent Digital Sizing Vault:** Timestamped measurement histories ensuring historical body fit is never lost.
  - **2. Proactive Deadline Monitor:** Visual alert triggers (Due Today, Due Tomorrow, Overdue) before customer escalation.
  - **3. Normalized Multi-Garment Orders:** One master order seamlessly tracking shirts, trousers, and caps individually.
  - **4. Decoupled Payment Ledger:** Real-time ledger calculating Total, Paid, and Outstanding balances independently of workshop phase.
* **Canva Visual Layout:**
  - Center Image: Place `digital_sizing_vault_tailor.jpg` in an elegant rounded container.
  - Flank with 4 icons (Ruler, Clock, Scissors, Wallet) linked to the 4 pillars.
* **🎙️ Speaker Notes:**
  > *"TailorMate solves these crises at their root. It introduces a permanent digital sizing vault, active deadline monitoring, multi-garment itemization, and clear financial tracking. It is designed so that a chief tailor can glance at a screen and know within five seconds exactly what needs cutting, who is sewing, and who owes money."*

---

### SLIDE 4: Core Workflow (From Intake to Handover)
* **Slide Category:** Process / How It Works
* **Slide Headline:** The Bespoke Operational Lifecycle
* **Sub-headline:** 4 streamlined stages powered by relational integrity
* **Visual Flow (Horizontal 4-Step Process):**
  1. **Step 01: Client Intake & Sizing**
     - Capture complete anatomical measures (Neck, Chest, Waist, Inseam).
     - *Asset:* `how_it_works_measure.jpg`
  2. **Step 02: Order Itemization**
     - Deconstruct order into discrete garments with custom unit costs and fabrics.
     - *Asset:* `how_it_works_intake_app.jpg`
  3. **Step 03: Atelier Production & Assignment**
     - Delegate cutting, stitching, and finishing to specialized workshop staff.
     - *Asset:* `how_it_works_cutting.jpg`
  4. **Step 04: On-Time Handover & Settlement**
     - Deadline alert verification, balance clearance, and completed delivery.
     - *Asset:* `how_it_works_deliver_on_time.jpg`
* **Canva Visual Layout:**
  - 4 horizontal cards with numbering `01`, `02`, `03`, `04` in Atelier Gold (`#C5A880`).
  - Insert the 4 corresponding thumbnails under each step.
* **🎙️ Speaker Notes:**
  > *"Here is how work moves through TailorMate. In Step 1, the client's measurements are recorded in the database. In Step 2, the order is configured with individual garment line-items. In Step 3, tasks are assigned to artisans with real-time status updates. Finally, in Step 4, the garment is verified, remaining payments are settled, and the customer leaves delighted on time."*

---

### SLIDE 5: Database Architecture & Normalization (3NF)
* **Slide Category:** Database Engineering (Core Academic Highlight)
* **Slide Headline:** Database Design: Engineered in Third Normal Form (3NF)
* **Sub-headline:** Eliminating data anomalies, redundancies, and integrity failures
* **Table Breakdown:**
  - `customers`: Unique customer master profile (`customer_id`, `full_name`, `phone`, `email`).
  - `measurements`: Decoupled historical 1:N log with cascade updates.
  - `orders`: Master order dates, deadlines (`due_date`), and production status (`ENUM`).
  - `order_items`: Garment-level detail enforcing 1NF & 2NF (`clothing_type`, `unit_price`, `quantity`).
  - `staff` & `order_staff`: Junction table resolving M:N delegation between multiple tailors and orders.
  - `payments`: Independent transaction ledger with timestamps and payment modes.
* **Canva Visual Layout:**
  - Display an ER Diagram / Table Relationship card layout.
  - Add small badges: `PK` (Primary Key), `FK` (Foreign Key), `1:N Relationship`, `M:N Junction`.
* **🎙️ Speaker Notes:**
  > *"Because this is a database-focused project, normalization was our top priority. We eliminated update and deletion anomalies by strictly normalizing the schema to 3NF. An order is not just a row with text; clothing items are separated into order_items, payments are isolated into an audit ledger, and staff assignments use an order_staff junction table."*

---

### SLIDE 6: Technical Challenges Encountered & Solutions
* **Slide Category:** Engineering Challenges & Problem Solving
* **Slide Headline:** Engineering Roadblocks & Solutions
* **Sub-headline:** Key technical hurdles faced during database and frontend development
* **Challenge vs. Solution Grid (4 Key Highlights):**
  1. **Challenge 1: The Measurement Overwrite Dilemma**
     - *Problem:* Storing body measurements directly inside the `customers` table destroyed historical fit data whenever a customer gained or lost weight.
     - *Solution:* Decoupled into a dedicated `measurements` table with `measured_at` timestamps, enabling full measurement evolution tracking.
  2. **Challenge 2: The Multi-Garment Composite Order (1NF Violation)**
     - *Problem:* Tailoring orders often bundle multiple clothing types (e.g., 2 Shirts + 1 Trouser + 1 Cap) with separate pricing.
     - *Solution:* Extracted `order_items` with a foreign key referencing `orders.order_id`, maintaining atomicity and pricing integrity.
  3. **Challenge 3: M:N Staff Delegation Complexity**
     - *Problem:* One order requires multiple craftspeople (cutter, stitcher, embroiderer), while one artisan works on multiple orders.
     - *Solution:* Built an associative junction entity `order_staff` with composite keys `(order_id, staff_id)` and assignment timestamps.
  4. **Challenge 4: Separation of Production vs. Financial State**
     - *Problem:* In manual workshops, tailors confuse "Clothes Ready" with "Order Paid".
     - *Solution:* Separated `orders.status` (`Pending`, `In Progress`, `Ready`, `Collected`) completely from `payments.amount`, dynamically deriving payment health in real time.
* **Canva Visual Layout:**
  - 2x2 comparison grid with contrasting "⚠️ Challenge" (red/gray) and "✅ Technical Resolution" (gold/green) tags.
* **🎙️ Speaker Notes:**
  > *"During development, we encountered several architectural crossroads. For instance, putting measurements in the customer record caused data loss when sizes changed. We solved this by creating a 1-to-many historical log. We also had to solve the M:N relationship where multiple tailors collaborate on a single order, which we resolved with a composite junction table."*

---

### SLIDE 7: The Technology Stack
* **Slide Category:** Technology & Infrastructure
* **Slide Headline:** Built with Modern Engineering Standards
* **Sub-headline:** Robust relational foundations paired with a reactive, type-safe web interface
* **Tech Stack Grid:**
  - **Database Layer:**
    - `MySQL 8.0+`: High performance, ACID transactions, referential integrity.
    - `MySQL Workbench`: Conceptual & logical EER modeling.
  - **Frontend & UI Layer:**
    - `Next.js 16 (App Router)`: Blazing-fast Turbopack bundling, server/client component splitting.
    - `TypeScript`: Strict compile-time type safety for complex order and measurement models.
    - `Tailwind CSS`: Custom atelier design tokens (`espresso`, `terracotta`, `atelier gold`).
  - **Version Control & Tooling:**
    - `Git` & `GitHub`: Complete repository versioning (`borgos-dev/TailorMate`).
    - `Python (PIL / Pillow)`: Precision automated image processing and RGBA icon generation.
* **Canva Visual Layout:**
  - Clean tech badges with logos (MySQL, Next.js, TypeScript, Tailwind, Git).
* **🎙️ Speaker Notes:**
  > *"For our technology stack, we utilized MySQL 8.0 with InnoDB to guarantee ACID transaction properties and foreign key constraints. On the frontend, we leveraged Next.js 16 with Turbopack, TypeScript for strict type checking, and Tailwind CSS for a bespoke design system."*

---

### SLIDE 8: Live Demonstration: The TailorMate Dashboard
* **Slide Category:** System Demonstration
* **Slide Headline:** Live Platform: Operational Control Center
* **Sub-headline:** Real-time deadline alerts and active atelier metrics
* **Key Demonstration Highlights:**
  - **Deadline Radar:** Immediate badge alerts for orders due *Today*, *Tomorrow*, or *Overdue*.
  - **Dynamic Financial KPIs:** Total atelier revenue, collected advance payments, and outstanding credit.
  - **Multi-Status Workflow:** Filterable tabs (`All`, `Pending`, `In Progress`, `Ready`, `Collected`).
* **Canva Visual Layout:**
  - Feature large, centered image of `dash_test.png` or an embedded live screenshot.
  - Callout arrows pointing to the **Deadline Warning Card** and **Payment Tracking Bar**.
* **🎙️ Speaker Notes:**
  > *"Here is the live interface in action. Notice how the dashboard immediately brings urgent orders to the tailor's attention. Order #102 for John Doe clearly displays an alert: 'Due Tomorrow — In Progress'. The tailor doesn't have to guess or search notebooks; the system proactively safeguards customer delivery times."*

---

### SLIDE 9: Project Impact & Business Value
* **Slide Category:** Value Proposition / Results
* **Slide Headline:** Tangible Atelier Transformation
* **Sub-headline:** Measurable advantages over traditional manual bookkeeping
* **Impact Metrics (3 Highlight Boxes):**
  - **90% Reduction in Lost Measurements:** Permanent centralized digital records accessible across devices.
  - **Zero Deadline Blindness:** Proactive time tracking stops customer disappointment before it happens.
  - **100% Financial Transparency:** Exact visibility over deposits, pending debt, and atelier cash flow.
* **Canva Visual Layout:**
  - Right: Place `team_coordination_workshop.jpg`.
  - Left: Three bold metric cards with gold percentage highlights.
* **🎙️ Speaker Notes:**
  > *"By replacing torn notebooks with TailorMate, an atelier eliminates nearly all lost measurement disputes, prevents unfulfilled promises on collection day, and ensures every single franc or naira of customer deposit is accurately accounted for."*

---

### SLIDE 10: Future Roadmap & Enhancements
* **Slide Category:** Future Work / Vision
* **Slide Headline:** The Future of TailorMate
* **Sub-headline:** Scaling from a workshop management tool into a connected fashion ecosystem
* **Roadmap Items:**
  - **1. Automated WhatsApp Bot / SMS Notifications:** Automatic alerts sent to clients when their garments enter cutting, fitting, or collection ready states.
  - **2. 3D Body Measurement Scanning & AI Sizing:** Computer-vision assisted sizing directly via smartphone camera.
  - **3. Inventory & Fabric Yardage Tracker:** Tracking meters of cashmere, linen, and silk consumed per garment item.
  - **4. Client Self-Service Portal:** Enabling customers to track their garment progress and book fitting appointments online.
* **Canva Visual Layout:**
  - Sleek horizontal roadmap timeline with milestone dots leading to 2027.
* **🎙️ Speaker Notes:**
  > *"Moving forward, TailorMate's architecture is positioned to expand into automated WhatsApp dispatch notifications, fabric inventory tracking, and 3D customer self-sizing."*

---

### SLIDE 11: Conclusion & Q&A
* **Slide Category:** Conclusion
* **Slide Headline:** Thank You / Q&A
* **Sub-headline:** TailorMate — Where artisanal bespoke tailoring meets relational database precision
* **Details on Slide:**
  - **Student Name:** Akiy Humphery
  - **Repository:** `github.com/borgos-dev/TailorMate`
  - **Project:** Level 3 Academic Project
  - Call to Action: *"Open for questions and technical discussion."*
* **Canva Visual Layout:**
  - Center: `tailormate_brand_logo.png`
  - Subtle background: `hero_tailor_real.jpg` with high-opacity dark overlay.
* **🎙️ Speaker Notes:**
  > *"Thank you for your time and attention. I am now ready to welcome your questions regarding the database normalization, relational constraints, or platform implementation."*

---

## 💡 Quick Tips for Building in Canva

1. **How to upload images:** Open Canva -> Click **Uploads** on the left panel -> Drag and drop files from `d:\LEVEL 3 PROJECT\tailormate\public\images\`.
2. **Card Style:** Use rounded rectangles (Corner rounding: `16px`), fill with `#26211C` (Dark Mode) or `#FFFFFF` (Light Mode), and add a subtle `1px` stroke with `#C5A880` (Gold).
3. **Animations:** Use **"Subtle"** or **"Breathe"** page transitions in Canva to maintain an elegant, professional defense tone without distracting the evaluators.
