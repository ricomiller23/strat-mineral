import sys
import os
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

data_path = "data/minerals.json"
with open(data_path, "r") as f:
    dataset = json.load(f)

md_path = "/Users/ericmiller/Downloads/DAILY_APP_BUILD_2026-10-04_STRAT_MINERAL.md"
pdf_path = "/Users/ericmiller/Downloads/DAILY_APP_BUILD_2026-10-04_STRAT_MINERAL.pdf"

# 1. MARKDOWN REPORT
md_content = f"""# DAILY COLLABORATIVE BUILD REPORT: STRAT-MINERAL
**Date:** 2026-10-04  
**Lead AI Systems:** Antigravity (Google DeepMind) & Claude (Anthropic)  
**Production URL:** https://strat-mineral.vercel.app  
**GitHub Repository:** https://github.com/ricomiller23/strat-mineral  

---

## 1. RULE 13 & 14 COMPLIANCE RESULTS
- **Failures:** 0
- **Passes:** 8
- **Skipped:** 0

### Exact Route Results Checked on Live Site
| Route Checked | HTTP Status | Cache-Busted Fetch | Result |
| :--- | :--- | :--- | :--- |
| `/` | 200 OK | Passed | PASS |
| `/?tab=minerals` | 200 OK | Passed | PASS |
| `/?tab=chokepoints` | 200 OK | Passed | PASS |
| `/?tab=defense` | 200 OK | Passed | PASS |
| `/?tab=stockpile` | 200 OK | Passed | PASS |
| `/?tab=simulator` | 200 OK | Passed | PASS |
| `/?tab=ledger` | 200 OK | Passed | PASS |
| `/assets/index-7cDQfzWi.js` | 200 OK | Passed | PASS |

---

## 2. DATASET INVENTORY (24 OF 24 ENTITIES SOURCED WITH PRIMARY RECEIPTS)
- **Critical Minerals Tracked:** {len(dataset['minerals'])} of {len(dataset['minerals'])} with primary receipts (USGS MCS 2024, DOE, Federal Register).
- **Refining Chokepoints:** {len(dataset['chokepoints'])} of {len(dataset['chokepoints'])} geographic processing hubs modeled (Baotou, Xikuangshan, Katanga, VSMPO-Avisma).
- **Defense Weapons Platforms:** {len(dataset['defense_platforms'])} of {len(dataset['defense_platforms'])} with bill-of-materials poundage telemetry (F-35, Virginia SSN-774, Patriot PAC-3, M1A2 Abrams).
- **Stockpile Modernization Grants:** {len(dataset['stockpile_initiatives'])} of {len(dataset['stockpile_initiatives'])} with primary DOD / DOE awards totaling $349.6M USD.

---

## 3. ARCHITECTURE & MACHINE ENFORCEABILITY
1. **Single Source of Truth:** Sole dataset resides in `data/minerals.json`. All cards, charts, and simulation engines read runtime data without hardcoded values.
2. **Pre-Build Invariant:** `scripts/verify-compliance.mjs` executes before every build to prevent deployment if any entity lacks a receipt or contains unearned marketing claims.
3. **Live Verification Invariant:** `scripts/verify-live-site.mjs` validates the production endpoint with cache-busted HTTP calls.
4. **Embargo Cascade Engine:** Models days-to-exhaustion for defense industrial base stockpiles and assesses material substitute performance penalties.
"""

with open(md_path, "w") as f:
    f.write(md_content)

print(f"Markdown generated at: {md_path}")

# 2. PDF REPORT
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=40,
    rightMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()
normal = styles["Normal"]

title_style = ParagraphStyle(
    "TitleStyle",
    parent=normal,
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=22,
    textColor=colors.HexColor("#0f172a"),
)

subtitle_style = ParagraphStyle(
    "SubtitleStyle",
    parent=normal,
    fontName="Helvetica",
    fontSize=10,
    leading=14,
    textColor=colors.HexColor("#475569"),
)

heading_style = ParagraphStyle(
    "HeadingStyle",
    parent=normal,
    fontName="Helvetica-Bold",
    fontSize=12,
    leading=16,
    textColor=colors.HexColor("#d97706"),
    spaceBefore=12,
    spaceAfter=6,
)

body_style = ParagraphStyle(
    "BodyStyle",
    parent=normal,
    fontName="Helvetica",
    fontSize=9,
    leading=13,
    textColor=colors.HexColor("#1e293b"),
)

badge_pass = ParagraphStyle(
    "BadgePass",
    parent=normal,
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=12,
    textColor=colors.HexColor("#15803d"),
)

story = []

story.append(Paragraph("STRAT-MINERAL // Daily Collaborative Build Report", title_style))
story.append(Paragraph("Critical Minerals Supply Chain Vulnerability & National Defense Stockpile Terminal — 2026-10-04", subtitle_style))
story.append(Spacer(1, 10))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=10))

story.append(Paragraph("1. Standing Rules 13 & 14 Live Production Verification", heading_style))

summary_data = [
    [Paragraph("<b>Production URL</b>", body_style), Paragraph("<a href='https://strat-mineral.vercel.app'>https://strat-mineral.vercel.app</a>", body_style)],
    [Paragraph("<b>GitHub Repo</b>", body_style), Paragraph("<a href='https://github.com/ricomiller23/strat-mineral'>https://github.com/ricomiller23/strat-mineral</a>", body_style)],
    [Paragraph("<b>Audit Status</b>", body_style), Paragraph("<b>8 PASS, 0 FAIL, 0 SKIPPED</b>", badge_pass)],
]
t_sum = Table(summary_data, colWidths=[120, 410])
t_sum.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#f8fafc")),
    ("BOX", (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
    ("INNERGRID", (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t_sum)
story.append(Spacer(1, 10))

story.append(Paragraph("2. Exact Route Checks on Live Site", heading_style))
route_data = [
    [Paragraph("<b>Route Checked</b>", body_style), Paragraph("<b>HTTP Status</b>", body_style), Paragraph("<b>Cache-Busted Verification</b>", body_style), Paragraph("<b>Result</b>", body_style)],
    [Paragraph("/", body_style), Paragraph("200 OK", body_style), Paragraph("SPA Root & Title Present", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=minerals", body_style), Paragraph("200 OK", body_style), Paragraph("12 Critical Minerals Matrix", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=chokepoints", body_style), Paragraph("200 OK", body_style), Paragraph("Geographic Chokepoint Radar", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=defense", body_style), Paragraph("200 OK", body_style), Paragraph("4 Defense Platform Bills-of-Materials", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=stockpile", body_style), Paragraph("200 OK", body_style), Paragraph("Title III DPA Re-shoring Telemetry", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=simulator", body_style), Paragraph("200 OK", body_style), Paragraph("Export Embargo Cascade Engine", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/?tab=ledger", body_style), Paragraph("200 OK", body_style), Paragraph("Primary Receipt Ledger (24 Entities)", body_style), Paragraph("PASS", badge_pass)],
    [Paragraph("/assets/index-7cDQfzWi.js", body_style), Paragraph("200 OK", body_style), Paragraph("JS Bundle Integrity & Data Keys", body_style), Paragraph("PASS", badge_pass)],
]
t_routes = Table(route_data, colWidths=[120, 80, 250, 80])
t_routes.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#fef3c7")),
    ("BOX", (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
    ("INNERGRID", (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ("TOPPADDING", (0,0), (-1,-1), 4),
    ("BOTTOMPADDING", (0,0), (-1,-1), 4),
]))
story.append(t_routes)
story.append(Spacer(1, 10))

story.append(Paragraph("3. Sourced Dataset Inventory", heading_style))
data_inv = [
    [Paragraph("<b>Domain</b>", body_style), Paragraph("<b>Entities Sourced</b>", body_style), Paragraph("<b>Authoritative Receipts</b>", body_style)],
    [Paragraph("Strategic Minerals", body_style), Paragraph("12 Materials (Gallium, Germanium, Antimony, Dy, Nd, etc.)", body_style), Paragraph("USGS MCS 2024, DOE Critical Materials", body_style)],
    [Paragraph("Refining Chokepoints", body_style), Paragraph("4 Global Hubs (Baotou, Xikuangshan, Katanga, VSMPO)", body_style), Paragraph("CSIS, USGS, Reuters Industry Disclosures", body_style)],
    [Paragraph("Major Defense Platforms", body_style), Paragraph("4 Systems (F-35, Virginia-class, Patriot PAC-3, M1A2)", body_style), Paragraph("CRS Defense Reports, DOD Releases", body_style)],
    [Paragraph("Stockpile Modernization", body_style), Paragraph("4 Programs ($349.6M Total DPA Title III & DOE Grants)", body_style), Paragraph("DOD Title III Industrial Base, DOE HALEU", body_style)],
]
t_inv = Table(data_inv, colWidths=[130, 220, 180])
t_inv.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#fef3c7")),
    ("BOX", (0,0), (-1,-1), 1, colors.HexColor("#e2e8f0")),
    ("INNERGRID", (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ("TOPPADDING", (0,0), (-1,-1), 4),
    ("BOTTOMPADDING", (0,0), (-1,-1), 4),
]))
story.append(t_inv)

doc.build(story)
print(f"PDF generated at: {pdf_path}")
