# Pruebas

Comprueban la web tal como se publica, sin tocar nunca el Supabase de verdad: el banco de perfiles se emula en memoria con [PGlite](https://pglite.dev) ejecutando el mismo `supabase/armairua-perfilak.sql`.

## Requisitos

- **Node 22** o posterior.
- **Google Chrome** (o Chromium). Se busca en las rutas habituales; si está en otro sitio: `CHROME=/ruta/al/binario npm test`.
- Una sola vez: `npm install` (instala PGlite en `node_modules/`, que no se sube a git).

## Ejecutar

| Orden | Qué hace | Tiempo |
|---|---|---|
| `npm test` | todas las pruebas | ~3 min |
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
| `datos/datos` | integridad de Hiztegia, Esaldiak, Mintzamena y Ostalaritza; que los totales que se muestran (1.239 palabras) sean los reales; que existan los PDF |
| `datos/gafas` | que el diccionario de las gafas sea coherente y que el fichero publicado coincida con el generador |
| `datos/service-worker` | que todo lo precacheado exista y que todo lo que cargan las páginas esté precacheado (uso sin conexión) |
| `e2e/paginas` | las 7 páginas y sus pestañas a 1280, 390 y 320 px: sin errores de JavaScript, sin recursos que falten, sin ids repetidos, sin desbordamiento horizontal |
| `e2e/perfiles-dos-dispositivos` | el recorrido normal: crear perfil, entrar en otro dispositivo (PIN erróneo y bueno), progreso en los dos sentidos, salir |
| `e2e/perfiles-salir-cambiar` | salir o cambiar de perfil sin conexión avisa antes de borrar; un PIN caducado no bloquea el perfil |
| `e2e/perfiles-concurrencia` | dos dispositivos a la vez, uno sin conexión: nada se pisa, fichas de palabra enteras, reinicios, datos de la versión anterior |
| `e2e/hiztegia-duplicadas` | las palabras repetidas en dos temas comparten ficha y no cuentan doble |
| `e2e/libreta` | la libreta del A1: contenido de cada apartado, oraciones que se registran al acertar, quitar apartados, PDF real de Chrome, nombre de archivo, marcas «Berria» tras confirmar el guardado, móvil |
| `e2e/geruzak-gafas` | las gafas de Geruzak: desglose, lectura en tablas, ficha, leyenda, estado recordado, HTML intacto al quitarlas, móvil |

## Probar a mano con el Supabase emulado

`npm run mock` sirve la web en <http://localhost:8766> con el banco de perfiles en memoria (se vacía al pararlo). Útil para probar perfiles y sincronización sin crear nada en el Supabase real.

## Escribir una prueba

Un fichero `*.test.mjs` en la carpeta que toque, que exporte `default async function(t)` y compruebe con `t.ok(condición, 'qué se espera')`. En `e2e/` además hay `t.tab({ width, mobile })` (una pestaña nueva, como otro dispositivo), `t.base` (la URL del servidor), `t.sql(consulta)` y `t.down(true)` (simula que el banco no responde). Las acciones habituales (entrar con un perfil, etc.) están en `lib/app.mjs`. La base de datos se vacía antes de cada fichero.

Al cambiar el esquema del SQL, sube el número de `armairua_bertsioa()` y el de `sql/basico`: así se puede comprobar desde fuera qué versión tiene instalada Supabase (`POST /rest/v1/rpc/armairua_bertsioa`).
