import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    setMessage: (state, action) => action.payload,
    clearMessage: () => '',
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
