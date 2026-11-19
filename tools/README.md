# Herramientas

Scripts para preparar contenidos. Ninguno hace falta para que la web funcione.

## `geruzak/` · diccionario de las gafas de Geruzak

`armairua-geruzak-betaurrekoak.js` **se genera**: no se edita a mano.

- `morf.mjs`: los tipos de pieza (raíz, artículo, caso…) y el inventario de morfemas, con su explicación y el bloque de la guía donde se trata.
- `words.mjs`: el diccionario de formas. Los paradigmas se generan (declinación de *etxe* / *lagun*, demostrativos, pronombres…) y el resto va a mano.
- `extra.mjs`: formas que también son palabras castellanas (*su*, *da*, *ni*…), que solo se desglosan dentro de una frase vasca, y la traducción de frases sueltas.

Para añadir o corregir una forma, edita `words.mjs` y ejecuta:

```
npm run gafas          # valida y regenera el fichero
node tools/geruzak/build.mjs --check   # solo comprueba que está al día
```

Si una pieza usa un morfema que no existe, o si las piezas no forman la palabra, no escribe nada y dice qué falla. La prueba `datos/gafas` avisa si alguien ha tocado el fichero generado a mano.

## `pdf/pdf-a-texto.swift` · PDF → texto e imágenes (macOS)

Primer paso para transcribir un material nuevo:

```
swift tools/pdf/pdf-a-texto.swift materiala.pdf salida/ --png
```

Deja `salida/texto.txt` con marcas `===== PDF PAGE n =====` y, con `--png`, una imagen por página. Las imágenes sirven para revisar lo que el texto no recoge bien: tablas, columnas, dibujos y erratas. Opciones: `--desde N --hasta M --escala 2`.

## `hiztegia/berriak.mjs` · palabras que faltan en el Hiztegia

Segundo paso: a partir del texto, las formas vascas que aún no están en el vocabulario del A1, ordenadas por frecuencia.

```
node tools/hiztegia/berriak.mjs salida/texto.txt --min 2
```

Es una criba, no una lista final:
- compara formas escritas, no lemas;
- descarta las derivadas obvias de una palabra conocida (*etxe* → *etxean*); con `--todas` salen también;
- deja pasar el castellano del documento.

La selección, la traducción y el tema se deciden a mano. Así se hizo con Mintzamena: son las palabras con `src:"mz"` de `armairua-a1-data.js`.

## `iturriak/hiztegia.mjs` · vocabulario de las unidades personales → Hiztegia

Si en `pribatua/` (carpeta local, ignorada por git) hay unidades personales con bloques de vocabulario, este script lleva sus palabras al Hiztegia, un tema por lección («Bakarka 1 · 2. Zer da hau?») y con `src:"bk1"`:

```
node tools/iturriak/hiztegia.mjs             # muestra lo que añadiría
node tools/iturriak/hiztegia.mjs --escribir  # lo añade
```

- Solo pasan **palabras sueltas con su traducción**, y solo se **añade al final**: el progreso de cada palabra se guarda por su posición, así que nunca cambia ni renumera lo que ya está.
- No repite una palabra en su propio tema. Si es igual (euskera y traducción) a otra de otro tema, la app las une en una sola ficha.
- Después: actualiza los totales que se muestran (`npm run test:rapido` dice cuáles no cuadran) y sube la versión de `sw.js`.

## `iturriak/liburua.mjs` · tu libro al lado de las hojas de respuestas

Las hojas de respuestas de *Arian A1* (`armairua-a1-arian-orria.js`) no llevan el texto del libro. Para no depender del libro en papel, este script **enlaza** tu propio PDF y tus audios dentro de `pribatua/arian-a1/` y escribe el índice que usa el visor (`armairua-koadernoa-liburua.js`, que solo se carga en local):

```
node tools/iturriak/liburua.mjs               # dice lo que haría
node tools/iturriak/liburua.mjs --escribir    # lo hace (enlaces simbólicos)
node tools/iturriak/liburua.mjs --escribir --pdf <ruta> --audio <carpeta> [--kopiatu]
```

- Por defecto busca el PDF en `~/Documents/EUS/A1/` y las pistas (`NNN- ….mp3`) en la carpeta de audios de Arian. `--kopiatu` copia en vez de enlazar.
- El índice (`pribatua/arian-a1/index.js`) lleva el **mapa de páginas**: qué página del PDF es cada página impresa. El escaneado no trae todas (faltan las portadas de unidad, la 108–109 y la 205–207), por eso va por tramos; está en `LIBURUAK` dentro del script. Las 205–207 salen de otro PDF tuyo, el de la unidad 10 suelta (`gehigarriak`).
- Con la app abierta en local (`python3 -m http.server` en la raíz y `http://localhost:8000/a1.html`), cada ejercicio de las hojas ofrece «📖 página» (abre tu PDF en un panel al lado; en pantallas estrechas, en otra pestaña) y «▶ pista» para los audios que tengas.
- Nada de esto sale de tu ordenador: `pribatua/` está fuera de git y la web publicada ni lo pide.

### Cómo se prepara una hoja

Con las páginas de la unidad delante (`pdf/pdf-a-texto.swift … --png`), se anota de cada ejercicio su número, su página, su pista y la forma de sus casillas: cuántas, con qué rótulo (a–e, 1–10) y de qué tipo (escribir, elegir una opción, marcar, tabla, verdadero o falso), y qué trae ya resuelto el libro. **No se copian enunciados, diálogos ni lecturas.** Los tipos están descritos en la cabecera de `armairua-koadernoa-iturriak.js`; la prueba `datos/orriak` vigila que ningún rótulo sea una frase. El `id` de cada unidad (`aro-01`…) no se cambia: de él salen las claves de lo que ya has escrito.

### `pribatua/` · lo que no se publica

El texto de libros con derechos (*Bakarka 1*, *Arian A1*…) no va en el repositorio ni en la web. Lo que guardes ahí para tu estudio (apuntes, ejercicios copiados de tu libro) solo existe en tu ordenador: `a1.html` lo lee únicamente cuando se abre en local (`localhost` o `file:`), con el formato descrito en la cabecera de `armairua-koadernoa-iturriak.js`. La prueba `datos/iturriak` vigila que esa carpeta siga ignorada, que el service worker no la precachee y que ninguna página la cargue fuera de local.

## `fitxak/` · fichas A1 de los casos (artifacts de claude.ai)

Las cinco páginas de «Kasuak · fichas A1» (`kasuen-zuhaitza.html`, `nire-herria.html`, `nor-naiz.html`, `esaldi-eraikitzailea.html` y `kasuak-aurkezpena.html`) y `gramatika-sakonean.html` (en Tresnak, junto al buscador) **salen de artifacts de claude.ai**. `integrar.mjs` las adapta al sitio sin cambiar su aspecto:

- enlaces entre ellas y al sitio en relativo, sin pestaña nueva;
- cabecera del sitio (manifest, iconos, descripción), «Fichas A1» de la ruta lleva a `index.html#kasuak`;
- aviso ⚠ Claude en el pie;
- `window.ARMAIRUA_HASH_OK` en el mural y el constructor, para que `e2e/enlaces` reconozca las anclas que resuelve su script (`#nor`, `#non-bizi`…);
- la presentación (artifact de tipo Slides) se monta como página estática: cada diapositiva en su lienzo de 1920 × 1080 escalado, y un modo «Presentar» a pantalla completa.

Si se cambia un artifact en claude.ai: descargar sus ficheros a una carpeta (página de cada uno en `src/`, `project/` de la presentación en `deck/`), ejecutar `node tools/fitxak/integrar.mjs <carpeta> .`, subir la versión de `sw.js` y pasar `npm test`. Se pueden editar las páginas a mano, pero la siguiente importación lo pisaría.

**Grupo «Hiztegia · Bakarka»** (segunda pestaña del selector de la portada, `index.html#hiztegiak`): `bakarka-hiztegia.html` + `bakarka-hiztegia.json` (artifact MuSaLbS1TWnkcYmhh14X4N), `bakarka-1-sintesia.html` (Ps5ia2R6FHRuG7rDKPcJhY) y `bakarka-3-sintesia.html` (6vNeXq6GBbJVDWehBMmJoZ). Se importan con `bakarka.mjs`: descargar a una carpeta `hiztegia.html` y `hiztegia.json` (página y fichero del hiztegia), `bakarka-1.html` y `bakarka-3.html` (página de cada síntesis), y ejecutar `node tools/fitxak/bakarka.mjs <carpeta> .`. Pone la cabecera del sitio y el aviso ⚠ en el pie, lleva la ruta a la portada y al grupo, cambia los enlaces a artifacts por las páginas del sitio (falla si alguno no está integrado), enlaza las tres entre sí, renombra el JSON y corrige el pie de las síntesis (decía «no copiados»; las frases clave y parte de los ejemplos son citas breves del libro: en Bakarka 1, medido contra la transcripción privada, el 1,3 % del texto del libro). Falla también si cambia el texto que espera sustituir. Después: subir la versión de `sw.js` y pasar `npm test`; la prueba `datos/bakarka` para la reimportación si el hiztegia trae frases o una síntesis pasa de 3 citas por texto.
