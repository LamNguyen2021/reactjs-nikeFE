import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";
import userService from "../../../Service/UserService";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { RootState } from "../../../Redux/store";
import { setIsCRUD } from "./module/manageUserReducer";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  imgFavorite: {
    height: 100,
  },
  modifyUser: {
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "red",
    },
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
    width: 350,
  },
});

interface IProps {
  user: any;
  findUser: Function;
}

export default function Row({ user, findUser }: IProps) {
  const classes = useRowStyles();
  const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [id, setId] = React.useState("");
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );

  //======== Update User =======
  const handleOpenDialog = (id: string) => {
    setId(id);
    const userProfile: any = findUser(id);

    setValue("email", userProfile.email);
    setValue("name", userProfile.name);
    setValue("yearOfBirth", userProfile.yearOfBirth);
    setValue("address", userProfile.address);
    setValue("statusId", userProfile.status._id);
    setValue("roleId", userProfile.role._id);

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);
  };

  type FormCreateUserValues = {
    password: string;
    email: string;
    name: string;
    yearOfBirth: number;
    address: string;
    statusId: string;
    roleId: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormCreateUserValues>();

  const onSubmitEdit = async (data: any) => {
    try {
      data = {
        ...data,
        yearOfBirth: parseInt(data.yearOfBirth),
      };
      const updateUser = await userService.updateUserByID(data, id, token);

      reset();
      dispatch(setIsCRUD(true));
      notifiSuccess("Update user profile successfully");
      handleCloseDialog();
    } catch (err) {
      const error = { ...err };
      notifiError(error.response.data.message);
    }
  };

  //======== Delete User =======
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = (id: string) => {
    setId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleDeleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id, token);
      setOpenConfirm(false);
      dispatch(setIsCRUD(true));
      notifiSuccess("Delete user successfully");
    } catch (err) {
      console.log({ ...err });
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user.name}</TableCell>
        <TableCell align="left">{user.yearOfBirth}</TableCell>
        <TableCell align="left">{user.address}</TableCell>
        <TableCell align="left">{user.status.nameStatus}</TableCell>
        <TableCell align="left">{user.role.nameRole}</TableCell>
        <TableCell>
          <IconButton
            color="primary"
            onClick={() => {
              handleOpenDialog(user._id);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              handleOpenConfirm(user._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Update Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update User</DialogTitle>
        <form
          className={classes.Form}
          id="AdminFormEditUser"
          onSubmit={handleSubmit(onSubmitEdit)}
        >
          <DialogContent>
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
              <div>Full name:</div>
              <input
                type="text"
                className={classes.Detail}
                placeholder="Full name"
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
            <div className={classes.inputContainer}>
              <div>Status:</div>
              <select
                {...register("statusId", {
                  required: "Status is required",
                })}
                className={classes.Detail}
              >
                <option value="610bf10cdccf125e487e1b4b">Active</option>
                <option value="610bf113dccf125e487e1b4d">Inactive</option>
              </select>
              {errors.statusId && (
                <p className={classes.inputValid}>{errors.statusId.message}</p>
              )}
            </div>
            <div className={classes.inputContainer}>
              <div>Role:</div>
              <select
                {...register("roleId", {
                  required: "Role is required",
                })}
                className={classes.Detail}
              >
                <option value="60f32404d29b52428cff51f4">User</option>
                <option value="60f3239ad29b52428cff51f2">Admin</option>
              </select>
              {errors.roleId && (
                <p className={classes.inputValid}>{errors.roleId.message}</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to DELETE ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            No
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              handleDeleteUser(id);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
