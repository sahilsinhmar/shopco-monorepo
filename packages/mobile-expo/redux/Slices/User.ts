import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type UserState = {
  userInfo: User | null;
  token: string | null;
};

const initialState: UserState = {
  userInfo: null,
  token: null,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        userInfo: action.payload.user,
        token: action.payload.token,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        userInfo: null,
        token: null,
      };
    },
  },
});

export const { addUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
