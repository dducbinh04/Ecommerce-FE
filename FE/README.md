# FE

Frontend for `product-management-system-g4`.

## Stack

- React 19
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Yeu cau moi truong

- Node.js 20.19+ hoac 22.12+ vi project dang dung Vite 7.
- npm di kem Node.js.

Kiem tra version:

```bash
node -v
npm -v
```

## Cai dat va chay local

Di vao thu muc FE:

```bash
cd FE
```

Cai dependencies:

```bash
npm install
```

Chay dev server:

```bash
npm run dev
```

Mac dinh Vite se chay tai:

```text
http://localhost:5173/
```

Neu port `5173` dang ban, Vite se tu dong doi sang port khac, vi du:

```text
http://localhost:5174/
```

## Build production

Kiem tra project co build duoc khong:

```bash
npm run build
```

Neu build thanh cong, output se duoc tao trong thu muc:

```text
dist/
```

## Preview ban build

Sau khi build, co the preview ban production bang lenh:

```bash
npm run preview
```

## Trang thai kiem tra

Da kiem tra FE voi:

```bash
npm install
npm run build
npm run dev -- --host 127.0.0.1
```

Ket qua:

- `npm install`: thanh cong.
- `npm run build`: thanh cong.
- Dev server: chay duoc va tra ve HTTP `200`.

Luu y: `index.html` can tro dung entry file `src/main.jsx`.

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
