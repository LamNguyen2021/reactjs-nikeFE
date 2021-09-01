import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Page } from "./Model/IPage";
import HomeTemplate from "./template/HomeTemplate";
import { routesAdmin, routesHome } from "./Route/route";
import AdminTemplate from "./template/AdminTemplate";
import { useAppDispatch } from "./Hooks/Hook";
import { setToken, setUserInfo } from "./Redux/credentials/credentialsReducer";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  if (token) {
    dispatch(setToken(token));
  }

  const userInfo = localStorage.getItem("user");
  const adminInfo = localStorage.getItem("admin");

  if (userInfo) {
    dispatch(setUserInfo(JSON.parse(userInfo)));
  }

  if (adminInfo) {
    dispatch(setUserInfo(JSON.parse(adminInfo)));
  }

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
