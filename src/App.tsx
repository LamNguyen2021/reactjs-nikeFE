import React, { useEffect } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Page } from "./Model/IPage";
import HomeTemplate from "./template/HomeTemplate";
import { routesAdmin, routesHome } from "./Route/route";
import AdminTemplate from "./template/AdminTemplate";
import { useAppDispatch } from "./Hooks/Hook";
import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "./Redux/credentials/credentialsReducer";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const userInfo = localStorage.getItem("user");
  const adminInfo = localStorage.getItem("admin");

  useEffect(() => {
    dispatch(setIsLogin(false));
    if (token && userInfo) {
      dispatch(setToken(token));
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(JSON.parse(userInfo)));
    } else if (token && adminInfo) {
      dispatch(setToken(token));
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(JSON.parse(adminInfo)));
    }
  }, [token, userInfo, adminInfo, dispatch]);

  const showHomeLayout = (routesHome: Page[]) => {
    if (routesHome && routesHome.length > 0) {
      return routesHome.map((item: Page, index: number) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        );
      });
    }
  };
  const showAdminLayout = (routesAdmin: Page[]) => {
    if (routesAdmin && routesAdmin.length > 0) {
      return routesAdmin.map((item: Page, index: number) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        {showHomeLayout(routesHome)}
        {showAdminLayout(routesAdmin)}
        <h1>hello</h1>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
