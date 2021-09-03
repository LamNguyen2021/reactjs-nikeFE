import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ManageUserState {
  isCRUD: boolean;
}

const initialState = {
  isCRUD: false,
};

export const manageUserSlice = createSlice({
  name: "manageUser",
  initialState,
  reducers: {
    setIsCRUD: (state, action: PayloadAction<boolean>) => {
      state.isCRUD = !state.isCRUD;
    },
  },
});

export const { setIsCRUD } = manageUserSlice.actions;

export default manageUserSlice.reducer;
