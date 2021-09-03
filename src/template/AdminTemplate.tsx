import React from "react";
import { Props } from "../Model/IPage";
import {
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { Box, Container, CssBaseline, makeStyles } from "@material-ui/core";
import AdminMenu from "../Layout/Admin/AdminMenu";
import userService from "../Service/UserService";
import { USER_ROLE } from "../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const AdminLayout = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
          <Box pt={4}>{/* <AdminFooter /> */}</Box>
        </Container>
      </main>
    </div>
  );
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
        const user: string = userService.getPerson();
        if (JSON.parse(user).role === USER_ROLE.ADMIN) {
          return (
            <AdminLayout>
              <Component {...propsComponent} />
            </AdminLayout>
          );
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
export default AdminTemplate;
