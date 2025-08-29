# Polish Insurance Claims Application

## Overview

This is a Polish-language insurance claims management application built with a React frontend and Express backend. The application allows users to submit insurance claims across three categories: vehicles (pojazdy), property (majątek), and personal/life (ludzie). The system uses a full-stack TypeScript setup with modern UI components and a PostgreSQL database for persistent storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript and follows a modern component-based architecture:

- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Build System**: Vite for fast development and optimized production builds

The frontend follows a page-based routing structure with dedicated pages for each claim category. The component architecture separates UI components into reusable elements under `/components/ui` and business logic components under `/components/claim`.

### Backend Architecture
The server-side uses Express.js with TypeScript:

- **API Structure**: RESTful API endpoints with `/api` prefix
- **Database Layer**: Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstracted storage layer with both in-memory and database implementations
- **Middleware**: Custom logging and error handling middleware
- **Development Setup**: Integrated with Vite for hot reloading in development

The backend currently implements a minimal storage interface with methods for user management, designed to be extended for claims management functionality.

### Data Storage Solutions
The application uses PostgreSQL as the primary database:

- **ORM**: Drizzle ORM for schema definition and query building
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Database Provider**: Neon serverless PostgreSQL
- **Migration System**: Drizzle Kit for database migrations

The schema defines a comprehensive claims table with category-specific JSON data fields and separate validation schemas for vehicle and property claims.

### Development and Deployment
- **Development**: Hot reloading with Vite and Express integration
- **Build Process**: Separate builds for client (Vite) and server (esbuild)
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Code Quality**: Strict TypeScript configuration with path aliases

## External Dependencies

### UI and Styling
- **Radix UI**: Complete set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Data Management
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe SQL toolkit and query builder
- **Drizzle Kit**: CLI companion for schema migrations
- **TanStack Query**: Server state management and data fetching

### Form and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

### Development Tools
- **Vite**: Build tool with HMR and optimizations
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production server builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Routing and Navigation
- **Wouter**: Minimalistic routing library for React
- **React Router**: Alternative routing solution (available but not actively used)

The application is designed to be deployed on Replit with integrated development tools and can scale to handle production insurance claim processing workflows.