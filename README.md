# Euskara Armairua

Recurso web interactivo para aprender **euskara** a nivel **A1**. Es una aplicación de una sola página (single-page), autónoma y sin dependencias de servidor: todo (estilos, tipografías y lógica) está contenido en `index.html`.

El sistema visual se llama *«Geruzak»* (estratos): toma como metáfora el carácter aglutinante del euskera —las palabras se construyen por capas, como el flysch de la costa vasca— con una paleta mineral (caliza, mar cantábrico y hierro oxidado, *burdina gorria*).

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
├── index.html    # La aplicación completa (HTML + CSS + JS inline)
├── .nojekyll     # Evita el procesado de Jekyll en GitHub Pages
└── README.md
```

## Créditos

Creado originalmente como un artefacto de Claude y exportado a este repositorio.
