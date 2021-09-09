import React from "react";
import { Dialog, IconButton, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import userService from "../../../Service/UserService";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "./module/reducer/credentialsReducer";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";
import { STATUS } from "../../../Config/statusCode";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";
import { fetchApiLogin } from "./module/action/Action";
import { RootState } from "../../../Redux/store";
import { setIsUpdatedUserProfile } from "../NavSub/module/reducer/userProfileReducer";
import { useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
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
  backdrop: {
    minHeight: 500,
    margin: "auto",
    width: 512,
    [theme.breakpoints.down("xs")]: {
      width: 320,
    },
  },
  SignInContainer: {
    margin: "0 28px",
    padding: 28,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  closeSignIn: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "black",
  },
  inputContainer: {
    margin: "15px 0",
  },
  input: {
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    color: "#8d8d8d",
    height: 40,
    lineHeight: 17,
    padding: "0 16px",
    outline: 0,
  },
  inputValid: {
    color: "#fe0000",
    fontSize: 12,
  },
  buttonSignIn: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "black",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  nike: {
    width: 50,
    hegiht: 17,
  },
  formHeader: {
    padding: "30px 0",
    margin: "0 auto",
    fontSize: "20px",
    maxWidth: "25ch",
    lineHeight: "26px",
    textAlign: "center",
    fontWeight: 700,
  },
  formSupport: {
    margin: "18px 0",
    color: "#8D8D8D",
    fontSize: 12,
    display: "flex",
  },
  formSupportGrow: {
    flexGrow: 1,
    verticalAlign: "baseline",
  },
  forgotPassword: {
    color: "#8D8D8D",
    textDecoration: "none",
  },
  signInWithNormal: {
    display: "block",
  },
  facebookLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#4267B2",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 190,
  },
  Imange: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  googleLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#DE5246",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  googleContainer: {
    // display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 170,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Props {
  isUpdatedUserProfile: boolean;
  getDataLoginGoogle: (data: any) => void;
}
export default function SignIn(props: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  type FormSignInValues = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSignInValues>();

  const responseGoogle = async (response: any) => {
    //response: thông tin gg trả về: email, fullname, profile, token, ggid...
    const user = await userService.loginGoogle(response.tokenId);
    if (user.data.statusCode === STATUS.REDIRECT) {
      props.getDataLoginGoogle(user.data);
      handleClose();
    } else {
      // status code = 200 -> user đã có trong database
      dispatch(setToken(user.data.access_token));
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(user.data.info));
      // dispatch(fetchApiUserProfile(token));
      localStorage.setItem("accessToken", user.data.access_token);
      localStorage.setItem("person", JSON.stringify(user.data.info));
      notifiSuccess("Sign in successfully");
    }
  };

  const onSubmitSignIn = (data: any) => {
    dispatch(fetchApiLogin(data));
    handleClose();
  };

  let match = useRouteMatch("");
  React.useEffect(() => {
    if (props.isUpdatedUserProfile && match?.url === "/") {
      handleClickOpen();
      dispatch(setIsUpdatedUserProfile(false));
    }
  }, [props.isUpdatedUserProfile]);

  return (
    <>
      <span
        className={classes.navListFeature}
        style={{ borderRight: "1px solid #000" }}
        onClick={handleClickOpen}
      >
        Sign In
      </span>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        classes={{
          root: classes.backdrop,
        }}
      >
        <div className={classes.SignInContainer}>
          {/*Close button*/}
          <IconButton className={classes.closeSignIn} onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          {/*Header*/}
          <div className={classes.formHeader}>YOUR ACCOUNT FOR EVERYTHING</div>

          {/*Form*/}
          <form id="formSignIn" onSubmit={handleSubmit(onSubmitSignIn)}>
            {/*Input*/}
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Email"
                className={classes.input}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message:
                      "Please enter a vaid email address. Ex: example@gmail.com",
                  },
                })}
              />
              {errors.email && (
                <p className={classes.inputValid}>{errors.email.message}</p>
              )}
            </div>
            <div className={classes.inputContainer}>
              <input
                type="password"
                placeholder="Password"
                className={classes.input}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className={classes.inputValid}>{errors.password.message}</p>
              )}
            </div>
            {/*Support*/}
            <div className={classes.formSupport}>
              <span
                className={classes.formSupportGrow}
                style={{ textAlign: "right" }}
              >
                <a href="#" className={classes.forgotPassword}>
                  Forgot password?
                </a>
              </span>
            </div>

            {/*Sign In*/}
            <input
              className={classes.buttonSignIn}
              type="submit"
              value="SIGN IN"
            />

            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              OR
            </span>
          </form>
          {/*Sign In with FB or GG normal*/}
          <span className={classes.signInWithNormal}>
            <GoogleLogin
              clientId="314040454355-n8gc4mqkmh6p7hj0fhdhp5lgamkj7e1k.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className={classes.buttonSignIn}
            />
          </span>
        </div>
      </Dialog>
    </>
  );
}
