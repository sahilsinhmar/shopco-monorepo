import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/Slices/User";

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
