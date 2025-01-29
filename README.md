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
│   ├── tests/
│   │   ├──authMiddleware.test.js
│   │   └──tokenUtils.test.js
│   ├── utils/
│   │   └──tokenUtils.js
│   ├── babel.config.js
│   ├── jest.config.js
│   ├── package.json
│   └── server.js
│
├── database/
│   └── init.sql
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── __mocks__/
    │   │   └──axios.js
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
    ├── babel.config.js
    ├── config-overrides.js
    ├── jest.config.js
    └── package.json
```

## Структура проекту

### Backend

- `config/`: Конфігураційні файли проекту.
  - `config.js`: Основні конфігурації.
  - `db.js`: Налаштування бази даних.
- `controllers/`: Контролери для обробки запитів.
  - `authController.js`: Контролер для аутентифікації.
  - `userController.js`: Контролер для управління користувачами.
- `middleware/`: Проміжні програмні засоби.
  - `authMiddleware.js`: Проміжний засіб для аутентифікації.
- `models/`: Моделі бази даних.
  - `index.js`: Індексація моделей.
  - `User.js`: Модель користувача.
- `routes/`: Маршрути для API.
  - `authRoutes.js`: Маршрути для аутентифікації.
  - `userRoutes.js`: Маршрути для користувачів.
- `tests/`: Тестування.
  - `authMiddleware.test.js`: Тести для authMiddleware.
  - `tokenUtils.test.js`: Тести для utils/tokenUtils.
- `utils/`: Утиліти та допоміжні модулі.
  - `tokenUtils.js`: Функції для роботи з токенами.
- `babel.config.js`: Конфігурація Babel.
- `jest.config.js`: Конфігурація Jest.
- `package.json`: Залежності та налаштування проекту.
- `server.js`: Основний файл сервера.

### Frontend

- `public/`: Публічні файли, доступні з фронтенду.
- `src/`: Вихідний код клієнтської частини.
  - `__mocks__/`: Моки для тестування.
    - `axios.js`: Мок для axios.
  - `components/`: Компоненти React.
    - `AppRoutes.js`: Маршрутизація додатку.
    - `InputField.js`: Компонент вводу.
    - `LoadingSpinner.js`: Компонент індикатора завантаження.
    - `ProtectedRoute.js`: Компонент захищеного маршруту.
    - `UserList.js`: Компонент списку користувачів.
  - `data/`: Сховища даних та зменшувачі Redux.
    - `reducers/`: Зменшувачі для Redux.
      - `UserList.js`: Зменшувач для списку користувачів.
    - `store/`: Сховище Redux.
      - `store.js`: Конфігурація сховища.
  - `pages/`: Сторінки додатку.
    - `Error.js`: Сторінка помилки.
    - `Login.js`: Сторінка входу.
    - `Logout.js`: Сторінка виходу.
    - `Register.js`: Сторінка реєстрації.
    - `Users.js`: Сторінка користувачів.
  - `utils/`: Утиліти та допоміжні модулі.
    - `fetchUsers.js`: Функція для отримання користувачів.
    - `registerUser.js`: Функція для реєстрації користувачів.
    - `verifyToken.js`: Функція для перевірки токенів.
  - `App.js`: Основний компонент додатку.
  - `index.css`: Основні стилі додатку.
  - `index.js`: Вхідна точка додатку.
  - `logo.svg`: Лого додатку.
- `babel.config.js`: Конфігурація Babel.
- `config-overrides.js`: Налаштування перевизначень.
- `jest.config.js`: Конфігурація Jest.
- `package.json`: Залежності та налаштування проекту.

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
