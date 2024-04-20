import { createSlice } from "@reduxjs/toolkit";

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  type: string;
  sizes: string[];
  colors: string[];
}

interface ProductState {
  products: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  loading: false,
  error: null,
};

export const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
});
