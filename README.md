Enterprise Portfolio Platform (Laravel API & Vue 3 SPA)

A production-grade, decoupled portfolio platform engineered to demonstrate scalable backend API design, robust asynchronous state management, and rigorous automated testing protocols.

🏛️ System Architecture

The application follows a modern decoupled architecture, separating the RESTful backend API from the reactive single-page application (SPA) frontend. Communication is secured via stateless token handling and strict CORS policies.

+-----------------------------------------------------------------+
│                       Client Layer (Vue 3)                      │
│  +------------------+  +------------------+  +----------------+ │
│  |   Vue Router     |  | Pinia Store Mgmt |  | Vitest Unit    │ │
│  +------------------+  +------------------+  +----------------+ │
+----------------------------------+------------------------------+
                                   │ HTTPS / REST JSON
+----------------------------------v------------------------------+
│                     Backend API Layer (Laravel)                 │
│  +------------------+  +------------------+  +----------------+ │
│  | REST Resources   |  | Sanctum Auth /   |  | PHPUnit /      │ │
│  | & Controllers    |  | CORS Middleware  │  | Feature Tests  │ │
│  +------------------+  +------------------+  +----------------+ │
+----------------------------------+------------------------------+
                                   │ Eloquent ORM
+----------------------------------v------------------------------+
│                     Persistence Layer (MySQL)                   │
+-----------------------------------------------------------------+


🚀 Core Technical Highlights

Decoupled REST API Design: Laravel backend structured around standard REST resource controllers delivering clean, flat JSON payloads.

Reactive State & Routing: Vue 3 Composition API paired with Pinia for predictable state management and Vue Router for dynamic client-side navigation.

Rigorous Testing Strategy:

Backend feature and unit test coverage via PHPUnit.

Frontend unit and component testing via Vitest and Vue Test Utils (100% passing suite).

CI/CD Automation: Fully automated GitHub Actions pipeline validating linting, unit tests, and production build pipelines (vite build) on every push.

Developer Experience: Containerized local development environment utilizing Laravel Sail and Docker.

🛠️ Tech Stack

Backend: PHP 8.2, Laravel 11, MySQL, REST API, PHPUnit

Frontend: Vue 3 (Composition API), Pinia, Vue Router, Tailwind CSS, Vite, Vitest

DevOps & Tooling: Docker, Laravel Sail, GitHub Actions CI/CD

📦 Quick Start & Installation

Ensure you have Docker, Composer, and Node.js (v18+) installed on your local machine.

1. Backend Setup (laravel-vue-portfolio-backend)

git clone https://github.com/Julupower/laravel-vue-portfolio-backend.git
cd laravel-vue-portfolio-backend

# Install dependencies via composer container
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest composer install

# Configure environment and start Sail containers
cp .env.example .env
./vendor/bin/sail up -d

# Generate app key, run migrations, and seed test data
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed


2. Frontend Setup (laravel-vue-portfolio-frontend)

cd ../laravel-vue-portfolio-frontend
git clone https://github.com/Julupower/laravel-vue-portfolio-frontend.git

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run development server
npm run dev


🧪 Running the Test Suite

Backend Tests

./vendor/bin/sail artisan test


Frontend Tests

npm run test:unit


📈 Engineering Decisions & Scalability

Flat REST JSON Over Complex Graphs: Transitioned from initial over-engineered structures to a clean REST resource pattern, drastically reducing payload size and improving client-side rendering efficiency.

Defensive Error Boundaries: Component-level handling for network failures, 404 resource misses, and fallback routing ensure graceful degradation.

Strict CI Gates: No code reaches the main branch without passing automated build and test suites, reflecting production-grade software engineering standards.

📄 License

Distributed under the MIT License. See LICENSE for more information.