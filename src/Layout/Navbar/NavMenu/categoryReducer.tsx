import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryReducer {
  category: object;
}

const initialState = {
  idCategory: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.idCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
