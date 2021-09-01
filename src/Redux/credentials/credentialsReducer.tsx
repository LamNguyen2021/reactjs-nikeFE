import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CredentialsState {
  token: string;
  userInfo: {
    id: string;
    role: string;
    username: string;
  };
}

const initialState = {
  token: "",
  userInfo: {},
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<object>) => {
      state.userInfo = { ...action.payload };
    },
  },
});

export const { setToken, setUserInfo } = credentialsSlice.actions;

export default credentialsSlice.reducer;
