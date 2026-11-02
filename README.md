# Laravel & Vue 3 Enterprise Portfolio (Frontend)

A decoupled, modern Single Page Application (SPA) built with Vue 3, Vite, and Pinia, interfacing with a Laravel 11 backend API. Engineered to enterprise standards featuring dynamic SEO optimization, automated CI/CD pipelines, client-side filtering, and comprehensive unit testing.

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API `<script setup>`)
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router (with dynamic meta guards & navigation controls)
- **HTTP Client:** Axios (configured with CSRF protection)
- **Testing Suite:** Vitest
- **CI/CD:** GitHub Actions (Automated Linting & Unit Tests)
- **Code Quality:** ESLint / Oxlint, Prettier

---

## 🚀 Completed Architectural Milestones

- [x] **Phase 1: Foundation & Base Setup**
  - Scaffolding with Vue 3, Vite, and Composition API.
  - Centralized Axios HTTP client instance.
  - Development server proxying to bypass local CORS boundaries.
- [x] **Phase 2: State Management & Data Layer**
  - Centralized Pinia store (`useProjectStore`).
  - Asynchronous state management handling loading, success, and error boundaries.
  - Reactive state bindings across UI components.
- [x] **Phase 3: Dynamic Views & Client-Side Search/Filtering**
  - Dynamic routing for project showcase and project detail views (`/projects/:slug`).
  - Sub-millisecond client-side keyword search across titles and summaries.
  - Real-time technology stack tag filtering via computed properties.
- [x] **Phase 4: Authentication & Security**
  - Stateful SPA authentication using Laravel Sanctum CSRF protection.
  - Route navigation guards restricting unauthorized access to administrative routes (`/admin`).
- [x] **Phase 5: Automated Testing & CI/CD Infrastructure**
  - Unit test suite coverage using Vitest for stores, components, services, and routing.
  - Automated GitHub Actions workflow executing build, linting, and unit test sweeps on pull requests.
- [x] **Phase 6: Production SEO & Performance Optimization**
  - Dynamic `document.title` and meta description injection via router navigation guards.
  - Optimized production build distribution (< 165 kB JS bundle, 227ms build time).

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Julupower/laravel-vue-portfolio-frontend.git](https://github.com/Julupower/laravel-vue-portfolio-frontend.git)
   cd laravel-vue-portfolio-frontend