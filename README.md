# Euskara Armairua

Recurso web interactivo para aprender **euskara**, organizado **por niveles** (A1, A2… y más adelante B1–C2). Cada nivel es un bloque cerrado, con sus propios materiales; los niveles **no se mezclan**. Son páginas estáticas, autónomas y sin dependencias de servidor: cada una contiene su HTML, CSS y JS en línea.

El sistema visual se llama *«Geruzak»* (estratos): toma como metáfora el carácter aglutinante del euskera —las palabras se construyen por capas, como el flysch de la costa vasca— con una paleta mineral (caliza, mar cantábrico y hierro oxidado, *burdina gorria*). Cada nivel es una capa del flysch.

## Niveles

- **A1** (`a1.html`) — Oinarria. Egutegia (plan de 28 días), Hiztegia (796 palabras) y Koadernoa (ejercicios editables con solución).
- **A2** (`a2.html`) — Jatetxean. Koadernoa basado en *Ostalaritza · Jatetxean* (HABE/Elhuyar): «eduki», futuro, casos y subordinación.
- **B1–C2** — en preparación.

La **portada** (`index.html`) es el selector de nivel. El **perfil y el progreso** se comparten entre páginas (mismo origen en GitHub Pages) y cada material guarda con claves propias por nivel (p. ej. `koadernoa:*` en A1, `koadernoa-a2:*` en A2) para que nunca colisionen.

## Uso

No requiere instalación ni compilación. Basta con abrir el archivo:

```bash
open index.html
```

O servirlo localmente (recomendado, para que el enrutado por hash funcione igual que en producción):

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Estructura

```
euskara-armairua/
├── index.html    # Portada · selector de nivel
├── a1.html       # Nivel A1 (egutegia + hiztegia + koadernoa)
├── a2.html       # Nivel A2 (koadernoa · Jatetxean)
├── .nojekyll     # Evita el procesado de Jekyll en GitHub Pages
└── README.md
```

Para añadir un nivel nuevo, copia `a2.html` como plantilla, cambia el prefijo de las claves de guardado (p. ej. `koadernoa-b1:*`) y añade su tarjeta en `index.html`.

## Créditos

Creado originalmente como un artefacto de Claude y exportado a este repositorio.
