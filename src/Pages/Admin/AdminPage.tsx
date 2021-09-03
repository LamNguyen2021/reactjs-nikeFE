import {
  Container,
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import AdminMenu from "../../Layout/Admin/AdminMenu";
import Orders from "../../Layout/Admin/Orders/Orders";
import Products from "../../Layout/Admin/Products/Products";
import CreateUser from "../../Layout/Admin/Users/CreateUser";
import ListUsers from "../../Layout/Admin/Users/ListUsers";
import Users from "../../Layout/Admin/Users/Users";

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

function AdminPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AdminMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Users />
          {/* <Orders /> */}
          {/* <Products /> */}
        </Container>
      </main>
    </div>
  );
}

export default AdminPage;
