import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { RootState } from "../../../Redux/store";
import userService from "../../../Service/UserService";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";
import { useHistory } from "react-router-dom";
import {
  setIsUpdatedUserProfile,
  setUserProfile,
} from "../../Navbar/NavSub/module/reducer/userProfileReducer";
import {
  setIsLogin,
  setToken,
  setUserInfo,
} from "../../Navbar/SignIn/module/reducer/credentialsReducer";
import { STATUS_CODES } from "http";
import { STATUS } from "../../../Config/statusCode";

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: "40px 48px",
    fontSize: 16,
    minHeight: 500,
  },
  Title: {
    fontSize: 24,
    marginBottom: 36,
  },
  Setting: {
    width: 266,
    paddingRight: 24,
    float: "left",
  },
  SettingItem: {
    lineHeight: 1.75,
    cursor: "pointer",
  },
  SettingItemIcon: {
    paddingRight: 20,
    width: 26,
  },
  AccountContainer: {
    marginLeft: 406,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  AccountDetail: {
    width: 415,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe0000",
  },
  ButtonSubmit: {
    outline: "none",
    lineHeight: "24px",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
}));

export default function UserChangePassword() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useAppDispatch();
  const userProfile: any = useAppSelector(
    (state: RootState) => state.userProfileReducer.userProfile
  );
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );

  type FormUpdatePasswordValues = {
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormUpdatePasswordValues>();

  const onSubmitUpdatePassword = async (data: any) => {
    try {
      const updatePassword = await userService.updateUserPassword(data, token);
      if (updatePassword.data.statusCode === STATUS.REDIRECT) {
        notifiSuccess("Update password successfully");

        reset();

        localStorage.clear();
        dispatch(setIsLogin(false));
        dispatch(setToken(""));
        dispatch(setUserInfo({}));
        dispatch(setUserProfile({}));

        dispatch(setIsUpdatedUserProfile(true));

        history.push("/");
      }
    } catch (err) {
      console.log({ ...err });
    }
  };

  return (
    <form
      id="formUserProfile"
      onSubmit={handleSubmit(onSubmitUpdatePassword)}
      style={{ marginLeft: "100px" }}
    >
      <div className={classes.Title}>Account Detail</div>
      <div className={classes.inputContainer}></div>
      <div className={classes.inputContainer}>
        <div>Password:</div>
        <input
          type="password"
          className={classes.Detail}
          placeholder="Password"
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
      <button className={classes.ButtonSubmit} type="submit">
        Save
      </button>
    </form>
  );
}
