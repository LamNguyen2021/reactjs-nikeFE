import userService from "../../../Service/UserService";

export const fetchApiUserInfo = async (token: any) => {
  try {
    const userInfo = await userService.getUserInfo(token);
    return userInfo;
  } catch (err) {
    console.log({ ...err.response.data });
  }
};
