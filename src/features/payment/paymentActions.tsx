import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreatePaymentInfo } from "../../types/types";

export const createPayment = createAsyncThunk<
  String,
  CreatePaymentInfo,
  { rejectValue: string }
>("payment/createPayment", async (paymentInfo, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/create-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      }
    );
    if (!response.ok) {
      const errorOrderMsg = await response.text();
      throw new Error(errorOrderMsg || 'Failed to create order');
    }

    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
