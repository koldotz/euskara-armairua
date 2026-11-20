# Pruebas

Comprueban la web tal como se publica, sin tocar nunca el Supabase de verdad: el banco de perfiles se emula en memoria con [PGlite](https://pglite.dev) ejecutando el mismo `supabase/armairua-perfilak.sql`.

## Requisitos

- **Node 22** o posterior.
- **Google Chrome** (o Chromium). Se busca en las rutas habituales; si está en otro sitio: `CHROME=/ruta/al/binario npm test`.
- Una sola vez: `npm install` (instala PGlite en `node_modules/`, que no se sube a git).

## Ejecutar

| Orden | Qué hace | Tiempo |
|---|---|---|
| `npm test` | todas las pruebas | ~8 min |
| `npm run test:rapido` | solo las que no necesitan navegador (SQL, funciones, datos) | ~3 s |
| `node tests/run.mjs perfiles` | solo las que tengan «perfiles» en su ruta (vale cualquier trozo) | — |
| `node tests/run.mjs -v` | mostrando también cada comprobación que pasa | — |

Si algo falla, el proceso termina con código 1 y se lista cada comprobación fallida.

## Qué cubre

| Fichero | Comprueba |
|---|---|
| `sql/basico` | crear y entrar, guardar, bloqueo tras 5 PIN erróneos, restablecer PIN, lista pública, permisos, versión del SQL |
| `sql/seguridad` | que todo PIN erróneo cuente para el bloqueo (la fuerza bruta se corta a los 6 intentos) y que la función interna del PIN no se pueda llamar desde fuera |
| `sql/fusion` | que el servidor rechace un cambio que parte de una versión vieja (para que el navegador fusione) y la compatibilidad con navegadores antiguos |
| `unit/fusion-cliente` | la fusión a tres bandas de `armairua-cloud.js` (extraída del fichero real) |
| `datos/datos` | integridad de Hiztegia, Esaldiak, Mintzamena y Ostalaritza; que los totales que se muestran (1.457 palabras) sean los reales; que existan los PDF |
| `datos/buruko-neurona` | el catálogo del motor de creación y el propio motor:<br>• todas las palabras del catálogo existen en el Hiztegia · Bakarka;<br>• los papeles son animados, los nodos existen y cada marco cuadra con el auxiliar del verbo;<br>• cada propuesta del motor (más de 20.000 contextos) pasa su propio análisis y evita las formas que chocan con otra palabra;<br>• los homógrafos se distinguen por número y categoría, las palabras lexicalizadas explican su origen y el avisador salta con *dendari*;<br>• el análisis caza los errores típicos: NORK o NORI que sobran, objeto plural, persona del auxiliar, verbo intransitivo con *du* y auxiliar que falta. |
| `datos/hiztegia-formak` | las correcciones revisadas de las formas del Hiztegia · Bakarka (`tools/hiztegia/salbuespenak.json`): lista bien formada, que apunten a formas que existen, que las aprobadas estén aplicadas y que no vuelvan *gauan*, los plurales fijos mal cortados, los lemas con artículo ni *onago*; y que los 31 orígenes (`jatorria`) cuadren con la forma del lema de origen |
| `datos/gafas` | que el diccionario de las gafas sea coherente y que el fichero publicado coincida con el generador |
| `datos/config` | que `config.js` lleve solo la clave pública y que la tarea que mantiene despierto Supabase pueda leerlo |
| `datos/plan` | el plan de 28 días: fechas y días de la semana; que los temas del Hiztegia, los ejercicios del cuaderno y las secciones de la guía que cita existan (con su título y su enlace); que todo ejercicio tenga día; pruebas, retos e hitos en días válidos |
| `datos/service-worker` | que todo lo precacheado exista y que todo lo que cargan las páginas esté precacheado (uso sin conexión) |
| `datos/orriak` | las hojas de respuestas: doce unidades bien formadas (clave, tipo, página dentro de la unidad), rótulos que no son frases (no llevan el texto del libro), que estén precacheadas y que el visor del libro solo se cargue en local |
| `datos/iturriak` | procedencia: que ningún texto atribuya a un libro lo que ha preparado Claude, y que las transcripciones personales de libros (`pribatua/`) sigan fuera del repositorio, del service worker y de la web publicada; si la carpeta existe en este ordenador, que sus datos sean coherentes |
| `e2e/paginas` | las 7 páginas y sus pestañas a 1280, 390 y 320 px: sin errores de JavaScript, sin recursos que falten, sin ids repetidos, sin desbordamiento horizontal |
| `e2e/botoiak` | prueba «de mono»: en cada página, pestaña y subapartado (Jokoa, Esaldiak…), a 1280 y 390 px, pulsa todos los botones que aparecen, sin errores de JavaScript (confirm responde «no», así que no borra nada) |
| `e2e/enlaces` | los enlaces internos de todas las páginas y vistas (plan, cuaderno, Mintzamena, Ostalaritza): que exista la página o el PDF, que el ancla lleve a algo y que `#page=N` no pase del final del PDF |
| `e2e/buruko-neurona` | el motor de creación (`buruko-neurona.html`), en estos pasos:<br>• la red se dibuja con nodos, palabras, aristas y los 17 casos;<br>• una propuesta entra en el puzzle y pasa el análisis;<br>• las piezas elegidas a mano (un personaje, un auxiliar) entran en la frase activa, se mueven y se quitan;<br>• «Anek da» sale marcado como «NORK sobra»;<br>• el peso de un nodo se edita por contexto y otra escena reconecta la red;<br>• los contextos se guardan en la clave que viaja con el perfil y siguen tras recargar;<br>• la Libreta abre con las redacciones. |
| `e2e/perfiles-dos-dispositivos` | el recorrido normal: crear perfil, entrar en otro dispositivo (PIN erróneo y bueno), progreso en los dos sentidos, salir |
| `e2e/perfiles-salir-cambiar` | salir o cambiar de perfil sin conexión avisa antes de borrar; un PIN caducado no bloquea el perfil |
| `e2e/perfiles-concurrencia` | dos dispositivos a la vez, uno sin conexión: nada se pisa, fichas de palabra enteras, reinicios, datos de la versión anterior |
| `e2e/hiztegia-duplicadas` | las palabras repetidas en dos temas comparten ficha y no cuentan doble |
| `e2e/hiztegia-idatzi` | el modo «Idatzi» de Hiztegia: corrección (mayúsculas, signos, artículo de más, erratas, sinónimos), nota propuesta con Intro, cola del repaso, modo recordado, móvil |
| `e2e/libreta` | la libreta del A1: contenido de cada apartado, oraciones que se registran al acertar, quitar apartados, PDF real de Chrome, nombre de archivo, marcas «Berria» tras confirmar el guardado, móvil |
| `e2e/geruzak-gafas` | las gafas de Geruzak: desglose, lectura en tablas, ficha, leyenda, estado recordado, HTML intacto al quitarlas, móvil |
| `e2e/koadernoa-egiaztatu` | «Egiaztatu» en el cuaderno: compara con la solución sin dar por errónea una respuesta abierta distinta, y manda los fallos a «Nire akatsak» |
| `e2e/simulazioa` | los simulacros cronometrados: tiempo, soluciones cerradas mientras corre, entrega con corrección, total y aprobado, y la nota en el plan |
| `e2e/akatsak` | «Nire akatsak»: fallos de juegos, cuaderno y palabras difíciles en un solo repaso; lo acertado después sale de la lista |
| `e2e/hitza` | tocar una palabra en euskera del cuaderno, Mintzamena o Esaldiak abre su desglose |
| `e2e/iturriak` | la procedencia en la app: «⚠ Claude» en lo propio, la etiqueta del libro en las hojas de respuestas, la fuente en cada ficha del Hiztegia y en cada frase de Esaldiak, y el filtro por fuente; si hay `pribatua/` en este ordenador, que sus unidades funcionen como el resto del cuaderno |
| `e2e/orriak` | las hojas de respuestas de Arian A1: las doce en el cuaderno, sin «Egiaztatu»; escribir en cada tipo de casilla, recuento, guardado, recarga, libreta, subida al perfil y llegada a otro dispositivo, móvil sin desbordes; y, si tu libro está enlazado en `pribatua/`, que la página de cada ejercicio abra tu PDF |

## Probar a mano con el Supabase emulado

`npm run mock` sirve la web en <http://localhost:8766> con el banco de perfiles en memoria (se vacía al pararlo). Útil para probar perfiles y sincronización sin crear nada en el Supabase real.

## Escribir una prueba

Un fichero `*.test.mjs` en la carpeta que toque, que exporte `default async function(t)` y compruebe con `t.ok(condición, 'qué se espera')`. En `e2e/` además hay `t.tab({ width, mobile })` (una pestaña nueva, como otro dispositivo), `t.base` (la URL del servidor), `t.sql(consulta)` y `t.down(true)` (simula que el banco no responde). Las acciones habituales (entrar con un perfil, etc.) están en `lib/app.mjs`. La base de datos se vacía antes de cada fichero.

Al cambiar el esquema del SQL, sube el número de `armairua_bertsioa()` y el de `sql/basico`: así se puede comprobar desde fuera qué versión tiene instalada Supabase (`POST /rest/v1/rpc/armairua_bertsioa`).
