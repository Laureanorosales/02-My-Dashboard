# 🗂️ Dashboard App — Next.js 16

> Proyecto del curso **Next.js** de [Fernando Herrera](https://www.udemy.com/course/nextjs-fh/) en Udemy.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)

---

## 📖 Descripción

Aplicación de tipo **panel de administración (dashboard)** construida con Next.js 16 y App Router. Demuestra conceptos clave del ecosistema moderno de React/Next.js: Server Components, Client Components, renderizado estático y dinámico, generación estática de páginas, rutas dinámicas, manejo de errores, y SEO dinámico con `generateMetadata`.

---

## 🗺️ Páginas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Server | Redirige automáticamente a `/dashboard/main` |
| `/dashboard/main` | Server | Página principal del panel |
| `/dashboard/counter` | Client | Contador interactivo con `useState` (carrito de compras) |
| `/dashboard/pokemons` | Server | Grid estático con los 151 Pokémon originales (PokeAPI) |
| `/dashboard/pokemon/[id]` | Server + SSG | Ficha completa por ID: tipos, stats, habilidades, sprites, movimientos |
| `/_not-found` | Server | Página 404 personalizada con sidebar integrado |

---

## 🛠️ Tecnologías

- **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, `generateMetadata`, `generateStaticParams`
- **[React 19](https://react.dev/)** — Hooks (`useState`), Client/Server Components
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipado estático completo
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utilidades via PostCSS (`@tailwindcss/postcss`)
- **[react-icons 5](https://react-icons.github.io/react-icons/)** — Iconografía (sidebar)
- **CSS Modules** — Estilos encapsulados en `Sidebar.module.css` y `SidebarMenuItem.module.css`
- **CSS-in-JSX** (`<style>` tags) — Estilos con `@keyframes` en componentes de Pokémon
- **Google Fonts** — `Bebas Neue` (display) + `Space Mono` (monoespaciado)

---

## 🎨 Diseño

> 🤖 El diseño visual (CSS, animaciones, theming y componentes de UI) fue generado con **[Antigravity](https://antigravity.dev) — Claude**, asistente de IA de Google DeepMind.

**Dirección estética: "Retro-Arcade / Terminal científico oscuro"**

- **Paleta**: Fondo negro profundo (`#080810`) con acentos **ámbar dinámicos** que cambian según el tipo del Pokémon
- **Tipografía**: `Bebas Neue` para títulos masivos + `Space Mono` para texto terminal — importadas desde Google Fonts
- **Theming dinámico**: En `/dashboard/pokemon/[id]`, se inyectan CSS custom properties (`--theme-accent`, `--theme-glow`, etc.) calculadas en base al tipo primario del Pokémon (18 tipos soportados)
- **Motion**: Animación `float` en el artwork oficial, barras de stats con `animation-delay` escalonado, shimmer sweep en hover de las cards, ícono React girando infinitamente en el sidebar

| Componente | Técnica destacada |
|---|---|
| `PokemonCard` | Hover 3D (`rotateX + translateY + scale`), shimmer `::after`, glow con `drop-shadow` |
| `PokemonGrid` | CSS Grid `repeat(auto-fill, minmax(200px, 1fr))` |
| `pokemon/[id]` | Tema dinámico por tipo, layout split asimétrico, stat bars animadas |
| `Sidebar` | CSS Modules, ícono React con animación `spin`, avatar con ring gradiente |
| `CartCounter` | Botones con feedback visual inline via `onMouseOver`/`onMouseOut` |

---

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. Redirigirá automáticamente al dashboard.

---

## 📂 Estructura del proyecto

```
app/
├── components/                  # Componentes globales de UI
│   ├── Sidebar.tsx              # Barra lateral con navegación
│   ├── Sidebar.module.css       # Estilos encapsulados del sidebar
│   ├── SidebarMenuItem.tsx      # Ítem individual del sidebar
│   ├── SidebarMenuItem.module.css
│   └── index.ts                 # Barrel exports
│
├── dashboard/                   # Grupo de rutas del dashboard
│   ├── layout.tsx               # Layout compartido con Sidebar
│   ├── main/page.tsx            # Página principal
│   ├── counter/page.tsx         # Contador interactivo (Client Component)
│   ├── pokemons/
│   │   ├── page.tsx             # Grid estático de los 151 Pokémon
│   │   └── error.tsx            # Error boundary del grid
│   └── pokemon/[id]/
│       ├── page.tsx             # Ficha dinámica por ID (SSG con generateStaticParams)
│       └── pokemon.css          # Estilos scoped del detalle
│
├── pokemons/                    # Módulo de dominio: Pokémon
│   ├── components/
│   │   ├── PokemonCard.tsx      # Tarjeta de cada Pokémon
│   │   └── PokemonGrid.tsx      # Grid de tarjetas
│   ├── interfaces/
│   │   ├── pokemon.ts           # Interfaz completa de Pokémon (PokeAPI)
│   │   ├── simple-pokemon.ts    # Interfaz simplificada {id, name}
│   │   └── pokemons-response.ts # Interfaz de respuesta de listado
│   ├── constants/               # TYPE_COLORS, STAT_LABELS
│   └── index.ts                 # Barrel exports
│
├── shopping-cart/               # Módulo del carrito de compras
│   └── components/
│       ├── CartCounter.tsx      # Componente contador (Client Component)
│       └── index.ts             # Barrel exports
│
├── not-found.tsx                # Página 404 personalizada
├── layout.tsx                   # Layout raíz (metadata global, tipografía)
├── globals.css                  # Variables globales y reset base
└── page.tsx                     # Home → redirect a /dashboard/main

next.config.ts                   # remotePatterns para imágenes de PokeAPI/GitHub
```

---

## 💡 Conceptos de Next.js aplicados

| Concepto | Dónde |
|---|---|
| **Server Components** (por defecto) | Todas las páginas del dashboard |
| **Client Components** (`'use client'`) | `CartCounter.tsx` |
| **`generateStaticParams`** | `pokemon/[id]/page.tsx` — pre-genera los 151 Pokémon en build |
| **`generateMetadata`** | `pokemon/[id]/page.tsx` — título y descripción por Pokémon |
| **`params` como `Promise`** | Nuevo en Next.js 15+: `params: Promise<{ id: string }>` |
| **`force-cache`** en fetch | Cacheo explícito en `getPokemon()` |
| **Rutas dinámicas** `[id]` | `/dashboard/pokemon/[id]` |
| **Error boundaries** (`error.tsx`) | `/dashboard/pokemons/error.tsx` |
| **404 personalizado** (`not-found.tsx`) | Raíz de `app/` con layout integrado |
| **`next/image`** con `remotePatterns` | Sprites y artwork de PokeAPI / GitHub raw |
| **Layouts anidados** | `app/layout.tsx` → `dashboard/layout.tsx` |
| **Barrel exports** (`index.ts`) | `pokemons/`, `components/`, `shopping-cart/` |

---

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción (pre-renderiza los 151 Pokémon) |
| `npm start` | Sirve la app compilada |
| `npm run lint` | Ejecuta ESLint |

---

## 📄 Licencia

MIT
