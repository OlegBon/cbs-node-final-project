import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import usersReducer from '../reducers/usersSlice';
import messageReducer from '../reducers/messageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    message: messageReducer,
  },
});

export default store;
