# 2ND HAND MARKET

SPA интернет-магазина винтажной одежды и товаров second hand на React, TypeScript и Vite.

## Функциональность

- каталог товаров с фильтрацией, сортировкой и поиском;
- страница деталей товара;
- корзина и оформление заказа через транзакцию Firestore;
- регистрация, вход и выход через Firebase Authentication;
- список заказов пользователя;
- избранные товары и состояние корзины в Redux Persist;
- кеширование и загрузка серверных данных через TanStack Query;
- приватные shop-маршруты с возвратом на исходную страницу после входа;
- floating WebSocket echo chat на `wss://ws.ifelse.io`.

## Стек и зависимости

- React 19 и TypeScript;
- Vite;
- TanStack Router и TanStack Query;
- Redux Toolkit, React Redux и Redux Persist;
- Firebase Authentication и Cloud Firestore;
- Tailwind CSS и Radix UI / shadcn-подход;
- `react-icons` и `lucide-react` для иконок;
- native WebSocket API для чата.

## Запуск

Требуется Node.js 20+ и npm.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Проверки качества:

```bash
npm run lint
npm run typecheck
```

## Переменные окружения

Для работы Firebase создай `.env.local` и укажи:

```env
VITE_USE_FIREBASE=true
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

При `VITE_USE_FIREBASE=false` приложение использует локальный режим, если он поддерживается конкретным API-модулем. Данные для Firestore должны быть подготовлены отдельно, а правила доступа находятся в `firestore.rules`.

## Структура проекта

Проект организован по feature-sliced принципу:

- `src/app` — layout, providers и store;
- `src/entities` — доменные сущности товаров и заказов;
- `src/features` — auth, cart, favorites, filters, sorting и chat;
- `src/pages` — страницы маршрутов;
- `src/widgets` — крупные композиционные блоки интерфейса;
- `src/shared` — UI-компоненты, конфигурация, константы и утилиты.

## Деплой

Ссылка на деплой будет добавлена после публикации проекта.
