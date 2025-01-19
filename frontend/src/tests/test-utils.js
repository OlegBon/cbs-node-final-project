import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../data/store/store'; // Импорт вашего Redux Store

const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>{children}</Provider>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
