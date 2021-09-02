import userService from "../../../../../Service/UserService";
import { setUserProfile } from "../reducer/userProfileReducer";

export const fetchApiUserProfile = (token: string) => {
  return async (dispatch: any) => {
    try {
      const userProfile = await userService.getUserProfile(token);
      dispatch(setUserProfile(userProfile.data));
    } catch (err) {
      console.log({ ...err.response.data });
    }
  };
};
