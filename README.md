# La Birriaza · Página web

Página promocional de La Birriaza: menú con precios, cómo pedir por WhatsApp (con las pantallas reales del bot), la comanda que llega a cocina, formas de entrega y pago.

Es un sitio estático (HTML, CSS y JavaScript, sin dependencias), listo para **GitHub Pages**.

## Publicarlo con GitHub Pages
1. En este repositorio: **Settings → Pages**.
2. En *Build and deployment* elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
3. En uno o dos minutos queda en `https://<usuario-u-organizacion>.github.io/<repositorio>/`.

## Cambios frecuentes
| Qué | Dónde |
|---|---|
| Número de WhatsApp de los botones | `assets/sitio.js`, constante `WHATSAPP` (con 52 adelante, sin espacios) |
| Precios y platillos | `index.html`, sección `menu` |
| Teléfono para llamar | `index.html`, sección `cierre` |
| Colores y tipografías | `assets/estilos.css`, al inicio (`:root`) |

Tipografías incluidas en `assets/fonts`: Shrikhand y Figtree (licencia SIL Open Font License).
