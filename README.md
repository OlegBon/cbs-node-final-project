# CBS Node Final Project

## Опис

Цей проект є фінальним завданням для курсу з Node.js. Метою проекту є створення повноцінного веб-додатку, що дозволяє користувачам реєструватися, логінитися, переглядати список користувачів та виконувати інші дії.

## Функціонал

- Реєстрація користувачів
- Авторизація користувачів
- Перегляд списку зареєстрованих користувачів
- Очищення бази даних користувачів
- Вихід із системи

## Використані технології

- Node.js
- Express.js
- React.js
- Redux Toolkit
- Axios
- React Router

## Вимоги до середовища

- Node.js v14.17.0 або вище
- npm v6.14.0 або вище

## Інсталяція

1. Клонування репозиторію:
   ```sh
   git clone https://github.com/OlegBon/cbs-node-final-project.git
   ```
2. Перехід до директорії проекту:

   ```sh
   cd cbs-node-final-project
   ```

3. Встановлення залежностей для сервера:

   ```sh
   cd backend
   npm install
   ```

4. Встановлення залежностей для клієнта:
   ```sh
   cd ../frontend
   npm install
   ```

Якщо потрібно

```sh
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Запуск проекту

1. Запуск сервера:

   ```sh
   cd backend
   npm start або node server.js
   ```

2. Запуск клієнта:
   ```sh
   cd ../frontend
   npm start
   ```

Якщо потрібно

```sh
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Файлова структура

```text
cbs-node-final-project/
│
├── backend/
│   ├── config/
│   │   ├──config.js
│   │   └──db.js
│   ├── controllers/
│   │   ├──authController.js
│   │   └──userController.js
│   ├── middleware/
│   │   └──authMiddleware.js
│   ├── models/
│   │   ├──index.js
│   │   └──User.js
│   ├── routes/
│   │   ├──authRoutes.js
│   │   └──userRoutes.js
│   ├── utils/
│   │   └──tokenUtils.js
│   ├── package.json
│   └── server.js
│
├── database/
│   └── init.sql
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├──AppRoutes.js
    │   │   ├──InputField.js
    │   │   ├──LoadingSpinner.js
    │   │   ├──ProtectedRoute.js
    │   │   └──UserList.js
    │   ├── data/
    │   │   ├── reducers/
    │   │   │   ├──LoadingSpinner.js
    │   │   │   ├──ProtectedRoute.js
    │   │   │   └──UserList.js
    │   │   └── store/
    │   │       └──store.js
    │   ├── pages/
    │   │   ├──Error.js
    │   │   ├──Login.js
    │   │   ├──Logout.js
    │   │   ├──Register.js
    │   │   └──Users.js
    │   ├── utils/
    │   │   ├──fetchUsers.js
    │   │   ├──registerUser.js
    │   │   └──verifyToken.js
    │   ├── App.js
    │   ├── index.css
    │   ├── index.js
    │   └── logo.svg
    │
    └── package.json
```

## Маршрути API

### Аутентифікація

- `POST /auth/register` - Реєстрація нового користувача
- `POST /auth/login` - Вхід користувача
- `GET /auth/verify-token` - Перевірка токену користувача
- `POST /auth/logout` - Вихід користувача

### Користувачі

- `GET /users` - Отримати всіх користувачів (потрібен токен)
- `POST /users/clear` - Очистити базу даних (потрібен токен)

## Автори

- [Oleg Bon](https://github.com/OlegBon)

## Ліцензія

Цей проект ліцензовано відповідно до ліцензії MIT. Див. файл [LICENSE](./LICENSE) для деталей.
