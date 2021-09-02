import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileState {
  userProfile: object;
  isUpdatedUserProfile: boolean;
}

const initialState = {
  userProfile: {},
  isUpdatedUserProfile: false,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<object>) => {
      state.userProfile = { ...action.payload };
    },
    setIsUpdatedUserProfile: (state, action: PayloadAction<boolean>) => {
      state.isUpdatedUserProfile = action.payload;
    },
  },
});

export const { setUserProfile, setIsUpdatedUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
