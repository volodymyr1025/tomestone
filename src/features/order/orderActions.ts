import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { OrderDataType } from '../../types/types';

interface OrderRequest {
  subscriberInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  deliveryInfo: {
    address: string;
    locationName?: string;
    deliveryNumber?: string;
    deliveryTime?: string;
  };
  productId?: string;
}

export const createOrder = createAsyncThunk<OrderDataType, OrderRequest, { state: RootState, rejectValue: string }>(
  'orders/createOrder',
  async (orderRequest, { rejectWithValue }) => {
    try {
      const orderResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });

      if (!orderResponse.ok) {
        const errorOrderMsg = await orderResponse.text();
        throw new Error(errorOrderMsg || 'Failed to create order');
      }

      return await orderResponse.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);
