import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "../reducer/credentialsReducer";
import userService from "../../../../../Service/UserService";
import { notifiError, notifiSuccess } from "../../../../../utils/MyToys";

export const fetchApiLogin = (data: any) => {
  return async (dispatch: any) => {
    try {
      const user = await userService.login(data);
      dispatch(setToken(user.data.access_token));
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(user.data.info));
      localStorage.setItem("accessToken", user.data.access_token);
      localStorage.setItem("person", JSON.stringify(user.data.info));
      notifiSuccess("Sign in successfully");
    } catch (err) {
      const error = { ...err };
      notifiError(error.response.data.message);
    }
  };
};
