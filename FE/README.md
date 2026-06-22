# FE

Frontend for `product-management-system-g4`.

## Stack

- React 18
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Structure

- `src/assets`: static assets
- `src/components`: shared components
- `src/components/ui`: reusable UI atoms
- `src/components/layout`: layout pieces
- `src/features`: feature-based modules
- `src/hooks`: shared hooks
- `src/layouts`: page shells and app layouts
- `src/pages`: route-level pages
- `src/routes`: router config
- `src/services`: API clients and service layer
- `src/stores`: global state management
- `src/styles`: global styles and Tailwind entry
- `src/types`: shared TypeScript types
- `src/utils`: helper functions
- `src/constants`: app constants

## Suggested flow

- Put API calls in `src/services`
- Put business logic in `src/features`
- Keep route pages thin in `src/pages`
- Keep reusable UI in `src/components/ui`
