import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CredentialsState {
  token: string;
  userInfo: {
    id: string;
    role: string;
    username: string;
  };
  isLogin: boolean;
}

const initialState = {
  token: "",
  userInfo: {},
  isLogin: false,
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
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setToken, setUserInfo, setIsLogin } = credentialsSlice.actions;

export default credentialsSlice.reducer;
