import { createSlice } from "@reduxjs/toolkit";

type OrderState = {
  orders: any[];
};

const initialState: OrderState = {
  orders: [],
};

export const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
    updateOrdersList: (state, action) => {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    },
    updateOrderStatus: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (orderItem) => orderItem._id === action.payload.id
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].orderStatus = action.payload.status;
      }
    },
  },
});

export const { addOrders, updateOrdersList, updateOrderStatus } =
  OrdersSlice.actions;

export default OrdersSlice.reducer;
