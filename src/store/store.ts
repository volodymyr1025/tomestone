import { configureStore } from "@reduxjs/toolkit";
import symbolReducer from "../features/symbols/symbolsSlice";
import stonesReducer from "../features/stones/stonesSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import containerWidthReducer from "../features/containerWidthSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    symbols: symbolReducer,
    stones: stonesReducer,
    orders: orderReducer,
    products: productReducer,
    auth: authReducer,
    containerWidth: containerWidthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
