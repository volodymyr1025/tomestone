import { createSlice } from "@reduxjs/toolkit";
import {
  createStone,
  deleteStone,
  editStone,
  getStones,
} from "./stonesActions";
import { StoneType } from "../../types/types";

interface StonesState {
  items: StoneType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StonesState = {
  items: [],
  status: "idle",
  error: null,
};

const stoneSlice = createSlice({
  name: "stones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStones.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStones.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getStones.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(createStone.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStone.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createStone.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload as string);
      });
    builder
      .addCase(editStone.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editStone.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (stone) => stone._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(editStone.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload as string);
      });
    builder
      .addCase(deleteStone.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStone.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (stone) => stone._id === action.payload._id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.status = "succeeded";
      })
      .addCase(deleteStone.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload as string);
      });
  },
});

export default stoneSlice.reducer;
