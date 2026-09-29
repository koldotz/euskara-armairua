# Euskara Armairua

Recurso web interactivo para aprender **euskara**, organizado **por niveles** (A1, A2… y más adelante B1–C2). Cada nivel es un bloque cerrado, con sus propios materiales; los niveles **no se mezclan**. Son páginas estáticas, autónomas y sin dependencias de servidor: cada una contiene su HTML, CSS y JS en línea.

El sistema visual se llama *«Geruzak»* (estratos): toma como metáfora el carácter aglutinante del euskera —las palabras se construyen por capas, como el flysch de la costa vasca— con una paleta mineral (caliza, mar cantábrico y hierro oxidado, *burdina gorria*). Cada nivel es una capa del flysch.

## Niveles

- **A1** (`a1.html`) — Oinarria. Egutegia (plan de 28 días), Hiztegia (1.239 palabras), Koadernoa (ejercicios editables con solución), Mintzamena (los *Modelos de conversaciones castellano-euskera* del Gobierno Vasco, transcritos, con voz; PDF en `materialak/mintzamena/`) y Jokoa. El botón **📓 Libreta** reúne todo lo trabajado (plan, gramática desbloqueada, ejercicios con tus respuestas y la solución, vocabulario, conversaciones, juegos y oraciones resueltas) en un documento para guardar como PDF; cada nueva libreta marca lo trabajado desde la anterior.
- **A2** (`a2.html`) — Jatetxean. Koadernoa basado en *Ostalaritza · Jatetxean* (HABE/Elhuyar): «eduki», futuro, casos y subordinación.
- **B1–C2** — en preparación.

La **portada** (`index.html`) es el selector de nivel. El **perfil y el progreso** se comparten entre páginas (mismo origen en GitHub Pages) y cada material guarda con claves propias por nivel (p. ej. `koadernoa:*` en A1, `koadernoa-a2:*` en A2) para que nunca colisionen.

**Perfiles entre dispositivos.** Cada perfil es *nombre + PIN de 4 cifras*. El progreso se guarda en el navegador y, si `config.js` apunta a un proyecto de Supabase, se sincroniza con la nube: al entrar con el mismo nombre y PIN en otro dispositivo se recupera todo, y los cambios se fusionan clave a clave (gana el más reciente), así que dos dispositivos no se pisan. La base de datos se crea con [`supabase/armairua-perfilak.sql`](supabase/armairua-perfilak.sql) (instrucciones en `config.js`); el PIN se guarda cifrado (bcrypt) y tras 5 intentos fallidos el perfil se bloquea 15 minutos. Para restablecer un PIN olvidado, vacía su `pin_hash` en el *Table Editor* de Supabase: el siguiente PIN con el que se entre pasará a ser el nuevo.

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
├── index.html      # Portada · selector de nivel
├── a1.html         # Nivel A1 (egutegia + hiztegia + koadernoa)
├── a2.html         # Nivel A2 (koadernoa · Jatetxean)
├── gramatika.html  # Buscador de gramática (transversal, eu↔es)
├── geruzak.html    # Guía de gramática completa (20 bloques) + «gafas de aprendizaje»
├── .nojekyll       # Evita el procesado de Jekyll en GitHub Pages
└── README.md
```

`gramatika.html` es un buscador transversal (compartido por todos los niveles): conjugaciones de auxiliares y verbos sintéticos con sus tiempos, formas verbales, casos de la declinación, determinantes, morfemas, posposiciones y adverbios, cada uno comparado con el castellano. La búsqueda funciona en euskera y en castellano y es insensible a tildes. Enlaza a la guía de gramática completa (prosa) alojada como artefacto de Claude.

`geruzak.html` es la guía de gramática completa en prosa (20 bloques, A1). Su botón **👓 Ikasteko betaurrekoak** («gafas de aprendizaje») pone la guía en modo interlineado: cada palabra vasca aparece troceada en sus morfemas —raíz, artículo, caso, enlace, aspecto, persona, derivación y partícula, cada tipo con su color— con la traducción al castellano debajo. Al tocar una palabra se abre su ficha, que explica cada pieza y enlaza al bloque donde se trata. Los datos (≈ 850 formas) están en `armairua-geruzak-betaurrekoak.js`; el desglose se preparó con ayuda de IA y conviene contrastarlo con las tablas.

Para añadir un nivel nuevo, copia `a2.html` como plantilla, cambia el prefijo de las claves de guardado (p. ej. `koadernoa-b1:*`) y añade su tarjeta en `index.html`.

## Pruebas y herramientas

La web no necesita compilación ni dependencias. Para desarrollar hay pruebas automáticas y algunas herramientas (Node 22 y Chrome; `npm install` una vez):

- `npm test`: todas las pruebas (~3 min): el SQL del banco de perfiles en una base de datos en memoria, la integridad de los datos, y la web entera en Chrome sin ventana (perfiles y sincronización con Supabase emulado, las 7 páginas en escritorio y móvil, las gafas de Geruzak). `npm run test:rapido` hace solo las que no necesitan navegador. Detalles en [tests/README.md](tests/README.md).
- [tools/](tools/README.md): el generador del diccionario de las gafas (`npm run gafas`), un extractor de PDF a texto e imágenes (macOS) y un buscador de palabras que aún no están en el Hiztegia. Son los pasos para incorporar materiales nuevos.

## Créditos

Creado originalmente como un artefacto de Claude y exportado a este repositorio.
