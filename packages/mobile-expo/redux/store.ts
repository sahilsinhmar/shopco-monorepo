import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/Slices/User";
import cartReducer from "../redux/Slices/Cart";
import orderReducer from "../redux/Slices/Orders";

const store = configureStore({
  reducer: {
    User: userReducer,
    Cart: cartReducer,
    Orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
