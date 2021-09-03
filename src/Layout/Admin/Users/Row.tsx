import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

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
    padding: "18px 14px",
    fontSize: 18,
  },
  Form: {
    width: 350,
  },
});

interface IProps {
  user: any;
}

export default function Row({ user }: IProps) {
  const classes = useRowStyles();
  console.log("user: ", user);

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const age = [];
  for (var i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const onSubmit = (data: any) => {};
  const handleDeleteUser = (data: any) => {};

  const capitalizeFirstLetter = (str: any) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
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
              setOpenDialog(!openDialog);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update User</DialogTitle>
        <form className={classes.Form} id="AdminFormDeleteUser">
          <DialogContent>
            <p className={classes.inputContainer}>
              <div>Email:</div>
              <input
                type="text"
                className={classes.Detail}
                placeholder="Email"
                name="email"
              />
            </p>
            <p className={classes.inputContainer}>
              <div>Password:</div>
              <input
                type="password"
                className={classes.Detail}
                placeholder="Password"
                name="password"
              />
            </p>
            <p className={classes.inputContainer}>
              <div>Name:</div>
              <input
                type="text"
                className={classes.Detail}
                placeholder="Name"
                name="name"
              />
            </p>
            <p className={classes.inputContainer}>
              <div>Age:</div>
              <select className={classes.Detail} name="age">
                <option value="">Age</option>
                {listAge}
              </select>
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
