# Informe: portal del nivel A2 (Jatetxean · Ostalaritza)

> Plan de construcción para llevar `a2.html` a paridad con el portal A1.
> Fecha: 2026-09-13. Método base: **HABE/Elhuyar «Ostalaritza»** + **Bakarka 1**.
> Convención de avisos: todo desglose morfológico o nota gramatical que **no**
> venga literal de la documentación del método se marca «⚠ por verificar»
> (igual que en A1: Irakurmena y Esaldiak).

---

## 1. Estado actual

`a2.html` (≈60 KB) contiene **solo**:
- Un único panel `app-koadernoa` con **9 unidades** (`unit` `j1`–`j9`),
  temática *Ostalaritza 11–19*: menú, partitivo, `-(r)ekin`, `falta zaio`,
  `nolakoa/nola dago` + gradación, `NON/NORA/NONDIK`, `noiz/noizko`,
  demostrativos `zer da hau`, geroaldia `-ko/-go`, denborazkoak `-tan`,
  eskaerak al proveedor.
- Una copia propia de `window.HUB` (perfil + sync, [a2.html:815](a2.html#L815)).
- Carga: `config.js`, `armairua-cloud.js`, `armairua-export.js`,
  `armairua-glosario.js`. **No** carga ningún fichero de datos A2.

**Le falta** (respecto a A1): barra de pestañas, `home`, **Egutegia** (plan),
**Hiztegia** (vocabulario), **Jokoa** (minijuegos + Entzun bukle + Esaldiak),
y los módulos `PLANA`, `MEMORIA`, `ENTZUN`, `ESALDIAK` + la IIFE del Jokoa.

El portal [index.html](index.html) ya enlaza A2 como *«Hurrengo urratsa ·
Jatetxean»* ([index.html:179](index.html#L179)), así que la entrada existe.

---

## 2. Objetivo

Paridad estructural con A1 ([a1.html](a1.html)), reutilizando el mismo diseño
(paleta mineral, tipos, CSS de tarjetas/juegos) y las mismas mecánicas, pero
con **contenido y datos A2 propios** y **claves de progreso separadas**.

Pestañas objetivo del portal A2 (como A1):

| Pestaña | Panel | Fuente de datos | Módulo |
|---|---|---|---|
| 📅 Egutegia | `app-egutegia` | `A2_PLAN` | `PLANA` |
| 🗃️ Hiztegia | `app-hiztegia` | `A2_DATA.w` | (glosario/export) |
| ✏️ Koadernoa | `app-koadernoa` | *inline* (ya existe) | — |
| 🎮 Jokoa | `app-jokoa` | `A2_DATA.w`, `A2_ESALDIAK`, `MEMORIA` | IIFE Jokoa + `ENTZUN` + `ESALDIAK` |

---

## 3. Arquitectura y decisiones

### 3.1 Módulos: duplicar (patrón actual) vs extraer
Hoy los módulos reutilizables **viven dentro de `a1.html`**, no en ficheros
compartidos:

| Módulo | Definido en | Qué hace |
|---|---|---|
| `HUB` | [a1.html:734](a1.html#L734) · ya duplicado en a2 | Perfil + sync local/cloud (Firestore `aurrerapena`) |
| `PLANA` | [a1.html:1397](a1.html#L1397) | Estado del plan de días (hecho/pendiente, destrezas) |
| `MEMORIA` | [a1.html:1780](a1.html#L1780) | Recitados de memoria (paradigmas) que crecen con el plan |
| `ENTZUN` | [a1.html:2149](a1.html#L2149) | Voz (Web Speech) + aproximación fonética vasca |
| `ESALDIAK` | [a1.html:2784](a1.html#L2784) | Buscador es→eu del banco de frases |
| IIFE Jokoa | [a1.html:2179](a1.html#L2179) | 7 minijuegos + niveles |

**Recomendación:** dado que `HUB` ya se duplicó tal cual en a2, seguir el
**mismo patrón de duplicación** para el primer MVP del A2 (menos riesgo, cero
refactor de A1). **Deuda técnica a anotar:** cuando A2 esté estable, extraer
estos módulos a un `armairua-portal.js` compartido y parametrizar por nivel
(datos + claves), para no mantener dos copias. No hacerlo ahora para no tocar
A1 que está en producción.

### 3.2 Claves de persistencia (evitar choque con A1)
`HUB.save(id, KEY, st)` persiste por *KEY* de localStorage. A1 usa, p.ej.,
`euskara-jokoa-v1`, `euskara-ent-view`, el estado del plan y de memoria.
**A2 debe usar claves propias** con prefijo de nivel, p.ej.:
- `euskara-a2-jokoa-v1`, `euskara-a2-ent-view`
- plan A2: `euskara-a2-plana-...`, memoria A2: `euskara-a2-mem-...`

El **perfil/nombre** (`euskara-izena`) y el estado cloud **sí** se comparten
entre niveles (es el mismo usuario) — no prefijar esa clave.

### 3.3 Convención de datos (igual que A1)
Cada fichero de datos = `var`/`window.X` global de nivel superior, **sin IIFE**,
cargado con `<script src>` clásico (sin defer/async) **antes** de sus
consumidores, para que funcione en `file://` sin fetch/CORS. Ver
[a1-data-extraction] en memoria.

### 3.4 Service Worker
Al crear los ficheros nuevos: registrarlos en `ASSETS` de [sw.js](sw.js) y
**subir la versión** de `CACHE` (`armairua-vN`; hoy `v7`) o la PWA no los
servirá offline.

---

## 4. Ficheros de datos a crear

Mismos esquemas que A1 (para reutilizar módulos sin cambios):

### 4.1 `armairua-a2-plan.js` → `window.A2_PLAN`
Plan de días del A2. Mismo esquema que `A1_PLAN`
([armairua-a1-plan.js](armairua-a1-plan.js)): `days`, fases, hitos, retos,
pruebas, `links`. Consumido por `PLANA`.

### 4.2 `armairua-a2-data.js` → `window.A2_DATA`
`{ w: [...palabras], t: [...temas] }`. `w` alimenta Hiztegia + los juegos de
vocabulario del Jokoa (Entzun/Zein/Egia nivel 0). Filtro que ya aplican los
juegos: descarta entradas con `/` en `eu`/`es`. Escala objetivo: A1 tiene
**796 palabras**; A2 debería ampliar el campo léxico de *Ostalaritza/Jatetxean*
(cocina, sala, reservas, quejas, proveedor…).

### 4.3 `armairua-a2-esaldiak-data.js` → `window.A2_ESALDIAK`
**Mismo esquema exacto que A1** ([armairua-esaldiak-data.js](armairua-esaldiak-data.js)):
```js
{ es, eu, k, src, m:[[pieza,glosa],…], g }
```
- `es`/`eu`: **de la documentación del método** (verificado).
- `m` (morfemas) y `g` (nota): los añade Claude → **marcar «por verificar»**.
- `k` (etiquetas de estructura A2): ampliar el juego de chips respecto a A1.
  Propuesta: `NOR-NORK` · `NOR-NORI-NORK` · `Iragana` · `Geroaldia` ·
  `Aginte` · `Ahalera` · `Baldintza` · `Menpekoak` · `Erlatiboa` ·
  `Konparazioa` · `Esapideak`.

> **Bonus de reutilización:** el Jokoa ya deriva la dificultad de la longitud
> de las frases de `*_ESALDIAK`. Si `A2_ESALDIAK` está bien poblado, los
> niveles Erraza/Ertaina/Zaila del Jokoa A2 salen «gratis».

---

## 5. Alcance gramatical A2 (secuencia propuesta)

Basado en las unidades ya presentes en el koadernoa A2 y en la progresión
estándar HABE A2 / Bakarka 1. **La fuente autoritativa es el método**; lo que
se genere fuera de él va con aviso.

1. **Repaso puente A1→A2**: NOR / NORK / NORI, casos de lugar, aspecto.
2. **NOR-NORI-NORK** completo en presente (dio/diot/didazu/dizkiot…).
3. **Aditz trinko** ampliados: `jakin, eduki, egon, ibili, etorri, joan,
   eraman, ekarri, esan, jardun`.
4. **Iragana**: NOR (`nintzen`), NOR-NORK (`nuen/zenuen`), NOR-NORI
   (`zitzaidan`).
5. **Geroaldia** `-ko/-go` completo (ya iniciado, unidad 7).
6. **Agintera** (imperativo) completo: `ekarri/ekar ezazu, emadazu, esadazu`.
7. **Ahalera**: `dezaket, daiteke, dezakezu`.
8. **Baldintza**: `baldin ba-…, -ko/-go…-ke` (irreales suaves de A2).
9. **Perífrasis**: `nahi/behar/ahal/ohi + partizipio`.
10. **Menpeko esaldiak**: completivas `-(e)la` / `-(e)n`, causales `-elako`,
    temporales `-(e)nean`, finales `-tzeko`, condicionales `ba-`,
    **relativas** `-(e)n + izena`, comparativas `baino …-ago / bezain / -en`.
11. **Mugagabea y partitivo** más a fondo; postposiciones nuevas
    (`-raino, -rako, -tzat, buruz, gainera`).
12. **Lokailuak** de discurso: `hala ere, beraz, gainera, hau da, adibidez,
    azkenik`.

Temática transversal: **Jatetxean / Ostalaritza** (menú, comanda, reserva,
queja, indicaciones, proveedor), coherente con lo ya escrito.

---

## 6. Bancos de contenido a preparar

| Banco | Fichero/lugar | Tamaño orientativo | Estado |
|---|---|---|---|
| Plan de días A2 | `armairua-a2-plan.js` | ~4 semanas | por crear |
| Vocabulario A2 | `armairua-a2-data.js` (`w`) | +300–500 palabras | por crear |
| Recitados de memoria A2 | dentro de a2.html (array `MEM`, como A1 [a1.html:1695](a1.html#L1695)) | paradigmas A2 (iragana, nor-nori-nork, ahalera…) | por crear |
| Frases con análisis A2 | `armairua-a2-esaldiak-data.js` | ~120–150 frases | por crear |
| Koadernoa A2 | inline en a2.html | 9 unidades hechas → ampliar a ~18 | parcial |

**Regla de oro (instrucción del usuario):** `es`/`eu` salen del método; los
morfemas `m` y notas `g` los redacta Claude y **llevan el aviso** hasta
contrastarlos con Euskaltzaindia.

---

## 7. Wiring en `a2.html`

1. Añadir la **barra de pestañas** (`role="tablist"`) con
   `tab-egutegia / tab-hiztegia / tab-koadernoa / tab-jokoa` + `app-home`,
   copiando el patrón de [a1.html:718](a1.html#L718).
2. Añadir los paneles `app-egutegia`, `app-hiztegia`, `app-jokoa` (el
   `app-koadernoa` ya está).
3. **Portar módulos** (duplicar de a1, adaptando datos y **claves**):
   `PLANA`, `MEMORIA`, `ENTZUN`, `ESALDIAK` y la **IIFE del Jokoa** (incluye ya
   los niveles seleccionables Erraza/Ertaina/Zaila).
4. En la IIFE del Jokoa, cambiar las fuentes: `A1_DATA→A2_DATA`,
   `A1_ESALDIAK→A2_ESALDIAK`, y la clave `euskara-jokoa-v1→euskara-a2-jokoa-v1`.
   Revisar los bancos hard-authored del Jokoa (`DEKL`, `OSATU/1/2`,
   `SAILKA_CTX1/2`, `ORDENA`) → sustituir por contenido **A2** (o dejar como
   repaso A1 con etiqueta de repaso).
5. Añadir los `<script src>` de datos A2 **antes** de la IIFE del Jokoa:
   `armairua-a2-plan.js`, `armairua-a2-data.js`, `armairua-a2-esaldiak-data.js`.

---

## 8. Portal e infraestructura

- [index.html:184](index.html#L184): actualizar la lista de contenidos del
  bloque A2 conforme se añadan pestañas (hoy dice solo «Koadernoa»).
- [sw.js](sw.js): añadir los 3 ficheros nuevos a `ASSETS` y subir `CACHE` a
  `v8`.
- `manifest.webmanifest`: sin cambios (es de sitio).
- Comprobar que `ENTZUN` (voz) y el buscador `ESALDIAK` funcionan en `file://`
  y offline, como en A1.

---

## 9. Plan por fases (checklist)

**Fase 0 · Andamiaje**
- [ ] Barra de pestañas + `app-home` + paneles vacíos en a2.html.
- [ ] Portar `PLANA`, `MEMORIA`, `ENTZUN` con claves `euskara-a2-*`.

**Fase 1 · Datos**
- [ ] `armairua-a2-plan.js` (plan de días).
- [ ] `armairua-a2-data.js` (vocabulario + temas).
- [ ] `armairua-a2-esaldiak-data.js` (frases + análisis «por verificar»).

**Fase 2 · Jokoa A2**
- [ ] Portar IIFE del Jokoa (con niveles) apuntando a datos A2.
- [ ] Adaptar bancos internos (DEKL/OSATU/SAILKA/ORDENA) a gramática A2.
- [ ] Recitados `MEM` A2 para Entzun bukle + Memoria.

**Fase 3 · Cierre**
- [ ] Hiztegia A2 (render de `A2_DATA.w`).
- [ ] Ampliar Koadernoa a ~18 unidades.
- [ ] index.html + sw.js (`v8`) + test CDP sin errores.

**Fase 4 · Deuda técnica**
- [ ] Extraer módulos comunes a `armairua-portal.js` parametrizado por nivel.

---

## 10. Verificación gramatical (recordatorio)

Mantener en A2 el mismo régimen que en A1:
- Soluciones `eu` = del método (verificadas).
- Desglose `m` / nota `g` = Claude → **aviso «⚠ por verificar»** hasta
  contrastar con Euskaltzaindia.
- Coherencia de patrones dentro del método (p. ej., horas
  `[hora]ak eta erdietan`, como se corrigió en A1).
