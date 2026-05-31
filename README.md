# 🗂️ Dashboard App — Next.js 16

> Proyecto del curso **Next.js** de [Fernando Herrera](https://www.udemy.com/course/nextjs-fh/) en Udemy.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)

---

## 📖 Descripción

Aplicación de tipo **panel de administración (dashboard)** construida con Next.js 16 y App Router. Demuestra conceptos clave como Server Components, Client Components, renderizado estático y dinámico, rutas dinámicas, manejo de errores y SEO dinámico con `generateMetadata`.

---

## 🗺️ Páginas

| Ruta | Descripción |
|---|---|
| `/` | Redirige automáticamente a `/dashboard/main` |
| `/dashboard/main` | Página principal del panel de administración |
| `/dashboard/counter` | Contador de carrito de compras (Client Component con `useState`) |
| `/dashboard/pokemons` | Grid estático con los 151 Pokémon originales, consumidos desde PokeAPI |
| `/dashboard/pokemon/[id]` | Detalle dinámico de cada Pokémon: tipos, peso, movimientos, sprites y shiny |
| `/_not-found` | Página 404 personalizada con sidebar integrado |

---

## 🛠️ Tecnologías

- **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, Dynamic Routes, `generateMetadata`
- **[React 19](https://react.dev/)** — Hooks, Client/Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipado estático
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Estilos con PostCSS
- **[react-icons 5](https://react-icons.github.io/react-icons/)** — Iconografía
- **[Google Fonts — Geist](https://vercel.com/font)** — Tipografía

---

## 🎨 Diseño

El estilo visual fue generado con la skill **[frontend-design](https://github.com)**, que guía la creación de interfaces production-grade con una dirección estética definida y evita los patrones genéricos de IA.

**Dirección elegida: "Retro-Arcade / Terminal científico oscuro"**

- **Paleta**: Fondo negro profundo (`#080810`) con acentos **ámbar dinámicos** que cambian según el tipo de Pokémon en la página de detalle
- **Tipografía**: `Bebas Neue` (display masivo) + `Space Mono` (terminal monoespaciado) — importadas desde Google Fonts vía `<style>` inline
- **CSS**: Todo en **CSS-in-JSX** (`<style>` scoped por componente), sin dependencias extra. Se usa `@keyframes` para animaciones, `CSS custom properties` para los temas por tipo, y `CSS Grid` con `auto-fill` para el grid de Pokémon
- **Motion**: Animación `float` en el artwork oficial, barras de stats con `animation-delay` escalonado, shimmer sweep en hover de las cards, ícono de React girando infinitamente en el sidebar
- **Componente a componente**:

| Componente | Técnica destacada |
|---|---|
| `PokemonCard` | Hover 3D (`rotateX + translateY + scale`), shimmer `::after`, drop-shadow glow |
| `PokemonGrid` | CSS Grid `repeat(auto-fill, minmax(200px, 1fr))` |
| `pokemon/[id]` | Tema dinámico por tipo (18 colores), layout split asimétrico, stat bars animadas |
| `Sidebar` | Ícono React con `animation: spin`, avatar con ring gradiente, ítem activo con barra lateral glowing |
| `CartCounter` | Botones con hover inline via `onMouseOver`/`onMouseOut` |

---

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📂 Estructura del proyecto

```
app/
├── components/                  # Componentes globales de UI
│   ├── Sidebar.tsx              # Barra lateral con navegación
│   ├── SidebarMenuItem.tsx      # Ítem individual del sidebar
│   └── index.ts                 # Barrel exports
│
├── dashboard/                   # Grupo de rutas del dashboard
│   ├── layout.tsx               # Layout compartido con Sidebar
│   ├── main/page.tsx            # Página principal
│   ├── counter/page.tsx         # Contador interactivo (Client Component)
│   ├── pokemons/
│   │   ├── page.tsx             # Grid estático de Pokémon
│   │   └── error.tsx            # Error boundary del grid
│   └── pokemon/[id]/
│       └── page.tsx             # Detalle dinámico por ID
│
├── pokemons/                    # Módulo de dominio: Pokémon
│   ├── components/
│   │   ├── PokemonCard.tsx      # Tarjeta de cada Pokémon
│   │   └── PokemonGrid.tsx      # Grid de tarjetas
│   ├── interfaces/
│   │   ├── pokemon.ts           # Interfaz completa de Pokémon
│   │   ├── simple-pokemon.ts    # Interfaz simplificada
│   │   └── pokemons-response.ts # Interfaz de respuesta de la API
│   └── index.ts                 # Barrel exports
│
├── shopping-cart/               # Módulo del carrito de compras
│   └── components/
│       ├── CartCounter.tsx      # Componente contador del carrito
│       └── index.ts             # Barrel exports
│
├── not-found.tsx                # Página 404 personalizada
├── layout.tsx                   # Layout raíz (tipografía, metadata global)
└── page.tsx                     # Home con redirect a /dashboard/main

next.config.ts                   # Config de Next.js y remotePatterns para imágenes
```

---

## 💡 Conceptos aplicados

- ✅ **Server Components vs Client Components** (`'use client'`)
- ✅ **Renderizado estático** con `force-cache` en `fetch`
- ✅ **Rutas dinámicas** con `[id]`
- ✅ **`generateMetadata`** para SEO dinámico por página
- ✅ **Manejo de errores** con `error.tsx` y `not-found.tsx`
- ✅ **`params` como Promise** (cambio de API en Next.js 16)
- ✅ **Imágenes externas** con `next/image` y `remotePatterns`
- ✅ **Layouts anidados** con App Router

---

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm start` | Sirve la app compilada |
| `npm run lint` | Ejecuta ESLint |

---

## 📄 Licencia

MIT
