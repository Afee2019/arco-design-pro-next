# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm export` - Export static files
- `pnpm eslint` - Run ESLint with auto-fix
- `pnpm stylelint` - Run Stylelint with auto-fix
- `pnpm pre-commit` - Run pre-commit hooks (prettier + eslint + stylelint)

## Architecture Overview

This is a Next.js-based Arco Design Pro admin dashboard built with TypeScript. The project uses a page-based routing system with comprehensive permission control and theme management.

### Core Technologies

- **Next.js 12.0.4** with TypeScript
- **Arco Design** as the primary UI library
- **Redux** for state management
- **Less** for styling with CSS modules
- **Mock.js** for API mocking
- **BizCharts** for data visualization

### Project Structure

- `src/pages/` - Next.js page components with nested routing
- `src/components/` - Reusable UI components (NavBar, Footer, Settings, etc.)
- `src/routes.ts` - Route configuration with permission-based access control
- `src/context.tsx` - Global React context for theme and language
- `src/store/` - Redux store for user info and settings management
- `src/utils/` - Utility functions for authentication, theme, storage, etc.
- `src/mock/` - Mock API data
- `src/locale/` - Internationalization
- `src/settings.json` - Global app settings (theme color, layout config)

### Key Architecture Patterns

**Permission System**: Routes are configured in `src/routes.ts` with `requiredPermissions` arrays. The `useRoute` hook filters available routes based on user permissions from Redux store.

**Theme Management**: Uses Arco Design's theming system with dynamic Less variable modification in `next.config.js`. Theme state is managed via GlobalContext and persisted in localStorage/cookies.

**Layout System**: Main layout in `src/pages/layout.tsx` handles sidebar menu, navbar, breadcrumbs, and content area. Layout visibility controlled by settings and URL parameters.

**State Management**: Redux handles global state (user info, app settings). Local state uses hooks with localStorage persistence utilities.

**Mock System**: Development uses Mock.js for API simulation. Mock files in `src/mock/` are imported in `_app.tsx`.

### Development Notes

- Uses `@` alias for `src/` directory
- Page routing follows Next.js file-based routing with nested structures
- Component styles use CSS modules with `.module.less` extension
- All pages support i18n through locale files
- Permission-based rendering ensures secure access control
- Pre-commit hooks enforce code quality (ESLint + Stylelint + Prettier)
