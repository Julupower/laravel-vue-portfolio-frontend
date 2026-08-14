# Laravel & Vue 3 Enterprise Portfolio (Frontend)

A decoupled, modern Single Page Application (SPA) built with Vue 3, Vite, and Pinia, interfacing with a Laravel 11 REST API.

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API `<script setup>`)
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Code Quality:** ESLint / Oxlint, Prettier

---

## 🚀 Architectural Roadmap & Implementation Status

### Phase 1: Foundation & Base Setup
- [x] Vue 3 SPA scaffolding with Vite and Composition API
- [x] Centralized Axios HTTP client configuration
- [x] Vite development server proxying to bypass local CORS boundaries
- [x] Clean base layout and global CSS resets

### Phase 2: State Management & Data Layer
- [x] Centralized Pinia store implementation (`useProjectStore`)
- [x] Asynchronous API state handling (loading, success, error boundaries)
- [x] Reactive state binding across view components

### Phase 3: Routing & Dynamic Views
- [ ] Vue Router setup for portfolio showcase (`/projects`)
- [ ] Single project detail view routes (`/projects/:id`)
- [ ] Dynamic navigation and route transitions

### Phase 4: Authentication & Security
- [ ] Laravel Sanctum CSRF cookie initialization
- [ ] Stateful SPA authentication flow (Login/Logout/Session persistence)
- [ ] Route navigation guards for protected admin operations

---

## 💻 Local Development Setup

```bash
# 1. Clone repository
git clone [https://github.com/Julupower/laravel-vue-portfolio-frontend.git](https://github.com/Julupower/laravel-vue-portfolio-frontend.git)

# 2. Install dependencies
cd laravel-vue-portfolio-frontend
npm install --legacy-peer-deps

# 3. Start development server
npm run dev