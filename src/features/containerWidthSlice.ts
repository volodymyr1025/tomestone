import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContainerWidthState {
  width: number;
}

const initialState: ContainerWidthState = {
  width: 512,
};

const containerWidthSlice = createSlice({
  name: 'containerWidth',
  initialState,
  reducers: {
    setContainerWidth(state, action: PayloadAction<number>) {
      state.width = action.payload;
    },
  },
});

export const { setContainerWidth } = containerWidthSlice.actions;
export default containerWidthSlice.reducer;
