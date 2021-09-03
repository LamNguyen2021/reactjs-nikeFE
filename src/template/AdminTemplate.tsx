import React from "react";
import { Props } from "../Model/IPage";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
const AdminLayout = (props: Props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};
const AdminTemplate: React.SFC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(propsComponent: RouteComponentProps<{}>) => {
        return (
          <AdminLayout>
            <Component {...propsComponent} />
          </AdminLayout>
        );
        // if (localStorage.getItem('admin')) {
        //   return (
        //     <AdminLayout>
        //       <Component {...propsComponent} />
        //     </AdminLayout>
        //   );
        // } else {
        //   return <Redirect to='/admin' />;
        // }
      }}
    />
  );
};
export default AdminTemplate;
