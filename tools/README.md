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
