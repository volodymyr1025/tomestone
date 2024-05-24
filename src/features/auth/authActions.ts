import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthType } from "../../types/types";

export const signIn = createAsyncThunk<
  string,
  AuthType,
  { rejectValue: string }
>("auth/signIn", async (authInfo, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authInfo),
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
