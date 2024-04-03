import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/Slices/User";
import cartReducer from "../redux/Slices/Cart";

const store = configureStore({
  reducer: {
    User: userReducer,
    Cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
