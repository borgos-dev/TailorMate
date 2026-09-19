For this project, I would not make the frontend too big or too beautiful. Since your supervisor said the project should be database-focused, the frontend should mainly demonstrate that your database solves the tailoring problem.
I would build it as a small Tailor Dashboard.

1. Main dashboard

The first screen should immediately show the tailor what needs attention.
┌─────────────────────────────────────────────────────┐ │ TailorManager 👤 Admin │ ├──────────────┬──────────────────────────────────────┤ │ Dashboard │ │ │ Customers │ Dashboard │ │ Orders │ │ │ Measurements │ ┌────────┐ ┌────────┐ ┌────────┐ │ │ Payments │ │ 24 │ │ 8 │ │ 3 │ │ │ Staff │ │Orders │ │In Work │ │Due Soon│ │ │ │ └────────┘ └────────┘ └────────┘ │ │ │ │ │ │ ⚠ ORDERS NEEDING ATTENTION │ │ │ │ │ │ John │ Shirt/Trouser │ Due Tomorrow│ │ │ Sarah │ Dress │ Due Today │ │ │ Paul │ Suit │ Due in 2d │ └──────────────┴──────────────────────────────────────┘ 
This is important because the dashboard demonstrates your project's main purpose.

2. Customers page

A simple customer list:
Customers + Add Customer Search customer... ┌─────────────────────────────────────────────┐ │ Name Phone Orders Action │ ├─────────────────────────────────────────────┤ │ John Doe 670... 4 View │ │ Sarah 677... 2 View │ │ Paul 690... 7 View │ └─────────────────────────────────────────────┘ 
When you click View, show:

Customer information

Previous orders

Measurements

Payment history

This demonstrates the relationships in your database.

3. New Order page

This is probably one of your most important screens.
Create New Order Customer [ Select Customer ▼ ] Order Date [ 16/09/2026 ] Expected Ready Date [ 25/09/2026 ] Clothing Items ┌──────────────────────────────────────────┐ │ Type Description Qty Price │ │ Shirt White cotton 2 15,000 │ │ Trouser Black 2 20,000 │ │ Cap Black 2 5,000 │ └──────────────────────────────────────────┘ + Add Item Assign Staff [ Paul ▼ ] Initial Payment [ 30,000 FCFA ] [Create Order] 
Notice something important here:
One order can have multiple clothing items.
That visually demonstrates why you created orders and order_items separately.

4. Order details page

This is where I would make the project really convincing.
For example:
Order #102 Customer: John Doe Phone: 670 XXX XXX Order Date: 10 Sept 2026 Expected Date: 17 Sept 2026 Status: IN PROGRESS Payment: PARTIALLY PAID ──────────────────────────────────── CLOTHING ITEMS Shirt 2 × 15,000 Trouser 2 × 20,000 Cap 2 × 5,000 Total: 80,000 FCFA Paid: 40,000 FCFA Due: 40,000 FCFA ──────────────────────────────────── STAFF Paul — Chief Tailor David — Sewing Staff ──────────────────────────────────── ⚠ DEADLINE WARNING This order is due tomorrow and is still IN PROGRESS. Contact customer before the collection date if the clothes will not be ready. [Mark as Ready] [Update Status] 
This screen directly demonstrates the problem your project is solving.
Your supervisor can look at it and immediately understand:

"Okay, this isn't just a database storing customers. It actually helps the tailor monitor unfinished orders and deadlines."

5. Measurements page

You don't need something complicated.
John Doe — Measurements Last measured: 12/09/2026 Neck 40 cm Chest 102 cm Waist 88 cm Hip 98 cm Shoulder 46 cm Sleeve 62 cm Shirt Length 75 cm Trouser Length 105 cm Inseam 78 cm [Update Measurements] Previous Measurements ────────────────────── 12/09/2026 05/03/2026 18/08/2025 
That last section demonstrates why you decided to keep measurement history.

6. Payments page

Keep it simple.
Order #102 — Payments Total Order: 80,000 FCFA Payment History Date Amount Method 10/09/26 20,000 Cash 12/09/26 20,000 Mobile Money Total Paid: 40,000 Remaining: 40,000 [Add Payment] 
Again, this demonstrates your payments table.

7. Staff page

Staff + Add Staff Name Role ──────────────────────────── Paul Chief Tailor David Sewing Staff Michael Cutting Staff 
Then an order can have several staff members assigned to it.

8. The most important feature: deadline alerts

I would actually make this visually obvious on the dashboard.
For example:

Orders needing attention

CustomerOrderDueStatusJohn DoeShirt + TrouserTomorrow⚠ In ProgressSarahDressToday⚠ In ProgressPaulSuit3 daysIn Progress 
When the tailor clicks John:

Order #102 is due tomorrow and is still in progress.
Please contact the customer before the expected collection date if the order will not be ready.

This is the feature I'd emphasize during your defense.

9. Don't actually build WhatsApp yet

For the school project, I'd put something like:
Customer Contact Phone: 670 XXX XXX ⚠ Order may be delayed. [Contact Customer] 
The button could simply be a demonstration button or show a message such as:

"Customer notification feature — future WhatsApp integration."

Don't spend your project time trying to build WhatsApp API integration unless your supervisor specifically requires it.

10. Technology I would use

Because you're already comfortable with web development, I'd make it:
Frontend

Next.js

TypeScript

Tailwind CSS

Lucid icons

3D for animations

use src/app instead of app folder

Database

MySQL

MySQL Workbench for design/EER diagram

But because your school project specifically doesn't require a backend, you can present the frontend as the user interface prototype and focus your actual implementation/defense on the database.
If you do eventually connect the frontend to MySQL, remember that a browser frontend should not connect directly to MySQL. You would need a backend/API layer between them. But you don't need to introduce that complexity just to satisfy this project.

The navigation I'd use

Keep it to 6–7 pages:
TAILORMANAGER Dashboard Customers Orders Measurements Payments Staff 
And inside Orders:
Orders ├── All Orders ├── Create Order └── Order Details 
That's enough.

The key idea

Your frontend should not try to prove:

"Look how beautiful my website is."

It should prove:

"Here is the real tailoring problem, here is the information the database stores, and here is how the interface allows the tailor to use that information to manage orders and catch approaching/delayed deadlines."

That approach fits your database-focused school project much better.

I would actually go with your idea: a Home/Welcome page → Dashboard.
The reason I initially went straight to the dashboard was because I was optimizing for the database defense. But that does not mean a welcome page is a bad idea. If you keep it purposeful and small, it can make the project feel like a real product without distracting from the database.

Why I would go with your idea

Your project isn't just a database diagram. You're demonstrating a system intended for a real tailor to use.
So having:
Welcome Page → Login/Enter System → Dashboard
makes the application feel complete.
The home page could introduce the system:

TailorManager
Manage your customers. Track every order. Never lose sight of a deadline.

Then briefly show:

Customer management

Order tracking

Measurements

Payment tracking

Staff assignments

Due-date reminders

Early customer notification when an order may be delayed

Then:
[Enter Dashboard]
That gives you a proper product entrance.

Why not make the homepage too large?

This is where I would be careful.
Your supervisor is evaluating a database project, not a commercial website.
If you build a huge landing page with:

10 sections

animations

pricing

testimonials

blogs

fancy marketing copy

complicated authentication

etc.

you could accidentally make the project look like you're presenting a frontend project instead of a database project.
So I'd make the homepage one clean screen or a short landing page.
Something like:
TAILORMANAGER Your tailoring business, organized in one place. Manage customers • Orders • Measurements Payments • Staff • Deadlines [ Enter Dashboard ] ✓ Track every order ✓ Monitor approaching deadlines ✓ Keep customer measurements ✓ Track payments ✓ Identify delayed orders early 
Then the dashboard takes over.

Why I would NOT stick with only the dashboard

If you go directly to:
Dashboard Customers Orders Payments Staff 
that's perfectly functional.
But it immediately looks like an admin/database management interface.
That's not necessarily bad—but your home page gives you an opportunity to establish the story:
Problem → Solution → System
For your defense, that's useful.
You can literally start:

"This is the welcome page of the system. The system is designed for tailoring businesses to manage customers and orders. One of the main problems we identified was delayed orders and the difficulty of monitoring approaching deadlines."

Then click:
Enter Dashboard
And say:

"This is the dashboard where the tailor can see the current state of the business."

That creates a much more natural demonstration.

So I'd structure your project like this

TAILORMANAGER │ ▼ ┌─────────────────┐ │ HOME / WELCOME │ │ │ │ Enter System │ └────────┬────────┘ │ ▼ ┌─────────────────┐ │ DASHBOARD │ └────────┬────────┘ │ ┌──────────────┼──────────────┐ ▼ ▼ ▼ Customers Orders Measurements │ ▼ Order Details │ ┌────────────┼────────────┐ ▼ ▼ ▼ Payments Staff Due Date │ ▼ Deadline Warning │ ▼ Contact Customer 
This is much closer to what I would build for your particular project.

One more thing

I would also give the homepage a real tailoring visual identity, rather than making it look like a generic SaaS dashboard.
For example:
TailorManager
From measurement to collection, keep every order under control.
Then use a subtle tailoring-related image/illustration—sewing machine, measuring tape, fabric, tailor working, etc.—without making the page overly decorative.
The dashboard should be the functional heart, while the homepage should explain what the system is and why it exists.
So my recommendation is:
Keep your Home → Dashboard idea.
Just keep the Home page short and purposeful so the database remains the star of the project.

Yes. This is actually an important part of your system, because you are not only storing data—you are designing how a tailoring business operates.
The key thing is to distinguish customer, order, and staff assignment.

1. The tailor/chef tailor enters the customer

I would make the chief tailor/entrepreneur the main person who creates customers and orders.
For example:
Customers → + New Customer
New Customer ──────────────────────── Full Name * [ John Doe ] Phone * [ 670 XXX XXX ] Email [ ] Address [ ] [Save Customer] 
Once saved, John becomes a customer in the customers table.
A customer could also give their information themselves in a future version, but for your school project I would make the tailor responsible for entering it. It keeps the workflow simpler.

2. Then the tailor creates an order for that customer

The chief tailor opens John's profile:
John Doe 670 XXX XXX Orders ──────────────────────── #102 Shirt + Trouser Due: 20 Sept Status: In Progress [+ New Order] 
The tailor clicks New Order.
NEW ORDER Customer: John Doe Order Date: 16 Sept 2026 Expected Ready Date: 20 Sept 2026 ITEMS 1. Shirt Description: White cotton shirt Quantity: 2 2. Trouser Description: Black formal trouser Quantity: 2 + Add Item 
Now the system knows:
John → Order #102 → Shirt + Trouser

3. Then comes the important part: assigning staff

After creating the order, the chief tailor can see:

Assign Staff

ORDER #102 Customer: John Doe Items: 2 Shirts, 2 Trousers Due: 20 Sept Assign staff ☑ Paul — Sewing ☐ Michael — Cutting ☐ David — Finishing [Assign Staff] 
But I would make this slightly more detailed in the real application.
Because you don't really want to assign a staff member to the customer.
You want to assign them to the order.
That's an important database concept.
For example:

John is the customer.
Order #102 is John's specific order.
Paul is assigned to work on Order #102.

So your database relationship is:
CUSTOMER │ │ has ▼ ORDER │ │ assigned to ▼ STAFF 
And your order_staff table records that assignment.

4. But how does the staff member know what they have to do?

This is where I would add a Staff Dashboard.
When Paul logs into the system, he shouldn't see the chief tailor's entire dashboard.
He should see something like:
Good morning, Paul MY ASSIGNED ORDERS ──────────────────────────────────── Order #102 Customer: John Doe Items: • 2 White Shirts • 2 Black Trousers Due: 20 Sept Status: In Progress [View Order] 
Then Paul clicks View Order.
ORDER #102 CUSTOMER John Doe 670 XXX XXX ITEMS ──────────────────── 2 × White Shirt 2 × Black Trouser DESCRIPTION White cotton shirt Black formal trouser DUE DATE 20 September 2026 YOUR TASK Sewing STATUS [ In Progress ▼ ] [Update Status] 
Now the staff member knows:
who the customer is → what order → what clothes → what they have been assigned to do → when it is due.
That's much more realistic.

5. The Chef Tailor needs a "My Team" view

For the entrepreneur/chief tailor, I'd have:

Staff

STAFF Paul Sewing 3 active orders Michael Cutting 5 active orders David Finishing 2 active orders 
Click Paul:
PAUL — SEWING Assigned Orders ──────────────────────────── #102 John Doe 2 Shirts + 2 Trousers Due: Sept 20 In Progress #107 Sarah 1 Dress Due: Sept 22 Pending 
Now the chief tailor can see who is working on what.

6. And this connects directly to your deadline problem

This is where your project becomes much more interesting.
Imagine:
CHEF TAILOR DASHBOARD Orders: 24 In Progress: 8 Due Soon: 3 Delayed: 1 
The chef tailor sees:

⚠ Order #102 — Due Tomorrow

Then:
Order #102 Customer: John Doe Assigned: Paul Status: In Progress Due: Tomorrow ⚠ This order is not ready. 
The chief tailor can then talk to Paul:

"Paul, Order #102 for John is due tomorrow. Is the sewing going to be completed?"

If Paul says no, the chief tailor can contact John before the due date.
That's the exact business problem your project is trying to solve.

7. What if several staff work on the same clothes?

This is why your order_staff table is useful.
For example:
Order #102 — John Doe Paul → Sewing Michael → Cutting David → Finishing 
All three are working on the same order.
Your database can represent that:
order_staff order_id | staff_id ---------|--------- 102 | 1 102 | 2 102 | 3 
However, there is one improvement I'd consider for your database.
Instead of only:
order_id staff_id assigned_at 
you could have:
order_staff order_id staff_id task assigned_at assignment_status 
For example:
OrderStaffTaskStatus102PaulSewingIn Progress102MichaelCuttingCompleted102DavidFinishingPending 
That gives your system much better staff management.

8. The complete workflow becomes

Your application could work like this:
CHEF TAILOR │ ▼ Create Customer │ ▼ Create Order │ ▼ Add Clothing Items │ ▼ Record Measurements │ ▼ Assign Staff │ ▼ ───────────────────── STAFF WORKSPACE ───────────────────── │ ▼ Staff sees assigned orders │ ▼ Staff works on clothes │ ▼ Staff updates task/order status │ ▼ ───────────────────── CHEF TAILOR DASHBOARD ───────────────────── │ ├── See progress ├── See assigned staff ├── See payments ├── See approaching deadlines └── See delayed orders │ ▼ Contact customer early 

And this answers your question about "organization"

The chief tailor is the manager of the workflow.
They don't need to personally remember:

"Paul is sewing John's two shirts, Michael is cutting the trousers, and David will finish them."

The database keeps that information.
The staff dashboard tells each worker what has been assigned to them, while the chief tailor dashboard gives the entrepreneur the overall picture.
That is a much stronger frontend concept than simply having "Customers / Orders / Payments" pages.
It also gives you something excellent to demonstrate to your supervisor:
Create customer → create order → assign staff → log in/view as staff → staff sees assigned work → update progress → chief tailor sees progress → approaching deadline produces warning.
That is a complete real-world workflow, while your database remains the foundation underneath it.


Yes — if you want the system to realistically handle staff assignments, I recommend having a staff dashboard too.
But there is an important distinction: you do not necessarily need to build a completely separate website/dashboard for staff.
You can have one application with different dashboards depending on the user's role.

Your structure could be:

TAILORMANAGER │ Login │ ┌─────────┴─────────┐ │ │ Chief Tailor Staff Member │ │ ▼ ▼ Chief Tailor Dashboard Staff Dashboard 

Chief Tailor Dashboard

The entrepreneur/chef tailor sees the whole business:

Total customers

All orders

Orders due soon

Delayed orders

Payments

All staff

Who is assigned to which order

Customer information

Measurements

For example:

⚠️ Order #102 — John Doe — Due Tomorrow — Still In Progress — Assigned to Paul

Staff Dashboard

A staff member sees only the work assigned to them.
For Paul:

My Assigned Orders
Order #102 — John Doe

2 Shirts

2 Trousers

Task: Sewing

Due: Sept 20

Status: In Progress

Paul doesn't need access to everything the chief tailor sees.

And this is actually good for your database project

Because now you can demonstrate the relationship:
Staff → assigned to → Orders
And your frontend makes that database relationship visible.
You could even have a simple role field:
staff ------------------------ staff_id full_name phone role 
For example:
Paul | Chief Tailor Michael | Cutter David | Sewing Staff 
Then your application decides what each person sees based on their role.

One thing I'd change from my previous explanation

Don't think:

"I need to build two different applications."

Think:

"I have one TailorManager application with two types of dashboards: management view and staff view."

For your school project, you can keep the staff dashboard very simple. You don't need to build a huge staff-management system.
The important demonstration is:
Chief Tailor creates order → assigns Paul → Paul sees Order #102 in his dashboard → Paul updates his task → Chief Tailor sees the updated progress.
That would make your project feel like a real working system rather than just a collection of database forms.