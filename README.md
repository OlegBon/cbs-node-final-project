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
   cd server
   npm install
   ```

4. Встановлення залежностей для клієнта:
   ```sh
   cd ../frontend
   npm install
   ```

## Запуск проекту

1. Запуск сервера:

   ```sh
   cd server
   npm start
   ```

2. Запуск клієнта:
   ```sh
   cd ../frontend
   npm start
   ```

## Файлова структура

````text
cbs-node-final-project/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
    ```

## Автори
- [Oleg Bon](https://github.com/OlegBon)

## Ліцензія
Цей проект ліцензовано відповідно до ліцензії MIT. Див. файл [LICENSE](./LICENSE) для деталей.
````
