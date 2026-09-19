import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Check available images
BASE_DIR = r"D:\LEVEL 3 PROJECT"
IMG_DIR = os.path.join(BASE_DIR, "tailormate", "public", "images")

logo_path = os.path.join(IMG_DIR, "tailormate_brand_logo.png")
if not os.path.exists(logo_path):
    logo_path = os.path.join(IMG_DIR, "tailormate_icon.png")

dash_img = os.path.join(BASE_DIR, "dash_test.png")
order_img = os.path.join(IMG_DIR, "how_it_works_order.jpg")
staff_img = os.path.join(IMG_DIR, "team_coordination_workshop.jpg")
vault_img = os.path.join(IMG_DIR, "digital_sizing_vault_tailor.jpg")
deliver_img = os.path.join(IMG_DIR, "how_it_works_deliver_on_time.jpg")

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(36, 810, "TAILORMATE — Project Defense Report")
            self.drawRightString(559, 810, "Prepared by Akiy Humphery")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(36, 804, 559, 804)
        
        # Footer
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(559, 25, page_str)
        self.drawString(36, 25, "Confidential — Academic Defense & Evaluation")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 36, 559, 36)
        self.restoreState()


class NumberedCanvasFrench(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvasFrench, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(36, 810, "TAILORMATE — Rapport de Soutenance de Projet")
            self.drawRightString(559, 810, "Rédigé par Akiy Humphery")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(36, 804, 559, 804)
        
        # Footer
        page_str = f"Page {self._pageNumber} sur {page_count}"
        self.drawRightString(559, 25, page_str)
        self.drawString(36, 25, "Confidentiel — Évaluation Académique & Soutenance")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 36, 559, 36)
        self.restoreState()


def get_flowable_image(path, w, h):
    if os.path.exists(path):
        return RLImage(path, width=w, height=h)
    return Paragraph(f"<b>[Screenshot: {os.path.basename(path)}]</b>", ParagraphStyle(
        'Placeholder', fontName='Helvetica', fontSize=8, leading=10, textColor=colors.HexColor("#64748b")
    ))

def build_english_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=42
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#0f172a"),
        alignment=1
    )
    
    sub_title_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#2563eb"),
        alignment=1
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=8,
        spaceAfter=4
    )
    
    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor("#1e3a8a"),
        spaceBefore=6,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.2,
        textColor=colors.HexColor("#334155")
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=11.8,
        textColor=colors.HexColor("#334155"),
        leftIndent=12
    )

    caption_style = ParagraphStyle(
        'Caption',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.HexColor("#0f172a")
    )

    caption_desc = ParagraphStyle(
        'CaptionDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10,
        textColor=colors.HexColor("#475569")
    )

    meta_label = ParagraphStyle(
        'MetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#1e293b")
    )
    meta_val = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#334155")
    )

    story = []

    # ==================== PAGE 1 ====================
    story.append(Paragraph("TAILORMATE", title_style))
    story.append(Paragraph("TAILORING ORDER MANAGEMENT SYSTEM", sub_title_style))
    story.append(Spacer(1, 4))
    
    # Metadata card table
    meta_data = [
        [Paragraph("<b>Author / Student:</b>", meta_label), Paragraph("<b>AKIY HUMPHERY</b>", meta_val),
         Paragraph("<b>Project:</b>", meta_label), Paragraph("TailorMate (Level 3 Defense)", meta_val)],
        [Paragraph("<b>Interviewed Tailor:</b>", meta_label), Paragraph("Salimatou Alias Mami Sally", meta_val),
         Paragraph("<b>Location:</b>", meta_label), Paragraph("Grand Baobab, Wasa Lamba", meta_val)],
        [Paragraph("<b>Workshop Contact:</b>", meta_label), Paragraph("(+237) 676 608 447", meta_val),
         Paragraph("<b>Evaluation Date:</b>", meta_label), Paragraph("September 2026", meta_val)]
    ]
    meta_table = Table(meta_data, colWidths=[110, 150, 100, 163])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("PAGE 1 — PRESENTATION OF THE PROJECT", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("1. Introduction & Context", h2_style))
    story.append(Paragraph(
        "<b>TailorMate</b> is a specialized web-based order and production management system engineered to streamline "
        "daily tailoring shop operations. Small-scale garment workshops play a central economic and cultural role, yet most "
        "rely exclusively on physical ledger books, informal paper notes, or personal memory. "
        "The project was initiated following field research and direct interviews with a practicing tailor, "
        "<b>Salimatou Alias Mami Sally</b>, operating at Grand Baobab, Wasa Lamba. "
        "The primary purpose of TailorMate is to provide an intuitive digital hub uniting customer records, garment orders, "
        "anatomical body measurements, financial balances, and staff assignments in one dependable platform.",
        body_style
    ))
    story.append(Spacer(1, 6))

    story.append(Paragraph("2. Project Objectives", h2_style))
    story.append(Paragraph("The design of TailorMate is driven by practical operational targets:", body_style))
    story.append(Paragraph("• <b>Customer Repository:</b> Quickly register and search client profiles and phone numbers.", bullet_style))
    story.append(Paragraph("• <b>Order & Item Lifecycle:</b> Track orders broken down into multiple garments (shirts, trousers, caps).", bullet_style))
    story.append(Paragraph("• <b>Digital Sizing Vault:</b> Store and recall historical measurements without remeasuring.", bullet_style))
    story.append(Paragraph("• <b>Financial Accountability:</b> Record advance deposits and calculate outstanding balances in FCFA.", bullet_style))
    story.append(Paragraph("• <b>Workforce Coordination:</b> Assign specific garment tasks (cutting, sewing, finishing) to shop workers.", bullet_style))
    story.append(Paragraph("• <b>Proactive Deadline Alerts:</b> Highlight unfinished garments approaching agreed pickup dates.", bullet_style))
    story.append(Paragraph("• <b>Service Excellence:</b> Eliminate customer disputes, forgotten orders, and delivery delays.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("3. Profile of the Field Partner", h2_style))
    story.append(Paragraph(
        "The empirical requirements for this project were gathered directly from <b>Salimatou Alias Mami Sally</b>. "
        "Operating as a sole proprietor in an active artisan workshop at Grand Baobab, Wasa Lamba (Tel: 676 608 447), "
        "her business handles substantial garment turnover with apprentice assistants. Her detailed account of daily administrative "
        "struggles served as the functional specification for the system.",
        body_style
    ))

    # ==================== PAGE 2 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 2 — PROBLEM STATEMENT & FIELD ANALYSIS", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("4. Real-World Problems Identified by the Tailor", h2_style))
    story.append(Paragraph(
        "Through on-site observation and interviews with Salimatou Alias Mami Sally, two fundamental "
        "operational bottlenecks were identified as threatening workshop profitability and reputation:",
        body_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>A. Critical Difficulty Tracking Garment Delivery Deadlines:</b>", body_style))
    story.append(Paragraph(
        "As customer orders accumulate, particularly during peak seasons (weddings, back-to-school, and holidays), "
        "relying on memory or scattered paper logs makes it impossible to maintain a reliable delivery schedule. "
        "New expedited orders arrive while earlier garments are in various intermediate stages of cutting or assembly. "
        "Without an automated timeline, the workshop frequently misjudges priorities, leaving garments untouched until the "
        "client physically arrives to collect them.",
        body_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>B. Ineffective Task Dispatch and Lack of Staff Accountability:</b>", body_style))
    story.append(Paragraph(
        "In a busy atelier with multiple assistants and apprentices, work is divided across specialized steps. "
        "The chief tailor reported significant difficulty knowing in real time:",
        body_style
    ))
    story.append(Paragraph("• Which worker is currently handling which specific garment.", bullet_style))
    story.append(Paragraph("• Whether fabric has already been cut, partially assembled, or finished.", bullet_style))
    story.append(Paragraph("• Which pending items are already past or near their delivery date.", bullet_style))
    story.append(Paragraph("• Who is accountable when a garment is delayed, misplaced, or assembled incorrectly.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("5. Negative Consequences for the Business", h2_style))
    story.append(Paragraph(
        "These unmanaged bottlenecks trigger severe compounding problems across the tailoring shop:",
        body_style
    ))
    story.append(Paragraph("• <b>Chronic Delivery Delays:</b> Customers arrive on promised dates only to find fabrics unsewn.", bullet_style))
    story.append(Paragraph("• <b>Erosion of Customer Trust:</b> Arguments and damaged goodwill lead to lost clientele.", bullet_style))
    story.append(Paragraph("• <b>Financial & Cash Flow Disputes:</b> Confusion regarding cash advances versus remaining balances in FCFA.", bullet_style))
    story.append(Paragraph("• <b>Operational Chaos & Wasted Hours:</b> Constant interruption to search for lost paper slips or fabrics.", bullet_style))
    story.append(Paragraph("• <b>Excessive Stress on the Chief Tailor:</b> Heavy mental fatigue attempting to memorize dozens of deadlines.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("6. Rationale for a Computerized Solution", h2_style))
    story.append(Paragraph(
        "A physical paper notebook cannot calculate days remaining, sort jobs by urgency, or alert a team when a deadline "
        "is 24 hours away. TailorMate converts these vulnerable paper routines into an automated, relational database system "
        "that enforces order, visibility, and accountability across every workstation in the atelier.",
        body_style
    ))

    # ==================== PAGE 3 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 3 — PROPOSED SOLUTION & SYSTEM ARCHITECTURE", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("7. The TailorMate Digital Solution", h2_style))
    story.append(Paragraph(
        "To resolve each difficulty identified by Salimatou Alias Mami Sally, TailorMate implements a modular, "
        "database-backed system architecture designed around the tailor's natural workflow:",
        body_style
    ))
    story.append(Spacer(1, 4))

    sol_data = [
        [
            Paragraph("<b>Module</b>", meta_label),
            Paragraph("<b>Key Capabilities</b>", meta_label),
            Paragraph("<b>Direct Problem Solved</b>", meta_label)
        ],
        [
            Paragraph("<b>Customer Management</b>", meta_label),
            Paragraph("Fast profile lookup, telephone registry, physical address, and historical customer preferences.", body_style),
            Paragraph("Eliminates misplaced client phone numbers and misidentified customer identities.", body_style)
        ],
        [
            Paragraph("<b>Order & Item Breakdown</b>", meta_label),
            Paragraph("Supports multi-item orders (e.g. 2 shirts, 2 trousers, 1 cap) with unit prices and individual progress states.", body_style),
            Paragraph("Prevents mixing up garments belonging to the same order; guarantees exact items requested are produced.", body_style)
        ],
        [
            Paragraph("<b>Digital Sizing Vault</b>", meta_label),
            Paragraph("Secure storage of full anatomical measurements (neck, chest, waist, hips, sleeve, inseam) with timestamps.", body_style),
            Paragraph("Stops lost paper notebooks; enables repeat orders without demanding the customer remeasure.", body_style)
        ],
        [
            Paragraph("<b>Payment Tracking</b>", meta_label),
            Paragraph("Real-time balance computation in FCFA: Total Order Cost − Advance Deposit = Balance Due on Collection.", body_style),
            Paragraph("Resolves payment disputes; ensures garments are never handed over without full financial settlement.", body_style)
        ],
        [
            Paragraph("<b>Staff Delegation</b>", meta_label),
            Paragraph("Chief tailor assigns specialized tasks (Cutting, Sewing, Finishing) to named team members (Michael, Paul, David).", body_style),
            Paragraph("Eliminates confusion over who is working on what; establishes direct personal accountability.", body_style)
        ],
        [
            Paragraph("<b>Proactive Deadline Radar</b>", meta_label),
            Paragraph("Calculates days remaining; highlights incomplete orders due in 24–48 hours with dynamic color-coded badges.", body_style),
            Paragraph("Solves the chief tailor's primary headache by detecting delayed orders before the client arrives.", body_style)
        ]
    ]

    sol_table = Table(sol_data, colWidths=[90, 230, 203])
    sol_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")])
    ]))
    story.append(sol_table)
    story.append(Spacer(1, 6))

    story.append(Paragraph("8. The Operational Workflow of TailorMate", h2_style))
    story.append(Paragraph(
        "<b>Customer Intake</b> → <b>Measurement Lookup / Entry</b> → <b>Order Itemization</b> → "
        "<b>Advance Deposit (FCFA)</b> → <b>Staff Task Assignment</b> → <b>Real-Time Progress Tracking</b> → "
        "<b>Deadline Alert Verification</b> → <b>Final Payment & Pickup</b>",
        body_style
    ))

    # ==================== PAGE 4 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 4 — SYSTEM DEMONSTRATION & HOW IT SOLVES THE PROBLEM", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=5, spaceBefore=2))

    # 4 Figure screenshots + explanations in 2x2 grid
    # Check images
    img_w, img_h = 240, 110

    def get_flowable_image(path, w, h):
        if os.path.exists(path):
            return RLImage(path, width=w, height=h)
        return Paragraph(f"<b>[Screenshot: {os.path.basename(path)}]</b>", body_style)

    f1_img = get_flowable_image(dash_img, img_w, img_h)
    f2_img = get_flowable_image(order_img, img_w, img_h)
    f3_img = get_flowable_image(staff_img, img_w, img_h)
    f4_img = get_flowable_image(deliver_img, img_w, img_h)

    fig_grid_data = [
        [
            f1_img,
            f2_img
        ],
        [
            Paragraph("<b>Figure 1: Chief Tailor Dashboard & Deadline Radar</b><br/>"
                      "<b>How it solves the problem:</b> Provides an instant bird's-eye view of active orders, urgent deadlines, and payments. "
                      "Eliminates memory lapses by flagging garments due today or tomorrow before customers arrive.", caption_desc),
            Paragraph("<b>Figure 2: Order Intake & Garment Itemization</b><br/>"
                      "<b>How it solves the problem:</b> Itemizes shirts, trousers, and accessories with prices and delivery dates. "
                      "Ensures staff never omit a clothing item belonging to a customer's package.", caption_desc)
        ],
        [
            f3_img,
            f4_img
        ],
        [
            Paragraph("<b>Figure 3: Staff Assignment & Workshop Coordination</b><br/>"
                      "<b>How it solves the problem:</b> Assigns cutting, sewing, and finishing tasks to specific assistants. "
                      "Guarantees total accountability and removes bottlenecks across workshop workstations.", caption_desc),
            Paragraph("<b>Figure 4: On-Time Delivery & Payment Settlement</b><br/>"
                      "<b>How it solves the problem:</b> Automatically reconciles advances and balances in FCFA upon collection. "
                      "Protects revenue and builds lasting client trust through prompt, reliable fulfillment.", caption_desc)
        ]
    ]

    fig_table = Table(fig_grid_data, colWidths=[255, 255])
    fig_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(fig_table)
    story.append(Spacer(1, 4))

    story.append(Paragraph("9. Conclusion", h2_style))
    story.append(Paragraph(
        "TailorMate successfully bridges the gap between traditional tailoring craftsmanship and modern digital efficiency. "
        "By tackling the exact field challenges articulated by Salimatou Alias Mami Sally—specifically unreliable deadline monitoring "
        "and uncoordinated staff dispatching—the application establishes operational rigor in the workshop. "
        "TailorMate demonstrates that a targeted, database-driven system drastically cuts administrative confusion, "
        "secures financial margins, and ensures clients receive perfectly tailored garments on schedule.",
        body_style
    ))
    story.append(Spacer(1, 3))

    story.append(Paragraph("10. Future Perspectives", h2_style))
    story.append(Paragraph(
        "Future releases will incorporate automated WhatsApp / SMS ready-for-collection alerts, mobile offline PWA caching, "
        "and multi-branch management for expanding ateliers across Cameroon.",
        body_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated: {filename}")


def build_french_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=42
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitleFR',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=23,
        textColor=colors.HexColor("#0f172a"),
        alignment=1
    )
    
    sub_title_style = ParagraphStyle(
        'DocSubTitleFR',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#2563eb"),
        alignment=1
    )
    
    h1_style = ParagraphStyle(
        'H1FR',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=8,
        spaceAfter=4
    )
    
    h2_style = ParagraphStyle(
        'H2FR',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor("#1e3a8a"),
        spaceBefore=6,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyFR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.2,
        textColor=colors.HexColor("#334155")
    )
    
    bullet_style = ParagraphStyle(
        'BulletFR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=11.8,
        textColor=colors.HexColor("#334155"),
        leftIndent=12
    )

    caption_desc = ParagraphStyle(
        'CaptionDescFR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10,
        textColor=colors.HexColor("#475569")
    )

    meta_label = ParagraphStyle(
        'MetaLabelFR',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#1e293b")
    )
    meta_val = ParagraphStyle(
        'MetaValFR',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#334155")
    )

    story = []

    # ==================== PAGE 1 ====================
    story.append(Paragraph("TAILORMATE", title_style))
    story.append(Paragraph("SYSTÈME DE GESTION DES COMMANDES DE COUTURE", sub_title_style))
    story.append(Spacer(1, 4))
    
    meta_data = [
        [Paragraph("<b>Auteur / Étudiant :</b>", meta_label), Paragraph("<b>AKIY HUMPHERY</b>", meta_val),
         Paragraph("<b>Projet :</b>", meta_label), Paragraph("TailorMate (Soutenance Niveau 3)", meta_val)],
        [Paragraph("<b>Artisane Interviewée :</b>", meta_label), Paragraph("Salimatou Alias Mami Sally", meta_val),
         Paragraph("<b>Localisation :</b>", meta_label), Paragraph("Grand Baobab, Wasa Lamba", meta_val)],
        [Paragraph("<b>Contact Atelier :</b>", meta_label), Paragraph("(+237) 676 608 447", meta_val),
         Paragraph("<b>Date d'Évaluation :</b>", meta_label), Paragraph("Septembre 2026", meta_val)]
    ]
    meta_table = Table(meta_data, colWidths=[110, 150, 105, 158])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("PAGE 1 — PRÉSENTATION DU PROJET", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("1. Introduction & Contexte", h2_style))
    story.append(Paragraph(
        "<b>TailorMate</b> est une application web conçue pour professionnaliser et optimiser la gestion quotidienne "
        "des ateliers de confection vestimentaire. En dépit de leur rôle économique prépondérant, la quasi-totalité des artisans couturiers "
        "gèrent encore leurs activités à l'aide de cahiers en papier, de morceaux de feuilles volantes ou de simples souvenirs. "
        "Ce projet a été initié à la suite d'une enquête de terrain auprès d'une artisane en exercice, "
        "<b>Salimatou Alias Mami Sally</b>, établie à Grand Baobab, Wasa Lamba. "
        "L'objectif de TailorMate est d'offrir une plateforme numérique unique regroupant la gestion des clients, des commandes, "
        "des fiches de mesures corporelles, des paiements en FCFA et de la répartition du travail entre collaborateurs.",
        body_style
    ))
    story.append(Spacer(1, 6))

    story.append(Paragraph("2. Objectifs Poursuivis", h2_style))
    story.append(Paragraph("Le développement de TailorMate répond à des objectifs opérationnels précis :", body_style))
    story.append(Paragraph("• <b>Répertoire Clientèle :</b> Enregistrer et retrouver instantanément les coordonnées des clients.", bullet_style))
    story.append(Paragraph("• <b>Gestion Détaillée des Commandes :</b> Décomposer chaque commande en articles distincts (chemises, pantalons).", bullet_style))
    story.append(Paragraph("• <b>Coffre-fort des Mensurations :</b> Archiver numériquement les mesures corporelles pour réutilisation.", bullet_style))
    story.append(Paragraph("• <b>Comptabilité des Règlements :</b> Suivre les avances perçues et calculer automatiquement le solde dû en FCFA.", bullet_style))
    story.append(Paragraph("• <b>Coordination de l'Équipe :</b> Assigner les tâches (coupe, couture, finitions) aux ouvriers de l'atelier.", bullet_style))
    story.append(Paragraph("• <b>Radar des Échéances :</b> Alerter automatiquement sur les commandes inachevées approchant de leur délai.", bullet_style))
    story.append(Paragraph("• <b>Qualité de Service :</b> Éradiquer les retards de livraison, les habits égarés et les litiges financiers.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("3. Présentation de la Professionnelle Interviewée", h2_style))
    story.append(Paragraph(
        "Les exigences fonctionnelles du système ont été établies directement lors d'entretiens approfondis avec "
        "<b>Salimatou Alias Mami Sally</b>. Propriétaire d'un atelier artisanal très sollicité à Grand Baobab, Wasa Lamba "
        "(Tél : 676 608 447), elle supervise plusieurs apprentis. Son partage d'expérience quant aux blocages quotidiens "
        "a constitué le cahier des charges authentique de cette solution logicielle.",
        body_style
    ))

    # ==================== PAGE 2 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 2 — PROBLÉMATIQUE IDENTIFIÉE & ANALYSE DE TERRAIN", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("4. Difficultés Réelles Exprimées par l'Artisane", h2_style))
    story.append(Paragraph(
        "L'observation in situ du fonctionnement de l'atelier de Salimatou Alias Mami Sally a mis en exergue "
        "deux dysfonctionnements structurels majeurs :",
        body_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>A. Difficulté Critique dans le Respect des Délais de Livraison :</b>", body_style))
    story.append(Paragraph(
        "Lorsque le volume de commandes augmente, notamment en périodes de cérémonies, de fêtes ou de rentrées scolaires, "
        "l'usage exclusif de la mémoire ou de calepins papier rend le respect des dates convenues quasi impossible. "
        "De nouvelles commandes urgentes s'intercalent alors que d'anciens travaux sont encore en phase de coupe. "
        "Sans calendrier automatisé, l'artisane découvre souvent qu'un vêtement n'a pas été cousu au moment précis où le client franchit le seuil de l'atelier.",
        body_style
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>B. Mauvaise Répartition et Absence de Traçabilité des Tâches :</b>", body_style))
    story.append(Paragraph(
        "Dans un atelier employant plusieurs apprentis et couturiers, le travail est fractionné. La responsable éprouvait une grande peine à savoir :",
        body_style
    ))
    story.append(Paragraph("• Quel ouvrier a la charge d'un habit donné à un instant précis.", bullet_style))
    story.append(Paragraph("• L'état exact d'avancement (tissu coupé, assemblé, repassé ou en attente).", bullet_style))
    story.append(Paragraph("• Quels travaux approchent dangereusement de leur date de retrait.", bullet_style))
    story.append(Paragraph("• Qui porte la responsabilité en cas de travail mal exécuté ou de retard.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("5. Conséquences Préjudiciables pour l'Entreprise", h2_style))
    story.append(Paragraph(
        "Ces défaillances organisationnelles engendrent des conséquences directes sur la pérennité de l'atelier :",
        body_style
    ))
    story.append(Paragraph("• <b>Retards Chroniques :</b> Déception répétée des clients trouvant leurs habits non confectionnés.", bullet_style))
    story.append(Paragraph("• <b>Perte de Confiance :</b> Dégradation de l'image de marque et risque de désertion de la clientèle.", bullet_style))
    story.append(Paragraph("• <b>Litiges Financiers :</b> Malentendus récurrents sur les montants versés en avance et le solde en FCFA.", bullet_style))
    story.append(Paragraph("• <b>Temps Perdu :</b> Recherches fastidieuses dans des carnets abîmés pour retrouver des mesures corporelles.", bullet_style))
    story.append(Paragraph("• <b>Épuisement Mental :</b> Stress intense supporté par la couturière principale pour tout mémoriser.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("6. Nécessité d'une Solution Informatisée", h2_style))
    story.append(Paragraph(
        "Un support papier ne calcule pas les jours restants, ne classe pas les urgences par ordre de priorité et n'émet pas "
        "d'alerte visuelle 24 heures avant l'échéance. TailorMate apporte une base de données relationnelle robuste qui transforme "
        "cette gestion précaire en un processus fiable, fluide et transparent.",
        body_style
    ))

    # ==================== PAGE 3 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 3 — SOLUTION PROPOSÉE & ARCHITECTURE DU SYSTÈME", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=6, spaceBefore=2))

    story.append(Paragraph("7. Les Modules Opérationnels de TailorMate", h2_style))
    story.append(Paragraph(
        "Pour résoudre point par point chaque problème exprimé par Salimatou Alias Mami Sally, "
        "TailorMate articule des modules interconnectés adaptés au quotidien du tailleur :",
        body_style
    ))
    story.append(Spacer(1, 4))

    sol_data_fr = [
        [
            Paragraph("<b>Module</b>", meta_label),
            Paragraph("<b>Fonctionnalités Clés</b>", meta_label),
            Paragraph("<b>Problème Résolu sur le Terrain</b>", meta_label)
        ],
        [
            Paragraph("<b>Gestion Clientèle</b>", meta_label),
            Paragraph("Fiche complète (Nom, Téléphone, Quartier, Notes de style). Recherche instantanée.", body_style),
            Paragraph("Évite la perte des contacts et permet de joindre rapidement le client.", body_style)
        ],
        [
            Paragraph("<b>Commandes & Articles</b>", meta_label),
            Paragraph("Décomposition multi-pièces (ex : 2 chemises, 2 pantalons, 1 toque) avec prix et statuts propres.", body_style),
            Paragraph("Supprime le mélange des pièces d'un même client et garantit la conformité de la commande.", body_style)
        ],
        [
            Paragraph("<b>Coffre des Mesures</b>", meta_label),
            Paragraph("Archivage numérique complet (cou, poitrine, taille, hanches, manches, entrejambe) avec date.", body_style),
            Paragraph("Fini les cahiers égarés : les mesures sont réutilisables instantanément à chaque retour du client.", body_style)
        ],
        [
            Paragraph("<b>Suivi des Paiements</b>", meta_label),
            Paragraph("Comptabilité automatique en FCFA : Prix Total − Acompte Perçu = Reste à Payer lors du retrait.", body_style),
            Paragraph("Met fin aux contestations financières ; assure le recouvrement total avant remise du vêtement.", body_style)
        ],
        [
            Paragraph("<b>Attribution d'Équipe</b>", meta_label),
            Paragraph("Délégation nominative des étapes (Coupe, Couture, Finitions) aux ouvriers (Michel, Paul, David).", body_style),
            Paragraph("Responsabilise le personnel et permet de savoir exactement qui s'occupe de chaque habit.", body_style)
        ],
        [
            Paragraph("<b>Surveillance des Délais</b>", meta_label),
            Paragraph("Décompte automatique des jours ; alerte colorée prioritaire pour les commandes dues sous 24h à 48h.", body_style),
            Paragraph("Résout le problème n°1 de Mami Sally : prévenir les retards avant que le client n'arrive.", body_style)
        ]
    ]

    sol_table_fr = Table(sol_data_fr, colWidths=[90, 230, 203])
    sol_table_fr.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")])
    ]))
    story.append(sol_table_fr)
    story.append(Spacer(1, 6))

    story.append(Paragraph("8. Flux Opérationnel Linéaire de l'Atelier", h2_style))
    story.append(Paragraph(
        "<b>Accueil Client</b> → <b>Prise / Consultation Mesures</b> → <b>Enregistrement des Articles</b> → "
        "<b>Encaissement Acompte (FCFA)</b> → <b>Attribution aux Ouvriers</b> → <b>Suivi d'Avancement</b> → "
        "<b>Vérification Délais</b> → <b>Solde & Retrait Vêtement</b>",
        body_style
    ))

    # ==================== PAGE 4 ====================
    story.append(PageBreak())
    story.append(Paragraph("PAGE 4 — DÉMONSTRATION DU SYSTÈME & RÉSOLUTION DU PROBLÈME", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceAfter=5, spaceBefore=2))

    img_w, img_h = 240, 110
    f1_img = get_flowable_image(dash_img, img_w, img_h)
    f2_img = get_flowable_image(order_img, img_w, img_h)
    f3_img = get_flowable_image(staff_img, img_w, img_h)
    f4_img = get_flowable_image(deliver_img, img_w, img_h)

    fig_grid_data_fr = [
        [
            f1_img,
            f2_img
        ],
        [
            Paragraph("<b>Figure 1 : Tableau de Bord & Surveillance des Délais</b><br/>"
                      "<b>Comment cela résout le problème :</b> Offre une vision globale instantanée des commandes en cours et des échéances urgentes. "
                      "Élimine les oublis en signalant les habits à livrer aujourd'hui ou demain avant l'arrivée du client.", caption_desc),
            Paragraph("<b>Figure 2 : Enregistrement de Commande & Découpage d'Articles</b><br/>"
                      "<b>Comment cela résout le problème :</b> Détaille chaque habit (chemises, pantalons, toques) avec son prix et délai. "
                      "Garantit qu'aucun vêtement associé à la commande ne soit oublié lors de la confection.", caption_desc)
        ],
        [
            f3_img,
            f4_img
        ],
        [
            Paragraph("<b>Figure 3 : Affectation et Coordination du Personnel</b><br/>"
                      "<b>Comment cela résout le problème :</b> Assigne nominativement la coupe, la couture et les finitions aux ouvriers. "
                      "Assure une responsabilité totale et supprime les blocages au sein de l'atelier.", caption_desc),
            Paragraph("<b>Figure 4 : Livraison à Temps & Rapprochement Financier</b><br/>"
                      "<b>Comment cela résout le problème :</b> Calcule automatiquement les acomptes et soldes en FCFA au moment du retrait. "
                      "Protège les revenus de l'atelier et restaure la confiance client grâce à des livraisons ponctuelles.", caption_desc)
        ]
    ]

    fig_table_fr = Table(fig_grid_data_fr, colWidths=[255, 255])
    fig_table_fr.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(fig_table_fr)
    story.append(Spacer(1, 4))

    story.append(Paragraph("9. Conclusion Générale", h2_style))
    story.append(Paragraph(
        "TailorMate concilie avec succès le savoir-faire artisanal traditionnel et la rigueur du numérique. "
        "En répondant avec exactitude aux difficultés réelles exprimées par Salimatou Alias Mami Sally—notamment le suivi précaire des délais "
        "et le manque de coordination des collaborateurs—l'application transforme l'organisation de l'atelier. "
        "Ce projet démontre qu'une solution logicielle ciblée, adossée à une base de données relationnelle, élimine le stress des retards, "
        "sécurise les revenus et garantit la satisfaction durable de la clientèle.",
        body_style
    ))
    story.append(Spacer(1, 3))

    story.append(Paragraph("10. Perspectives d'Évolution", h2_style))
    story.append(Paragraph(
        "Les prochaines versions intègreront l'envoi d'alertes automatiques WhatsApp / SMS aux clients dès que leurs habits sont prêts, "
        "un mode hors-ligne mobile (PWA), ainsi que la gestion multi-boutiques pour les ateliers en expansion au Cameroun.",
        body_style
    ))

    doc.build(story, canvasmaker=NumberedCanvasFrench)
    print(f"Successfully generated: {filename}")


if __name__ == "__main__":
    out_en = os.path.join(BASE_DIR, "TailorMate_Report_English_Akiy_Humphery.pdf")
    out_fr = os.path.join(BASE_DIR, "TailorMate_Rapport_Francais_Akiy_Humphery.pdf")
    build_english_pdf(out_en)
    build_french_pdf(out_fr)
    print("ALL REPORTS GENERATED SUCCESSFULLY!")
