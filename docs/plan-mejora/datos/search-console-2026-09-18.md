# Google Search Console — cyrruscs.com — 2026-09-18

> Revisado directamente en el navegador (sc-domain:cyrruscs.com), no exportado
> a CSV. Última actualización de datos en GSC: 13/9/26.

## Indexación de páginas

- **Indexadas:** 44
- **Sin indexar:** 134 (8 motivos)

| Motivo | Fuente | Validación | Páginas |
|---|---|---|---|
| Página con redirección | Sitio web | Error | 23 |
| No se ha encontrado (404) | Sitio web | No iniciada | 19 |
| Página alternativa con etiqueta canónica adecuada | Sitio web | No iniciada | 10 |
| Excluida por una etiqueta "noindex" | Sitio web | No iniciada | 4 |
| Descubierta: actualmente sin indexar | Sistemas de Google | No iniciada | 46 |
| Rastreada: actualmente sin indexar | Sistemas de Google | No iniciada | 15 |
| Error de redirección | Sitio web | Iniciada | 15 |
| Error de servidor (5xx) | Sitio web | Iniciada | 2 |
| Duplicada: sin versión canónica indicada | Sitio web | Correcto | 0 |

### "No se ha encontrado (404)" — lista completa (19)

URLs del sitio viejo (Cyrrus ECS / WordPress) que Google sigue rastreando.
Mapeadas a 301 en `public/.htaccess` el 2026-09-18 (tarea 0.4):

1. `https://cyrruscs.com/products/bot/` → `/intelligence-lab`
2. `https://cyrruscs.com/en/strategy/` → `/en/metodo-cira/estrategia`
3. `https://www.cyrruscs.com/change-management/` → `/metodo-cira/gestion-del-cambio`
4. `https://cyrruscs.com/products/control/` → `/intelligence-lab`
5. `https://cyrruscs.com/cio-aas/` → `/metodo-cira/estrategia`
6. `https://cyrruscs.com/products/revenue/` → `/intelligence-lab`
7. `https://cyrruscs.com/en/project-management/` → `/en/metodo-cira/gestion-de-proyectos`
8. `https://cyrruscs.com/en/contact-page/` → `/en`
9. `https://cyrruscs.com/project-management/` → `/metodo-cira/gestion-de-proyectos`
10. `https://cyrruscs.com/products/safety/` → `/intelligence-lab`
11. `https://cyrruscs.com/en/products/safety/` → `/en/intelligence-lab`
12. `https://www.cyrruscs.com/nuestro-equipo/` → `/quienes-somos`
13. `https://cyrruscs.com/products/tactical/` → `/intelligence-lab`
14. `https://cyrruscs.com/cfo-aas/` → `/metodo-cira/estrategia`
15. `https://cyrruscs.com/en/products/improve/` → `/en/intelligence-lab`
16. `http://www.cyrruscs.com/index.php` → `/`
17. `https://www.cyrruscs.com/index.php` → `/`
18. `https://cyrruscs.com/en/home-worker/` → `/en/perspectivas`
19. `https://www.cyrruscs.com/en/index.php` → `/en`

Nota: `/products/dms/` (mencionado en PLAN.md como candidato) no aparece en
esta lista de 19; se dejó igual la regla `products/(bot|control|revenue|safety|tactical|improve|dms)`
por si Google lo reporta después — no hace daño si nunca hace match.

### "Página con redirección" (23) — muestra

Son en su mayoría normalización esperada (www↔non-www, con/sin slash) tras el
cambio de host canónico (commit `597818e`) y el cambio a URLs sin slash
(commit vigente en `public/.htaccess`, `DirectorySlash Off`): p. ej.
`https://www.cyrruscs.com/en/cookies`, `http://cyrruscs.com/en/`,
`https://cyrruscs.com/en/`, `https://www.cyrruscs.com/en/leadership-academy`,
`https://cyrruscs.com/en/quienes-somos`, `https://cyrruscs.com/presencia-digital`,
`https://cyrruscs.com/metodo-cira/seleccion-de-soluciones/seleccion-de-software/eam`,
etc. El estado "Error" en la validación probablemente es ruido de una
validación de Google iniciada antes de que el cambio de slash se asentara —
no se tocó nada aquí, revisar en la próxima sesión si baja solo.

## Rendimiento en la Búsqueda (últimos 3 meses, 16/6/26–15/9/26)

- **Clics totales:** 46
- **Impresiones totales:** 1.840
- **CTR medio:** 2,5 %
- **Posición media:** 14,7

Consultas principales (casi todo búsqueda de marca):

| Consulta | Clics | Impresiones |
|---|---|---|
| cyrrus | 32 | 964 |
| exceritus cs | 0 | 56 |
| virtuosos cs | 0 | 55 |
| cycontrol | 0 | 51 |
| cfo as a service | 0 | 34 |
| cfoaas | 0 | 22 |
| cyturus | 0 | 20 |
| qstrauss consulting | 0 | 15 |
| cyrious control | 0 | 9 |
| cynousre | 0 | 6 |

Casi todas las variantes mal escritas de "Cyrrus" — cero tráfico por keyword
de nicho todavía. Consistente con un sitio recién migrado y sin indexar.

## Recomendación para tabla de KPIs (PROGRESO.md)

Usar como línea base real (reemplaza "desconocido"): 44 indexadas / 178
conocidas, 46 clics / 1.840 impresiones en 3 meses.
