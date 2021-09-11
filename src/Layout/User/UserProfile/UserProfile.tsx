import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { RootState } from "../../../Redux/store";
import userService from "../../../Service/UserService";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";
import { useHistory } from "react-router-dom";
import UserChangePassword from "./UserChangePassword";

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
    // marginLeft: 406,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
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
    padding: "12px",
    fontSize: 14,
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

export default function UserProfile() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useAppDispatch();
  const userProfile: any = useAppSelector(
    (state: RootState) => state.userProfileReducer.userProfile
  );
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );

  React.useEffect(() => {
    // dispatch(fetchApiUserProfile(token));

    // setValue("username", userProfile.username);
    // setValue("email", userProfile.email);
    setValue("name", userProfile.name);
    setValue("yearOfBirth", userProfile.yearOfBirth);
    setValue("address", userProfile.address);
  }, [userProfile]);

  type FormUpdateValues = {
    // username: string;
    // email: string;
    name: string;
    yearOfBirth: number;
    address: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormUpdateValues>();

  const onSubmitUpdate = async (data: any) => {
    console.log(data);

    try {
      const updateUserResponse = await userService.updateUserProfile(
        { ...data, yearOfBirth: parseInt(data.yearOfBirth) },
        token
      );
      notifiSuccess("Update user profile successfully");
      reset();

      history.push("/");
    } catch (err) {
      // const error = { ...err };
      // notifiError(error.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className={classes.Container}>
      <div>
        <div className={classes.AccountContainer}>
          <div className={classes.AccountDetail}>
            <form id="formUserProfile" onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className={classes.Title}>Account Detail</div>
              <div className={classes.inputContainer}>
                <div>Email:</div>
                <input
                  value={userProfile.email}
                  disabled
                  type="text"
                  placeholder="Email"
                  className={classes.Detail}
                  // {...register("email", {
                  //   required: "Email is required",
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //     message:
                  //       "Please enter a vaid email address. Ex: example@gmail.com",
                  //   },
                  // })}
                />
                {/* {errors.email && (
                  <p className={classes.inputValid}>{errors.email.message}</p>
                )} */}
              </div>

              <div className={classes.inputContainer}>
                <div>Username:</div>
                <input
                  value={userProfile.username}
                  disabled
                  type="text"
                  className={classes.Detail}
                  placeholder="Name"
                  // {...register("username", {
                  //   required: "Username is required",
                  // })}
                />
                {/* {errors.username && (
                  <p className={classes.inputValid}>
                    {errors.username.message}
                  </p>
                )} */}
              </div>
              <div className={classes.inputContainer}>
                <div>Fullname:</div>
                <input
                  type="text"
                  className={classes.Detail}
                  placeholder="Fullname"
                  {...register("name", {
                    required: "Fullname is required",
                  })}
                />
                {errors.name && (
                  <p className={classes.inputValid}>{errors.name.message}</p>
                )}
              </div>
              <div className={classes.inputContainer}>
                <div>Year of Birth:</div>
                <input
                  type="text"
                  className={classes.Detail}
                  placeholder="Year of Birth"
                  {...register("yearOfBirth", {
                    required: "Year of birth is required",
                    min: {
                      value: 1940,
                      message: "year of birth must be greater than 1940",
                    },
                    max: {
                      value: 2003,
                      message: "year of birth must be less than 2003",
                    },
                  })}
                />
                {errors.yearOfBirth && (
                  <p className={classes.inputValid}>
                    {errors.yearOfBirth.message}
                  </p>
                )}
              </div>
              <div className={classes.inputContainer}>
                <div>Address:</div>
                <input
                  type="text"
                  className={classes.Detail}
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className={classes.inputValid}>{errors.address.message}</p>
                )}
              </div>

              <button className={classes.ButtonSubmit} type="submit">
                Save
              </button>
            </form>
          </div>
          <div className={classes.AccountDetail}>
            <UserChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
