import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './authActions';

interface authState {
    user: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
const initialState: authState = {
  user: "",
  status: 'idle',
  error: null
};

const orderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An undefined error occurred';
      });
  }
});

export default orderSlice.reducer;
