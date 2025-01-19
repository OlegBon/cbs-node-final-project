// __mocks__/axios.js
console.log('Axios mock is being used');
export default {
  get: jest.fn().mockResolvedValue({ data: {} }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  // інші методи, які ви використовуєте, також можна замокати
};

