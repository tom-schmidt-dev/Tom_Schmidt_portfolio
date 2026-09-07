# Portfolio Website Specification

## 1. Project Overview
A fast, lightweight, and modern personal portfolio website built with Astro and Tailwind CSS. Designed to showcase software engineering, AI/RAG architectures, and web projects, optimized for self-hosting via Docker and Nginx.

## 2. Tech Stack
- **Framework:** Astro (Static Site Generation / SSG)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons / UI:** Lucide Icons (`lucide-astro` or inline SVGs)
- **Deployment:** Multi-stage Docker (Node.js Build -> Nginx Alpine)

## 3. Project Structure
```text
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── Skills.astro
│   │   └── Footer.astro
│   ├── data/
│   │   └── projects.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── Dockerfile
└── .dockerignore
