import { createSlice } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageURL: string[];
  category: string;
  type: string;
  sizes: string;
  ratings?: [{ rating: number; userId: string }];
  colors: string;
  quantity: number;
}

type InitialStateProp = {
  cartItems: Product[];
  totalPrice: number;
};

const initialState: InitialStateProp = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      const itemPrice = parseFloat(action.payload.price);

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex].quantity += 1;
        state.totalPrice += itemPrice;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        state.totalPrice += itemPrice;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      // Ensure the item was found before proceeding.
      if (itemIndex !== -1) {
        const itemPrice = parseFloat(state.cartItems[itemIndex].price);

        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
          state.totalPrice -= itemPrice;
        } else {
          state.totalPrice -= itemPrice;
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
