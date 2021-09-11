import React from "react";
import { Dialog, IconButton, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import userService from "../../Service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginSocial } from "../../Model/IUser";
import { STATUS } from "../../Config/statusCode";
import { notifiError, notifiSuccess } from "../../utils/MyToys";

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
  SignUpContainer: {
    margin: "0 28px",
    padding: 28,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  closeSignUp: {
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
  buttonSignUp: {
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
    display: "flex",
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
  data: LoginSocial;
  getDataLoginGoogle: (data: any) => void;
}

export default function SignUp(props: Props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.data?.statusCode === STATUS.REDIRECT) {
      notifiSuccess("please fill out all fields to sign up");
      handleClickOpen();
      setValue("email", props.data.data.email);
      setValue("name", props.data.data?.name);
    }
  }, [props.data]);

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
    props.getDataLoginGoogle(null);
  };

  type FormSignUpValues = {
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
    setValue,
  } = useForm<FormSignUpValues>();

  const onSubmitSignUp = async (data: any) => {
    try {
      const user = await userService.createUserProfile({
        ...data,
        yearOfBirth: parseInt(data.yearOfBirth),
      });

      reset();
      handleClose();

      notifiSuccess("Saved user's data into database");
    } catch (err) {
      notifiError("Username or email is existed");
    }
  };

  return (
    <>
      <span className={classes.navListFeature} onClick={handleClickOpen}>
        Sign Up
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
        <div className={classes.SignUpContainer}>
          {/*Close button*/}
          <IconButton className={classes.closeSignUp} onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          {/*Header*/}
          <div className={classes.formHeader}>YOUR ACCOUNT FOR EVERYTHING</div>

          {/*Form*/}
          <form id="formSignUp" onSubmit={handleSubmit(onSubmitSignUp)}>
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
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Full name"
                className={classes.input}
                {...register("name", {
                  required: "Fullname is required",
                })}
              />
              {errors.name && (
                <p className={classes.inputValid}>{errors.name.message}</p>
              )}
            </div>
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Username"
                className={classes.input}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className={classes.inputValid}>{errors.username.message}</p>
              )}
            </div>
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Year Of Birth"
                className={classes.input}
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
              <input
                type="text"
                placeholder="Address"
                className={classes.input}
                {...register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className={classes.inputValid}>{errors.address.message}</p>
              )}
            </div>

            {/*Sign In*/}
            <input
              className={classes.buttonSignUp}
              type="submit"
              value="SIGN UP"
            />
          </form>
        </div>
      </Dialog>
      <ToastContainer />
    </>
  );
}
