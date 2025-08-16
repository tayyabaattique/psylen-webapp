# Psylen - Mental Health Companion App

## Overview

Psylen is a mental health companion application that provides users with three main wellness tools: a doodle canvas for creative expression, a journaling system for reflection, and guided mindfulness exercises. The app features a clean, mobile-first design with a calming color palette focused on accessibility and user well-being.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens for consistent theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Mobile-First Design**: Responsive layout optimized for mobile devices with bottom navigation

The frontend follows a component-based architecture with clear separation between UI components, pages, and business logic. Custom hooks handle mobile detection and toast notifications.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints following conventional HTTP methods
- **Request Handling**: JSON middleware for parsing request bodies with comprehensive error handling
- **Development Setup**: Hot reload with Vite integration for seamless development experience
- **Logging**: Custom request/response logging with duration tracking for API endpoints

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Type-safe database schemas with Zod validation
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Migrations**: Drizzle Kit for database schema migrations and versioning

The storage layer uses an interface-based design allowing easy switching between in-memory and database storage implementations.

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Simple username/password authentication with unique constraints
- **Security**: Prepared for secure session handling with database persistence

### Core Features
- **Doodle Canvas**: HTML5 Canvas-based drawing tool with customizable brushes, colors, and export functionality
- **Journal System**: Full CRUD operations for journal entries with title, content, and timestamps
- **Mindfulness Exercises**: Interactive guided exercises including 5-4-3-2-1 grounding, breathing exercises, and gratitude practices
- **Responsive Navigation**: Bottom navigation bar for mobile-optimized user experience

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Session Storage**: PostgreSQL-backed session management

### UI and Design
- **Radix UI**: Comprehensive set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Fast build tool with React plugin and runtime error overlay
- **TypeScript**: Type safety across the entire application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Server state management and caching

### Additional Integrations
- **Replit Integration**: Development environment optimized for Replit with cartographer plugin
- **Mobile Detection**: Custom hooks for responsive behavior
- **Toast Notifications**: User feedback system for actions and errors