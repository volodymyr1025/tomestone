import { createAsyncThunk } from "@reduxjs/toolkit";
import { SymbolType } from "../../types/types";

interface EditSymbolParams {
  id: string;
  formData: FormData;
}

export const getSymbols = createAsyncThunk<
  SymbolType[],
  void,
  { rejectValue: string }
>("symbols/getSymbols", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/symbols`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch symbols");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createSymbol = createAsyncThunk<
  SymbolType,
  FormData,
  { rejectValue: string }
>("symbols/createSymbol", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/symbol`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Server responded with an error!");
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editSymbol = createAsyncThunk<
  SymbolType,
  EditSymbolParams,
  { rejectValue: string }
>(
  "symbols/editSymbol",
  async (editSymbolParams: EditSymbolParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/symbol/${editSymbolParams.id}`,
        {
          method: "PUT",
          body: editSymbolParams.formData,
        }
      );
      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSymbol = createAsyncThunk<
  SymbolType,
  string,
  { rejectValue: string }
>("Symbols/deleteSymbol", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/symbol/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Server responded with an error!");
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
