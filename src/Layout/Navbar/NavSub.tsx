import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { RootState } from "../../Redux/store";
import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "./SignIn/module/reducer/credentialsReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifiSuccess } from "../../utils/MyToys";
import { LoginSocial } from "../../Model/IUser";

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
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<LoginSocial>({} as LoginSocial);
  const isLogin = useAppSelector(
    (state: RootState) => state.credentialsReducer.isLogin
  );
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );
  const userInfo: any = useAppSelector(
    (state: RootState) => state.credentialsReducer.userInfo
  );
  const getDataLoginGoogle = (data: LoginSocial) => {
    // data = {email: "9.4ngoclam@gmail.com", name: "Ngoc Lam Nguyen"},statusCode 308
    setData(data);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setIsLogin(false));
    dispatch(setToken(""));
    dispatch(setUserInfo({}));
    notifiSuccess("GOOD BYE");
  };

  // xử lý khi click vào icon user
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.header}>
      <div className={classes.toolbar}>
        {userInfo && isLogin ? (
          <>
            <IconButton onClick={handleClick}>
              <AccountCircleIcon style={{ cursor: "pointer" }} />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            <span className={classes.greeting}>Hello, {userInfo.username}</span>
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
            <SignIn getDataLoginGoogle={getDataLoginGoogle} />
            <SignUp data={data} getDataLoginGoogle={getDataLoginGoogle} />
          </>
        )}
      </div>
      <ToastContainer />
    </AppBar>
  );
}
