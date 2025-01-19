import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Налаштування мока
const mock = new MockAdapter(axios);

/**
 * Використовується для тестування API-запитів.
 * Приклад - підміняє запит до /api/users.
 */
mock.onGet('/api/users').reply(200, {
  users: [{ id: 1, name: 'John Doe' }],
});

export default mock;
