# diseño-vento.md — Sistema de diseño de las herramientas Vento Chalco

Todas las herramientas (portal, evaluaciones, expedientes, cotizador, preciadores, etc.) deben verse de la misma familia. Este archivo es la referencia obligatoria.

## 1. Modos (obligatorio tener los dos)
- **Claro:** mosaicos de colores vivos sobre fondo crema.
- **Oscuro:** medianoche con mosaicos de color.
- Por defecto sigue el modo del teléfono; un botón (luna/sol) arriba a la derecha permite cambiarlo y se recuerda en `localStorage` con la clave `vento-tema` (envuelto en try/catch).
- No usar estilo grafito/gris sobrio: los mosaicos-botón deben distinguirse claramente de los recuadros informativos.

## 2. Colores (tokens CSS en `:root`)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#F6EFE3` | `#0D1322` | Fondo de la página |
| `--bg-2` | `#EFE6D6` | `#141C30` | Fondo secundario |
| `--card` | `#FFFDF8` | `#151E33` | Recuadros informativos |
| `--chip` | `#EADFCB` | `#1D2741` | Chips, etiquetas, fondos de íconos neutros |
| `--line` | `#E2D7C3` | `#232D45` | Bordes |
| `--ink` | `#1B1A17` | `#F2F4F8` | Texto principal |
| `--ink-2` | `#5E584D` | `#9AA4BA` | Texto secundario |
| `--rojo` | `#E3262E` | `#F0434A` | Color de marca / acción principal |
| `--azul` | `#2563EB` | `#3B82F6` | Mosaico |
| `--verde` | `#119C5B` | `#1DB874` | Mosaico / éxito / cumplido |
| `--ambar` | `#F59E0B` | `#F7B12F` | Mosaico / alerta |
| `--morado` | `#7C3AED` | `#8B5CF6` | Mosaico |
| `--cian` | `#0891B2` | `#14A8C9` | Mosaico |

Implementación: definir en `:root`, redefinir en `:root[data-theme="dark"]` y en `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...} }`. El `body` siempre con `background: var(--bg)`.

## 3. Tipografía
- `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` (sin fuentes externas, funciona sin internet).
- Título de pantalla: 26px, peso 800, `letter-spacing:-.02em`.
- Título de mosaico/tarjeta: 18px, peso 800.
- Texto normal: 15px; secundario 13px en `--ink-2`.
- Encabezados de sección: 13px, peso 700, MAYÚSCULAS, `letter-spacing:.08em`, color `--ink-2`.
- Números importantes (KPIs, precios, metas): grandes (mínimo 28px, peso 800) — deben leerse a distancia.

## 4. Espaciado y forma
- Margen lateral 16px en celular; contenido máximo 760px centrado.
- Separación entre mosaicos/tarjetas: 14px. Entre secciones: 22px.
- Radio: 22px en mosaicos y tarjetas, 14px en botones e íconos, 18px en botones grandes.
- Respetar `env(safe-area-inset-*)` arriba y abajo.

## 5. Componentes
**Encabezado:** SIN logo (el cuadro rojo con la "V" ya no se usa en ningún lugar). Solo texto pequeño "AGENCIA 16025" + nombre de la herramienta en negritas. A la derecha el botón de tema (44px, borde `--line`, fondo `--card`).

**Mosaico-botón (acción / navegación):** fondo de color vivo (`--rojo`, `--azul`, etc.), texto blanco, ícono en cuadro blanco al 22% de opacidad, círculo decorativo blanco 14% en la esquina superior derecha, flecha en círculo abajo a la derecha. Sombra suave. Al tocar: `scale(.97)`. Alto mínimo ~168px en la portada; en apps puede ser menor.

**Recuadro informativo (solo muestra datos):** fondo `--card`, borde 1px `--line`, texto `--ink`. Nunca de color vivo, para que no se confunda con un botón.

**Botón principal:** ancho completo, 16px de padding, radio 18px, fondo `--ink`, texto `--bg`, peso 700. Botón de acción de marca: fondo `--rojo`, texto blanco.

**Placeholder / vacío:** borde 2px discontinuo `--line`, fondo transparente, texto `--ink-2`.

**Íconos:** SVG en línea, estilo trazo (stroke 2, puntas redondeadas), 24×24.

## 6. Reglas generales
- Mobile first: todo debe funcionar cómodo en celular con una mano; nada de scroll horizontal.
- Áreas táctiles mínimo 44px.
- Todo en español de México.
- Cada app debe ser instalable (manifest + service worker + ícono negro con la palabra "VENTO" en blanco, el mismo de la app actual) y tener un enlace "← Portal" en el encabezado que regrese a `https://jesus-trapala.github.io/portal-vento/`.
- Lo que se imprime (preciadores, checklist, expedientes PDF) sigue sus propias reglas de impresión (blanco y negro cuando aplique); este sistema aplica a la pantalla.

## 7. Perfil gerente: "Ver como"
- Al entrar como gerente (Jesús), junto al botón "¿No eres tú?" aparece "Cambiar vista": permite elegir Kevin u Osvaldo sin su PIN, solo para ver exactamente lo que ve ese asesor en toda la app.
- Mientras está en esa vista, una franja arriba dice "Jesús viendo como <asesor>" con botón "Volver a mi vista".
- Lo que el gerente registre en esa vista queda a nombre de Jesús, no del asesor.
