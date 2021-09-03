import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductDetail {
  productDetail: object;
}

const initialState = {
  productDetail: {},
};

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<object>) => {
      state.productDetail = { ...action.payload };
    },
  },
});

export const { setProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;
