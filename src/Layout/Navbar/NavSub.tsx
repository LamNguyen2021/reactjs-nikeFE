import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useAppSelector } from "../../Hooks/Hook";
import { RootState } from "../../Redux/store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "transparent",
    color: "#000",
    boxShadow: "0px 0px 0px 0px",
  },
  toolbar: {
    minHeight: 36,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
  },
  navListFeature: {
    padding: "0 12px",
    textDecoration: "none",
    color: "black",
    fontSize: 13,
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
  greeting: {
    fontSize: 13,
    padding: "0 12px",
    "&:hover": {
      color: "grey",
    },
    cursor: "pointer",
  },
}));

export default function NavSub() {
  const classes = useStyles();
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );
  const userInfo = useAppSelector(
    (state: RootState) => state.credentialsReducer.userInfo
  );

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    const userInfo = localStorage.getItem("user");
    const adminInfo = localStorage.getItem("admin");

    localStorage.removeItem("accessToken");

    if (userInfo) {
      localStorage.removeItem("user");
    }
    if (adminInfo) {
      localStorage.removeItem("admin");
    }
  };

  return (
    <AppBar position="static" className={classes.header}>
      <div className={classes.toolbar}>
        {token ? (
          <>
            <span className={classes.greeting}>
              Hello, Lam. Have a good day
            </span>
            <span
              className={classes.navListFeature}
              style={{ borderLeft: "1px solid #000" }}
              onClick={handleLogout}
            >
              Log out
            </span>
          </>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}
      </div>
    </AppBar>
  );
}
