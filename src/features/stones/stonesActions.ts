import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoneType } from "../../types/types";

interface EditStoneParams {
  id: string;
  formData: FormData;
}

export const getStones = createAsyncThunk<
  StoneType[],
  void,
  { rejectValue: string }
>("stones/getStones", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stones`);
    if (!response.ok) {
      throw new Error("Failed to fetch stones");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createStone = createAsyncThunk<
  StoneType,
  FormData,
  { rejectValue: string }
>("stones/createStone", async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stone`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Server responded with an error!");
    }
    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editStone = createAsyncThunk<
  StoneType,
  EditStoneParams,
  { rejectValue: string }
>(
  "stones/editStone",
  async (editStoneParams: EditStoneParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/stone/${editStoneParams.id}`,
        {
          method: "PUT",
          body: editStoneParams.formData,
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

export const deleteStone = createAsyncThunk<
  StoneType,
  string,
  { rejectValue: string }
>("stones/deleteStone", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/stone/${id}`,
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
