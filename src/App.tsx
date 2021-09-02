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
} from "./Layout/Navbar/SignIn/module/reducer/credentialsReducer";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const person = localStorage.getItem("person");

  useEffect(() => {
    dispatch(setIsLogin(false));
    if (token && person) {
      dispatch(setToken(token));
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(JSON.parse(person)));
    }
  }, [token, person, dispatch]);

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
