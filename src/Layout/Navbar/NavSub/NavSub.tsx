import React, { useState, useEffect } from "react";
import {
  AppBar,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { RootState } from "../../../Redux/store";
import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "../SignIn/module/reducer/credentialsReducer";
import { notifiSuccess } from "../../../utils/MyToys";
import { LoginSocial } from "../../../Model/IUser";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp";
import { PATH_NAME, USER_ROLE } from "../../../Config";
import { fetchApiUserProfile } from "./module/action/action";
import { useHistory } from "react-router-dom";

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
  const userProfile: any = useAppSelector(
    (state: RootState) => state.userProfileReducer.userProfile
  );
  const isUpdatedUserProfile: boolean = useAppSelector(
    (state: RootState) => state.userProfileReducer.isUpdatedUserProfile
  );

  const getDataLoginGoogle = (data: LoginSocial) => {
    console.log("data login google", data);

    // data = {email: "9.4ngoclam@gmail.com", name: "Ngoc Lam Nguyen"},statusCode 308
    setData(data);
  };

  const handleLogout = () => {
    localStorage.clear();

    dispatch(setIsLogin(false));
    dispatch(setToken(""));
    dispatch(setUserInfo({}));
    notifiSuccess("GOOD BYE");

    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  //========== xử lý khi click vào icon user ==========
  let history = useHistory();
  const [user, setUser] = React.useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleClickIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseIcon = () => {
    setAnchorEl(null);
  };
  const handleViewMyAccount = () => {
    handleCloseIcon();
    setOpenDialog(true);
    dispatch(fetchApiUserProfile(token));
  };
  const handleUpdateProfile = () => {
    handleCloseIcon();
    dispatch(fetchApiUserProfile(token));
    history.push(PATH_NAME.USER_PROFILE);
  };

  return (
    <AppBar position="static" className={classes.header}>
      <div className={classes.toolbar}>
        {userInfo && isLogin ? (
          <>
            <IconButton onClick={handleClickIcon}>
              <AccountCircleIcon style={{ cursor: "pointer" }} />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseIcon}
            >
              <MenuItem onClick={handleViewMyAccount}>My account</MenuItem>

              {userInfo.role === USER_ROLE.USER && (
                <MenuItem onClick={() => history.push(PATH_NAME.USER_ORDER)}>
                  My orders
                </MenuItem>
              )}

              <MenuItem onClick={handleUpdateProfile}>Edit profile</MenuItem>
              {userInfo.role === USER_ROLE.ADMIN && (
                <MenuItem
                  onClick={() => {
                    history.push(PATH_NAME.ADMIN_USER);
                  }}
                >
                  View Dashboard
                </MenuItem>
              )}
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
            <SignIn
              isUpdatedUserProfile
              getDataLoginGoogle={getDataLoginGoogle}
            />
            <SignUp data={data} getDataLoginGoogle={getDataLoginGoogle} />
          </>
        )}
      </div>
      <Dialog
        onClose={() => setOpenDialog(false)}
        aria-labelledby="simple-dialog-title"
        open={openDialog}
      >
        <DialogTitle id="simple-dialog-title">Your information</DialogTitle>
        <List>
          <ListItem>
            <ListItemText primary={`id: ${userProfile._id}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${userProfile.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Username: ${userProfile.username}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Full name: ${userProfile.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Year of Birth: ${userProfile.yearOfBirth}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Address: ${userProfile.address}`} />
          </ListItem>
        </List>
      </Dialog>
    </AppBar>
  );
}
