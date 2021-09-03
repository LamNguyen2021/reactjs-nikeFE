import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";
import { useForm } from "react-hook-form";
import userService from "../../../Service/UserService";
import { setIsCRUD } from "./module/manageUserReducer";
import { useAppDispatch } from "../../../Hooks/Hook";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginBottom: 100,
  },
  Title: {
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
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    fontSize: 14,
  },
  Form: {
    width: "50%",
  },
}));

function CreateUser() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  type FormCreateUserValues = {
    username: string;
    password: string;
    email: string;
    name: string;
    yearOfBirth: number;
    address: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateUserValues>();

  const onSubmitSignUp = async (data: any) => {
    try {
      const user = await userService.createUserProfile({
        ...data,
        yearOfBirth: parseInt(data.yearOfBirth),
      });
      reset();
      dispatch(setIsCRUD(true));
      notifiSuccess("Saved user's data into database");
    } catch (err) {
      const error = { ...err };
      notifiError(error.response.data.message);
    }
  };

  return (
    <div className={classes.Container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <div className={classes.Title}>Create User Account</div>
        </AccordionSummary>
        <AccordionDetails>
          <form
            className={classes.Form}
            id="AdminFormCreateUser"
            onSubmit={handleSubmit(onSubmitSignUp)}
          >
            <div className={classes.inputContainer}>
              <div>Email:</div>
              <input
                type="text"
                className={classes.Detail}
                placeholder="Email"
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
              <div>Username:</div>
              <input
                type="text"
                placeholder="Username"
                className={classes.Detail}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className={classes.inputValid}>{errors.username.message}</p>
              )}
            </div>
            <div className={classes.inputContainer}>
              <div>Year of Birth:</div>
              <input
                type="text"
                placeholder="Year Of Birth"
                className={classes.Detail}
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
                placeholder="Address"
                className={classes.Detail}
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className={classes.inputValid}>{errors.address.message}</p>
              )}
            </div>
            <button className={classes.ButtonSubmit} type="submit">
              Create User
            </button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CreateUser;
