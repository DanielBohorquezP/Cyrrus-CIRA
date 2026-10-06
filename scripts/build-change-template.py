"""Builds the downloadable change-management plan template (ES and EN).

    python scripts/build-change-template.py

Writes public/descargas/plantilla-plan-gestion-del-cambio.xlsx and
public/descargas/change-management-plan-template.xlsx, linked from the
article /perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla.
Re-run after editing the copy below and commit both files.
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

COPY = {
    "es": {
        "file": "plantilla-plan-gestion-del-cambio.xlsx",
        "title": "Plan de gestión del cambio",
        "by": "Plantilla de Cyrrus Consulting Services · cyrruscs.com",
        "levels": "Alto,Medio,Bajo",
        "status": "Pendiente,En curso,Hecho",
        "adkar": "1 - No,2 - Parcial,3 - Sí",
        "sheets": [
            ("Instrucciones", None, [
                "Cómo usar esta plantilla",
                "1. Cambio: describa qué cambia, por qué y cómo se medirá el éxito. Si no cabe en dos frases, todavía no está claro.",
                "2. Impacto: para cada área o rol, anote qué cambia en su trabajo diario y qué tan fuerte es el impacto.",
                "3. Interesados: identifique quién patrocina, quién decide, quién se ve afectado y quién influye en los demás.",
                "4. Preparación: califique cada grupo en los cinco pasos del modelo ADKAR para saber dónde se atasca.",
                "5. Comunicación: defina qué mensaje, para quién, por qué canal, quién lo da y cuándo.",
                "6. Capacitación: planee la formación por rol y quiénes serán los usuarios clave que acompañen a sus compañeros.",
                "7. Resistencia: anticipe dónde aparecerá, su causa probable y quién la atiende.",
                "8. Adopción: mida el uso real después de la salida en vivo, no solo la asistencia a las capacitaciones.",
                "",
                "Más contexto en la guía: cyrruscs.com/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla",
            ]),
            ("1. Cambio", ["Pregunta", "Respuesta"], [
                ["¿Qué cambia?", ""],
                ["¿Por qué cambia? (problema u oportunidad del negocio)", ""],
                ["¿Qué pasa si no cambiamos?", ""],
                ["¿A quién afecta?", ""],
                ["¿Desde cuándo? (fechas clave)", ""],
                ["Patrocinador ejecutivo", ""],
                ["¿Cómo sabremos que funcionó? (indicadores de adopción)", ""],
            ]),
            ("2. Impacto", ["Área / rol", "N.º de personas", "Qué cambia en su trabajo", "Procesos", "Herramientas", "Responsabilidades", "Nivel de impacto"], []),
            ("3. Interesados", ["Nombre", "Cargo / área", "Rol en el cambio (patrocina, decide, afectado, influye)", "Nivel de influencia", "Postura actual", "Qué necesita de nosotros", "Responsable de la relación"], []),
            ("4. Preparación (ADKAR)", ["Grupo", "Conciencia (por qué)", "Deseo (quiere participar)", "Conocimiento (sabe cómo)", "Habilidad (lo hace en la práctica)", "Refuerzo (se sostiene)", "Primer paso bloqueado / acción"], []),
            ("5. Comunicación", ["Mensaje", "Audiencia", "Canal", "Quién lo comunica", "Fecha", "Retroalimentación esperada", "Estado"], []),
            ("6. Capacitación", ["Rol", "Contenido", "Formato (presencial, virtual, guía)", "Duración", "Fecha", "Usuario clave / multiplicador", "Estado"], []),
            ("7. Resistencia", ["Grupo o persona", "Señal observada", "Causa probable", "Riesgo para el proyecto", "Acción", "Responsable", "Estado"], []),
            ("8. Adopción", ["Indicador", "Cómo se mide", "Línea base", "Meta", "Resultado 30 días", "Resultado 90 días", "Acción de refuerzo"], []),
        ],
        "level_cols": {"2. Impacto": 7, "3. Interesados": 4},
        "status_cols": {"5. Comunicación": 7, "6. Capacitación": 7, "7. Resistencia": 7},
    },
    "en": {
        "file": "change-management-plan-template.xlsx",
        "title": "Change management plan",
        "by": "Template by Cyrrus Consulting Services · cyrruscs.com",
        "levels": "High,Medium,Low",
        "status": "Pending,In progress,Done",
        "adkar": "1 - No,2 - Partly,3 - Yes",
        "sheets": [
            ("Instructions", None, [
                "How to use this template",
                "1. Change: describe what is changing, why, and how success will be measured. If it doesn't fit in two sentences, it isn't clear yet.",
                "2. Impact: for each area or role, note what changes in their daily work and how strong the impact is.",
                "3. Stakeholders: identify who sponsors, who decides, who is affected and who influences others.",
                "4. Readiness: score each group on the five steps of the ADKAR model to see where it gets stuck.",
                "5. Communication: define which message, for whom, through which channel, who delivers it and when.",
                "6. Training: plan training by role and the key users who will support their peers.",
                "7. Resistance: anticipate where it will appear, its likely cause and who will address it.",
                "8. Adoption: measure real use after go-live, not just training attendance.",
                "",
                "More context in the guide: cyrruscs.com/en/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla",
            ]),
            ("1. Change", ["Question", "Answer"], [
                ["What is changing?", ""],
                ["Why is it changing? (business problem or opportunity)", ""],
                ["What happens if we don't change?", ""],
                ["Who does it affect?", ""],
                ["From when? (key dates)", ""],
                ["Executive sponsor", ""],
                ["How will we know it worked? (adoption indicators)", ""],
            ]),
            ("2. Impact", ["Area / role", "No. of people", "What changes in their work", "Processes", "Tools", "Responsibilities", "Impact level"], []),
            ("3. Stakeholders", ["Name", "Position / area", "Role in the change (sponsors, decides, affected, influences)", "Influence level", "Current stance", "What they need from us", "Relationship owner"], []),
            ("4. Readiness (ADKAR)", ["Group", "Awareness (why)", "Desire (wants to take part)", "Knowledge (knows how)", "Ability (does it in practice)", "Reinforcement (it sticks)", "First blocked step / action"], []),
            ("5. Communication", ["Message", "Audience", "Channel", "Who delivers it", "Date", "Expected feedback", "Status"], []),
            ("6. Training", ["Role", "Content", "Format (in person, online, guide)", "Duration", "Date", "Key user / multiplier", "Status"], []),
            ("7. Resistance", ["Group or person", "Observed signal", "Likely cause", "Risk to the project", "Action", "Owner", "Status"], []),
            ("8. Adoption", ["Indicator", "How it is measured", "Baseline", "Target", "Result at 30 days", "Result at 90 days", "Reinforcement action"], []),
        ],
        "level_cols": {"2. Impact": 7, "3. Stakeholders": 4},
        "status_cols": {"5. Communication": 7, "6. Training": 7, "7. Resistance": 7},
    },
}

EMPTY_ROWS = 15


def build(lang: str) -> None:
    c = COPY[lang]
    wb = Workbook()
    wb.remove(wb.active)
    for name, headers, rows in c["sheets"]:
        ws = wb.create_sheet(name)
        ws.sheet_view.showGridLines = False
        ws["A1"] = c["title"]
        ws["A1"].font = Font(bold=True, size=16, color=NAVY)
        ws["A2"] = c["by"]
        ws["A2"].font = Font(italic=True, size=9, color="6B7A90")

        if headers is None:  # instructions sheet
            ws.column_dimensions["A"].width = 120
            for i, line in enumerate(rows, start=4):
                cell = ws.cell(row=i, column=1, value=line)
                cell.alignment = Alignment(wrap_text=True, vertical="top")
                cell.font = Font(bold=(i == 4), size=12 if i == 4 else 11, color=NAVY if i == 4 else "1F2937")
            continue

        for col, h in enumerate(headers, start=1):
            cell = ws.cell(row=4, column=col, value=h)
            cell.font = Font(bold=True, color="FFFFFF")
            cell.fill = PatternFill("solid", fgColor=BLUE)
            cell.alignment = Alignment(wrap_text=True, vertical="center")
            cell.border = BORDER
            ws.column_dimensions[cell.column_letter].width = 46 if len(headers) == 2 and col == 1 else (70 if len(headers) == 2 else 24)
        ws.row_dimensions[4].height = 36
        ws.freeze_panes = "A5"

        body = rows or [[""] * len(headers) for _ in range(EMPTY_ROWS)]
        for r, row in enumerate(body, start=5):
            for col, value in enumerate(row, start=1):
                cell = ws.cell(row=r, column=col, value=value or None)
                cell.border = BORDER
                cell.alignment = Alignment(wrap_text=True, vertical="top")
                if r % 2 == 0:
                    cell.fill = PatternFill("solid", fgColor=LIGHT)
                if rows and col == 1:
                    cell.font = Font(bold=True, color=NAVY)
        last = 4 + len(body)

        def add_list(col: int, values: str) -> None:
            dv = DataValidation(type="list", formula1=f'"{values}"', allow_blank=True)
            ws.add_data_validation(dv)
            letter = ws.cell(row=5, column=col).column_letter
            dv.add(f"{letter}5:{letter}{last}")

        if name in c["level_cols"]:
            add_list(c["level_cols"][name], c["levels"])
        if name in c["status_cols"]:
            add_list(c["status_cols"][name], c["status"])
        if "ADKAR" in name:
            for col in range(2, 7):
                add_list(col, c["adkar"])

    OUT.mkdir(parents=True, exist_ok=True)
    wb.properties.creator = "Cyrrus Consulting Services"
    wb.properties.title = c["title"]
    wb.save(OUT / c["file"])
    print(f"wrote public/descargas/{c['file']}")


if __name__ == "__main__":
    for lang in COPY:
        build(lang)
