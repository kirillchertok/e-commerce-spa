# 2ND HAND MARKET

A SPA e-commerce app for vintage clothing and second-hand goods, built with **React**, **TypeScript**, and **Vite**.

---

## Features

- product catalog with filtering, sorting, and search;
- product details page;
- cart and checkout via Firestore transaction;
- sign up, sign in, and sign out via Firebase Authentication;
- user's order history;
- favorite items and cart state persisted with Redux Persist;
- caching and server data fetching via TanStack Query;
- private shop routes with redirect back to the original page after sign-in;
- floating WebSocket echo chat on `wss://ws.ifelse.io`.

---

## Stack and Dependencies

- **React 19** and **TypeScript**;
- **Vite**;
- **TanStack Router** and **TanStack Query**;
- **Redux Toolkit**, **React Redux**, and **Redux Persist**;
- **Firebase Authentication** and **Cloud Firestore**;
- **Tailwind CSS** and **Radix UI** / **shadcn** approach;
- **react-icons** and **lucide-react** for icons;
- native **WebSocket API** for the chat.

---

## Getting Started

Requires **Node.js 20+** and **npm**.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Quality checks:

```bash
npm run lint
npm run typecheck
```

---

## Environment Variables

To use Firebase, create `.env.local` and specify:

```env
VITE_USE_FIREBASE=true
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> When `VITE_USE_FIREBASE=false`, the app runs in a local mode if supported by a specific API module. Firestore data must be prepared separately, and access rules live in `firestore.rules`.

---

## Project Structure

The project follows the **feature-sliced design** principle:

- `src/app` — layout, providers, and store;
- `src/entities` — domain entities for products and orders;
- `src/features` — auth, cart, favorites, filters, sorting, and chat;
- `src/pages` — route pages;
- `src/widgets` — large compositional UI blocks;
- `src/shared` — UI components, configuration, constants, and utilities.

---

## Deployment

The deployment link will be added after the project is published.

```
https://e-commerce-spa-nu.vercel.app/
```

**Email:** `kirilka2005228@gmail.com`
**Password:** `123kirill123`
