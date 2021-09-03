import API from "../Config/api";
import { API_NIKE } from "../Config/url";
import { CreateUserProfile, Login, SignUp } from "../Model/IUser";

class UserService {
  logOut = () => {
    localStorage.clear();
  };

  getAccessToken = () => localStorage.getItem("accessToken");

  getUser = () => {
    const user = localStorage.getItem("user") || "";
    return user;
  };

  getPerson = () => {
    const person = localStorage.getItem("person") || "";
    return person;
  };

  login = (user: Login) => {
    return API("auth/login", "POST", user, "");
  };

  signUp = (user: SignUp) => {
    return API("user", "POST", user, "");
  };

  loginGoogle = (token: any) => {
    return API(`google/${token}`, "GET", "", "");
  };

  getUserProfile = (token: any) => {
    return API("user/detail", "GET", "", token);
  };

  updateUserProfile = (updateUser: any, token: string) => {
    return API("user/updateProfileUser", "PATCH", updateUser, token);
  };

  updateUserByID = (updateUser: any, id: string, token: string) => {
    return API(`user/update/${id}`, "PATCH", updateUser, token);
  };

  updateUserPassword = (updatePassword: any, token: string) => {
    return API("user/updatePassword", "PATCH", updatePassword, token);
  };

  // create user profile, bên admin, giống signUP. Mốt đổi lại sau, 2 cái này là 1
  createUserProfile = (user: CreateUserProfile) => {
    return API("user/createUserProfile", "POST", user, "");
  };

  getAllUsers = (token: string) => {
    return API("user", "GET", "", token);
  };

  deleteUser = (id: string, token: string) => {
    return API(`user/${id}`, "DELETE", "", token);
  };
}
const userService = new UserService();
export default userService;
