import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/types';
import { getProduct, createProduct } from './productActions';

interface ProductState {
  product: ProductType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: {},
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default productSlice.reducer;
