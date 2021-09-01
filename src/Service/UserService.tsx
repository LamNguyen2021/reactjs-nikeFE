import API from "../Config/api";
import { API_NIKE } from "../Config/url";
import { Login, SignUp } from "../Model/IUser";

class UserService {
  logOut = () => {
    localStorage.clear();
  };
  getAccessToken = () => localStorage.getItem("accessToken");
  getUser = () => {
    const user = localStorage.getItem("user") || "";
    return user;
  };
  getAdmin = () => {
    const admin = localStorage.getItem("admin") || "";
    return admin;
  };
  login = (user: Login) => {
    return API("auth/login", "POST", user, "");
  };

  signUp = (user: SignUp) => {
    return API("user", "POST", user, "");
  };
}
const userService = new UserService();
export default userService;
