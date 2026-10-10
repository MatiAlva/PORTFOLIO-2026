# Alvarez Matias — Portfolio

Portfolio personal de **Alvarez Matias**, Full Stack Developer / Software Engineer. Una landing
interactiva con una escena 3D en tiempo real, contenido en español e inglés y descarga del CV
según el idioma. Sitio 100 % estático, sin backend.

**Demo:** [portfolio-2026-mati-alva.vercel.app](https://portfolio-2026-mati-alva.vercel.app)

[GitHub](https://github.com/MatiAlva) · [LinkedIn](https://www.linkedin.com/in/matias-ema-alvarez) · matyy01.ma@gmail.com

## Características

- **Escena 3D** con shaders propios (Three.js + React Three Fiber) que reacciona al cursor y al
  scroll, con calidad adaptativa según el dispositivo.
- **Bilingüe** (español por defecto / inglés), con la preferencia guardada en el navegador.
- **Descarga del CV** en el idioma activo.
- **Tema claro y oscuro.**
- **Accesible:** HTML semántico, navegación por teclado, textos alternativos y respeto por
  `prefers-reduced-motion`.
- **Rendimiento:** la escena 3D se carga en un chunk aparte y se pausa cuando no está visible.

## Stack

| Área      | Tecnologías                         |
| --------- | ----------------------------------- |
| Base      | Vite, React 19, TypeScript (strict) |
| Estilos   | Tailwind CSS 4                      |
| 3D        | Three.js, React Three Fiber, drei   |
| Animación | Motion                              |
| Calidad   | ESLint, Prettier                    |

## Cómo correrlo

Requisitos: **Node.js 22** y npm.

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script            | Descripción                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo                           |
| `npm run build`   | Chequeo de tipos y build de producción (`dist/`) |
| `npm run preview` | Sirve el build de producción en local            |
| `npm run check`   | Tipos + lint + formato                           |

## Estructura

```
public/            Archivos estáticos, CVs e imagen para compartir (og-image.jpg)
src/
  components/      3d/, sections/, layout/, navigation/, ui/
  data/            Contenido editable (perfil, experiencia, tecnologías, redes)
  i18n/            Idiomas y textos de la interfaz
  hooks/  lib/     Lógica reutilizable
  pages/           Páginas de la app
  styles/          Tema de Tailwind y estilos base
```

## Editar el contenido

Todo el texto vive en `src/data/` y `src/i18n/`, en versión español e inglés. TypeScript avisa
si falta alguna traducción.

- `src/data/site.ts` — nombre, rol, bio, contacto y archivo del CV.
- `src/data/experience.ts` — experiencia laboral.
- `src/data/skills.ts` — tecnologías del gráfico.
- `src/data/socials.ts` — redes sociales.
- `public/cv/` — reemplazar `cv-es.pdf` y `cv-en.pdf` manteniendo los nombres.
- `index.html` — título, descripción e imagen que se ven al compartir el link.

La sección de proyectos está desactivada por ahora (ruta, menú y sección comentados con `TODO`).

## Deploy

Ejecutar `npm run build` y publicar la carpeta `dist/` en cualquier hosting estático (Vercel,
Netlify, GitHub Pages…). Las variables de entorno son opcionales y solo se usan para analytics
(`VITE_ANALYTICS_*`); nunca poner secretos en variables `VITE_*`.

## Licencia

© Alvarez Matias. Todos los derechos reservados.
