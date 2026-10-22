"""Builds the downloadable ERP RFP template (ES and EN).

    python scripts/build-rfp-template.py

Writes public/descargas/plantilla-rfp-erp.xlsx and
public/descargas/erp-rfp-template.xlsx, linked from the ERP articles in
/perspectivas. Re-run after editing the copy below and commit both files.

The workbook is a structure, not data: it carries no vendor figures, no
"typical" weights and no durations. Weights, scores and costs are always
entered by the company. The seven evaluation criteria and the seven process
steps are the ones in Cyrrus's own ERP guide (que-es-un-erp-guia-para-elegirlo).
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "descargas"

NAVY = "0A1E3F"
BLUE = "1B6FC2"
LIGHT = "E8F1FB"
THIN = Side(style="thin", color="C9D3E0")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
INPUT = PatternFill("solid", fgColor="FFF8DC")

COPY = {
    "es": {
        "file": "plantilla-rfp-erp.xlsx",
        "title": "Solicitud de propuesta (RFP) para un ERP",
        "by": "Plantilla de Cyrrus Consulting Services · cyrruscs.com",
        "guide": "cyrruscs.com/perspectivas/que-es-un-erp-guia-para-elegirlo",
        "priority": "Obligatorio,Deseable,Informativo",
        "answer": "Estándar,Configuración,Personalización,No cumple,No responde",
        "status": "Pendiente,En curso,Hecho",
        "vendor": "Proveedor",
        "comments": "Comentarios",
        "instr_title": "Cómo usar esta plantilla",
        "instructions": [
            "Esta plantilla es una estructura: no trae pesos, precios ni plazos de ejemplo. Complete las celdas amarillas con los datos de su empresa y de las propuestas recibidas.",
            "1. Empresa y alcance: describa el problema de negocio, el alcance y las restricciones. Es la primera hoja que reciben los proveedores.",
            "2. Funcionales: liste los requerimientos por módulo y clasifíquelos como Obligatorio, Deseable o Informativo. Cada proveedor responde si lo cubre de forma estándar, con configuración, con personalización o no lo cubre.",
            "3. Técnicos y local: arquitectura, seguridad, integraciones y requisitos fiscales, contables y legales de cada país donde opera.",
            "4. Costo total: pida a cada proveedor el mismo alcance, desglosado por concepto y proyectado al mismo número de años. La hoja suma el total por proveedor.",
            "5. Evaluación: asigne el peso de cada criterio (deben sumar 100) y califique de 1 a 5 a cada proveedor. La hoja calcula la puntuación ponderada.",
            "6. Calendario: siga las etapas del proceso y asigne responsables y fechas.",
            "7. Referencias: registre las llamadas a clientes de cada proveedor y lo que encontró.",
            "",
            "Escala sugerida de calificación: 1 = no cumple; 2 = cumple de forma limitada; 3 = cumple con personalización; 4 = cumple con configuración; 5 = cumple de forma estándar.",
            "Los pesos los define su comité de dirección antes de abrir las propuestas, para que no se ajusten al proveedor favorito.",
            "",
            "Más contexto en la guía: cyrruscs.com/perspectivas/que-es-un-erp-guia-para-elegirlo",
        ],
        "company_sheet": "1. Empresa y alcance",
        "company_headers": ["Pregunta", "Respuesta"],
        "company": [
            "Nombre de la empresa", "Industria y tamaño (empleados, ingresos)", "Problema de negocio que se quiere resolver",
            "Objetivos medibles (con su línea base de hoy)", "Alcance: módulos y procesos", "Países y sedes donde se usará",
            "Número de usuarios previstos (por tipo)", "Sistemas actuales a reemplazar o con los que se debe integrar",
            "Modelo de despliegue preferido (nube, local o sin preferencia)", "Fecha objetivo de salida en vivo",
            "Presupuesto aprobado (si se comparte con los proveedores)", "Patrocinador ejecutivo", "Contacto del proceso",
            "Fecha límite para entregar la propuesta",
        ],
        "func_sheet": "2. Funcionales",
        "func_headers": ["ID", "Módulo", "Requerimiento", "Prioridad", "Proveedor A", "Proveedor B", "Proveedor C", "Comentarios"],
        "modules": ["Finanzas y contabilidad", "Compras y proveedores", "Inventarios y logística", "Ventas y facturación", "Producción", "Recursos humanos y nómina"],
        "func_prefix": "F",
        "tech_sheet": "3. Técnicos y local",
        "tech_headers": ["ID", "Tema", "Requerimiento", "Prioridad", "Proveedor A", "Proveedor B", "Proveedor C", "Comentarios"],
        "tech_topics": [
            "Arquitectura y despliegue", "Seguridad y permisos por rol", "Trazabilidad y auditoría", "Integración con los sistemas existentes",
            "Capacidad de crecimiento", "Requisitos fiscales, contables y legales por país", "Facturación electrónica", "Idiomas y monedas",
        ],
        "tech_prefix": "T",
        "cost_sheet": "4. Costo total",
        "cost_title": "Costo total de propiedad por proveedor",
        "cost_params": ["Moneda de todas las cifras", "Horizonte en años (igual para todos)"],
        "cost_headers": ["Concepto", "Proveedor A", "Proveedor B", "Proveedor C", "Supuestos y notas"],
        "cost_items": [
            "Licencias o suscripción", "Implementación", "Personalización", "Integraciones", "Migración de datos",
            "Infraestructura", "Soporte y actualizaciones", "Capacitación", "Complementos y módulos adicionales",
            "Tiempo del equipo interno", "Otros",
        ],
        "cost_total": "Total",
        "eval_sheet": "5. Evaluación",
        "eval_title": "Matriz de evaluación ponderada",
        "eval_headers": ["Criterio", "Peso (%)", "Proveedor A (1-5)", "Proveedor B (1-5)", "Proveedor C (1-5)", "Ponderado A", "Ponderado B", "Ponderado C"],
        "criteria": [
            "Ajuste funcional", "Ajuste técnico", "Costo total de propiedad", "Sostenibilidad del proveedor",
            "Capacidad de implementación", "Facilidad de adopción", "Cobertura local",
        ],
        "eval_total": "Puntuación total",
        "eval_weights": "Suma de pesos (debe ser 100)",
        "eval_ok": "Los pesos suman 100",
        "eval_bad": "Los pesos no suman 100",
        "cal_sheet": "6. Calendario",
        "cal_headers": ["Etapa", "Responsable", "Fecha de inicio", "Fecha de fin", "Estado"],
        "stages": [
            "Definir el problema y los objetivos del negocio", "Levantar y priorizar los requerimientos con las áreas",
            "Construir una lista de opciones del mercado", "Enviar la solicitud de propuesta (RFP) con los mismos criterios a todos",
            "Evaluar propuestas y demostraciones con la matriz ponderada", "Verificar referencias", "Negociar y contratar",
        ],
        "ref_sheet": "7. Referencias",
        "ref_headers": ["Proveedor", "Cliente de referencia", "Industria y tamaño", "País", "Contacto", "Fecha de la llamada", "Lo que encontramos"],
    },
    "en": {
        "file": "erp-rfp-template.xlsx",
        "title": "Request for proposal (RFP) for an ERP",
        "by": "Template by Cyrrus Consulting Services · cyrruscs.com",
        "guide": "cyrruscs.com/en/perspectivas/que-es-un-erp-guia-para-elegirlo",
        "priority": "Mandatory,Desirable,Informational",
        "answer": "Standard,Configuration,Customization,Not met,No answer",
        "status": "Pending,In progress,Done",
        "vendor": "Vendor",
        "comments": "Comments",
        "instr_title": "How to use this template",
        "instructions": [
            "This template is a structure: it carries no sample weights, prices or timelines. Fill in the yellow cells with your company's data and the proposals you receive.",
            "1. Company and scope: describe the business problem, the scope and the constraints. It is the first sheet vendors receive.",
            "2. Functional: list requirements by module and classify them as Mandatory, Desirable or Informational. Each vendor answers whether it covers each one as standard, through configuration, through customization or not at all.",
            "3. Technical and local: architecture, security, integrations and the tax, accounting and legal requirements of each country where you operate.",
            "4. Total cost: ask each vendor for the same scope, broken down by item and projected over the same number of years. The sheet adds up the total per vendor.",
            "5. Evaluation: set each criterion's weight (they must add up to 100) and score each vendor from 1 to 5. The sheet calculates the weighted score.",
            "6. Calendar: follow the process stages and assign owners and dates.",
            "7. References: record the calls to each vendor's customers and what you found.",
            "",
            "Suggested scoring scale: 1 = not met; 2 = limited coverage; 3 = met with customization; 4 = met with configuration; 5 = met as standard.",
            "Your leadership committee should set the weights before opening the proposals, so they aren't tuned to a favorite vendor.",
            "",
            "More context in the guide: cyrruscs.com/en/perspectivas/que-es-un-erp-guia-para-elegirlo",
        ],
        "company_sheet": "1. Company and scope",
        "company_headers": ["Question", "Answer"],
        "company": [
            "Company name", "Industry and size (employees, revenue)", "Business problem to solve",
            "Measurable goals (with today's baseline)", "Scope: modules and processes", "Countries and sites where it will be used",
            "Expected number of users (by type)", "Current systems to replace or integrate with",
            "Preferred deployment model (cloud, on-premise or no preference)", "Target go-live date",
            "Approved budget (if shared with vendors)", "Executive sponsor", "Process contact",
            "Deadline for submitting the proposal",
        ],
        "func_sheet": "2. Functional",
        "func_headers": ["ID", "Module", "Requirement", "Priority", "Vendor A", "Vendor B", "Vendor C", "Comments"],
        "modules": ["Finance and accounting", "Purchasing and suppliers", "Inventory and logistics", "Sales and invoicing", "Production", "Human resources and payroll"],
        "func_prefix": "F",
        "tech_sheet": "3. Technical and local",
        "tech_headers": ["ID", "Topic", "Requirement", "Priority", "Vendor A", "Vendor B", "Vendor C", "Comments"],
        "tech_topics": [
            "Architecture and deployment", "Security and role-based permissions", "Traceability and audit", "Integration with existing systems",
            "Capacity to grow", "Tax, accounting and legal requirements by country", "E-invoicing", "Languages and currencies",
        ],
        "tech_prefix": "T",
        "cost_sheet": "4. Total cost",
        "cost_title": "Total cost of ownership by vendor",
        "cost_params": ["Currency of all figures", "Horizon in years (same for all)"],
        "cost_headers": ["Item", "Vendor A", "Vendor B", "Vendor C", "Assumptions and notes"],
        "cost_items": [
            "Licenses or subscription", "Implementation", "Customization", "Integrations", "Data migration",
            "Infrastructure", "Support and updates", "Training", "Add-ons and extra modules",
            "Internal team time", "Other",
        ],
        "cost_total": "Total",
        "eval_sheet": "5. Evaluation",
        "eval_title": "Weighted evaluation matrix",
        "eval_headers": ["Criterion", "Weight (%)", "Vendor A (1-5)", "Vendor B (1-5)", "Vendor C (1-5)", "Weighted A", "Weighted B", "Weighted C"],
        "criteria": [
            "Functional fit", "Technical fit", "Total cost of ownership", "Vendor sustainability",
            "Implementation capability", "Ease of adoption", "Local coverage",
        ],
        "eval_total": "Total score",
        "eval_weights": "Sum of weights (must be 100)",
        "eval_ok": "Weights add up to 100",
        "eval_bad": "Weights do not add up to 100",
        "cal_sheet": "6. Calendar",
        "cal_headers": ["Stage", "Owner", "Start date", "End date", "Status"],
        "stages": [
            "Define the problem and the business goals", "Gather and prioritize requirements with the areas",
            "Build a list of market options", "Send the request for proposal (RFP) with the same criteria to every vendor",
            "Evaluate proposals and demos with the weighted matrix", "Check references", "Negotiate and contract",
        ],
        "ref_sheet": "7. References",
        "ref_headers": ["Vendor", "Reference customer", "Industry and size", "Country", "Contact", "Call date", "What we found"],
    },
}


def header(ws, row, headers, widths):
    for col, h in enumerate(headers, start=1):
        cell = ws.cell(row=row, column=col, value=h)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor=BLUE)
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = BORDER
        ws.column_dimensions[cell.column_letter].width = widths[col - 1]
    ws.row_dimensions[row].height = 34


def title(ws, c, text):
    ws.sheet_view.showGridLines = False
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=16, color=NAVY)
    ws["A2"] = c["by"]
    ws["A2"].font = Font(italic=True, size=9, color="6B7A90")


def body_cell(ws, r, col, value=None, bold=False, input_cell=False):
    cell = ws.cell(row=r, column=col, value=value)
    cell.border = BORDER
    cell.alignment = Alignment(wrap_text=True, vertical="top")
    if bold:
        cell.font = Font(bold=True, color=NAVY)
    if input_cell:
        cell.fill = INPUT
    return cell


def dropdown(ws, formula, cells):
    dv = DataValidation(type="list", formula1=f'"{formula}"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(cells)


def build(lang: str) -> None:
    c = COPY[lang]
    wb = Workbook()
    wb.remove(wb.active)

    # --- instructions
    ws = wb.create_sheet("Instrucciones" if lang == "es" else "Instructions")
    title(ws, c, c["title"])
    ws.column_dimensions["A"].width = 120
    ws.cell(row=4, column=1, value=c["instr_title"]).font = Font(bold=True, size=12, color=NAVY)
    for i, line in enumerate(c["instructions"], start=5):
        cell = ws.cell(row=i, column=1, value=line)
        cell.alignment = Alignment(wrap_text=True, vertical="top")
        cell.font = Font(size=11, color="1F2937")

    # --- 1. company
    ws = wb.create_sheet(c["company_sheet"])
    title(ws, c, c["title"])
    header(ws, 4, c["company_headers"], [52, 80])
    ws.freeze_panes = "A5"
    for r, q in enumerate(c["company"], start=5):
        body_cell(ws, r, 1, q, bold=True)
        body_cell(ws, r, 2, None, input_cell=True)

    # --- 2 and 3: requirements sheets
    def requirements(sheet, headers, groups, prefix, per_group):
        ws = wb.create_sheet(sheet)
        title(ws, c, c["title"])
        header(ws, 4, headers, [8, 30, 60, 16, 16, 16, 16, 40])
        ws.freeze_panes = "A5"
        r = 5
        n = 1
        for g in groups:
            for _ in range(per_group):
                body_cell(ws, r, 1, f"{prefix}-{n:02d}", bold=True)
                body_cell(ws, r, 2, g)
                body_cell(ws, r, 3, None, input_cell=True)
                body_cell(ws, r, 4, None, input_cell=True)
                for col in (5, 6, 7, 8):
                    body_cell(ws, r, col, None, input_cell=True)
                r += 1
                n += 1
        last = r - 1
        dropdown(ws, c["priority"], f"D5:D{last}")
        dropdown(ws, c["answer"], f"E5:G{last}")

    requirements(c["func_sheet"], c["func_headers"], c["modules"], c["func_prefix"], 4)
    requirements(c["tech_sheet"], c["tech_headers"], c["tech_topics"], c["tech_prefix"], 2)

    # --- 4. total cost
    ws = wb.create_sheet(c["cost_sheet"])
    title(ws, c, c["cost_title"])
    for i, label in enumerate(c["cost_params"]):
        body_cell(ws, 4 + i, 1, label, bold=True)
        body_cell(ws, 4 + i, 2, None, input_cell=True)
    header(ws, 7, c["cost_headers"], [46, 22, 22, 22, 60])
    ws.freeze_panes = "A8"
    first = 8
    for r, item in enumerate(c["cost_items"], start=first):
        body_cell(ws, r, 1, item, bold=True)
        for col in (2, 3, 4):
            cell = body_cell(ws, r, col, None, input_cell=True)
            cell.number_format = "#,##0"
        body_cell(ws, r, 5, None, input_cell=True)
    last = first + len(c["cost_items"]) - 1
    total_row = last + 1
    body_cell(ws, total_row, 1, c["cost_total"], bold=True)
    for col, letter in ((2, "B"), (3, "C"), (4, "D")):
        cell = body_cell(ws, total_row, col, f"=SUM({letter}{first}:{letter}{last})", bold=True)
        cell.number_format = "#,##0"
        cell.fill = PatternFill("solid", fgColor=LIGHT)
    body_cell(ws, total_row, 5, None)

    # --- 5. evaluation
    ws = wb.create_sheet(c["eval_sheet"])
    title(ws, c, c["eval_title"])
    header(ws, 4, c["eval_headers"], [36, 12, 18, 18, 18, 16, 16, 16])
    ws.freeze_panes = "A5"
    first = 5
    for r, crit in enumerate(c["criteria"], start=first):
        body_cell(ws, r, 1, crit, bold=True)
        body_cell(ws, r, 2, None, input_cell=True)
        for col in (3, 4, 5):
            body_cell(ws, r, col, None, input_cell=True)
        for col, src in ((6, "C"), (7, "D"), (8, "E")):
            cell = body_cell(ws, r, col, f"=IF(OR($B{r}=\"\",{src}{r}=\"\"),0,$B{r}/100*{src}{r})")
            cell.number_format = "0.00"
    last = first + len(c["criteria"]) - 1
    score = DataValidation(type="whole", operator="between", formula1="1", formula2="5", allow_blank=True)
    ws.add_data_validation(score)
    score.add(f"C{first}:E{last}")
    weight = DataValidation(type="decimal", operator="between", formula1="0", formula2="100", allow_blank=True)
    ws.add_data_validation(weight)
    weight.add(f"B{first}:B{last}")
    total_row = last + 1
    body_cell(ws, total_row, 1, c["eval_total"], bold=True)
    body_cell(ws, total_row, 2, None)
    for col in (3, 4, 5):
        body_cell(ws, total_row, col, None)
    for col, letter in ((6, "F"), (7, "G"), (8, "H")):
        cell = body_cell(ws, total_row, col, f"=SUM({letter}{first}:{letter}{last})", bold=True)
        cell.number_format = "0.00"
        cell.fill = PatternFill("solid", fgColor=LIGHT)
    check = total_row + 2
    body_cell(ws, check, 1, c["eval_weights"], bold=True)
    body_cell(ws, check, 2, f"=SUM(B{first}:B{last})", bold=True)
    msg = ws.cell(row=check, column=3, value=f"=IF(B{check}=100,\"{c['eval_ok']}\",\"{c['eval_bad']}\")")
    msg.font = Font(bold=True, color=BLUE)

    # --- 6. calendar
    ws = wb.create_sheet(c["cal_sheet"])
    title(ws, c, c["title"])
    header(ws, 4, c["cal_headers"], [64, 24, 16, 16, 16])
    ws.freeze_panes = "A5"
    for r, stage in enumerate(c["stages"], start=5):
        body_cell(ws, r, 1, f"{r - 4}. {stage}", bold=True)
        body_cell(ws, r, 2, None, input_cell=True)
        for col in (3, 4):
            cell = body_cell(ws, r, col, None, input_cell=True)
            cell.number_format = "yyyy-mm-dd"
        body_cell(ws, r, 5, None, input_cell=True)
    dropdown(ws, c["status"], f"E5:E{4 + len(c['stages'])}")

    # --- 7. references
    ws = wb.create_sheet(c["ref_sheet"])
    title(ws, c, c["title"])
    header(ws, 4, c["ref_headers"], [22, 28, 26, 14, 28, 16, 60])
    ws.freeze_panes = "A5"
    for r in range(5, 5 + 12):
        for col in range(1, 8):
            body_cell(ws, r, col, None, input_cell=True)

    OUT.mkdir(parents=True, exist_ok=True)
    wb.properties.creator = "Cyrrus Consulting Services"
    wb.properties.title = c["title"]
    wb.save(OUT / c["file"])
    print(f"wrote public/descargas/{c['file']}")


if __name__ == "__main__":
    for lang in COPY:
        build(lang)
