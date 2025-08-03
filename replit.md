# Overview

This is a full-stack electronics portfolio website built with React and Express.js. The site features a modern dark theme with an electronics/circuit aesthetic, showcasing projects, blog posts, and providing contact functionality. It includes both public-facing pages and an admin dashboard for content management.

The application follows a monorepo structure with shared code between frontend and backend, uses TypeScript throughout, and implements modern UI patterns with shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Blog, Projects, Contact, and Admin
- **UI Components**: shadcn/ui component library with Radix UI primitives and Tailwind CSS
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, dark mode optimized with electronics-inspired color scheme
- **Forms**: React Hook Form with Zod validation for form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Structure**: RESTful API with routes for auth, blog posts, projects, contacts, and newsletter
- **Development**: Hot reloading with Vite middleware integration in development mode

## Database Design
- **Users**: Admin authentication with roles
- **Categories**: Blog post categorization system
- **Blog Posts**: Full featured blog with drafts, publishing, SEO fields, tags, and view tracking
- **Projects**: Project portfolio with difficulty levels, GitHub/demo links, and view tracking
- **Contacts**: Contact form submissions with status tracking
- **Newsletter**: Email subscription management
- **Media**: File upload and management system

## Authentication & Authorization
- **Strategy**: JWT tokens stored in localStorage
- **Password Security**: Bcrypt hashing with salt rounds
- **Protected Routes**: Admin dashboard requires authentication
- **Session Management**: Token-based with middleware verification

## Development & Deployment
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Concurrent frontend/backend development with Vite dev server
- **Production**: Static file serving with Express for SPA routing
- **Deployment**: Vercel-ready configuration with serverless functions

# External Dependencies

## Database & Storage
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations with migration support

## UI & Styling
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Lucide Icons**: Consistent icon library throughout the application

## Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Vite**: Fast development server and build tool with HMR
- **Replit Integration**: Runtime error modal and cartographer plugins for Replit environment