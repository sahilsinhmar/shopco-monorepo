import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string | null;
  isAdmin: boolean;
  token: string | null;
}

const initialState: User = {
  name: null,
  isAdmin: false,
  token: null,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin,
        token: action.payload.token,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        name: null,
        isAdmin: false,
        token: null,
      };
    },
  },
});

export const { addUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
