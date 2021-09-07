import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    margin: "20px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "40%",
    margin: "15px 0",
  },
}));
export default function AddDetail(props: any) {
  const classes = useStyles();

  const checkValid = () => {
    let result = true;

    return result;
  };

  React.useEffect(() => {}, []);
  // actions btn
  const saveBtn = async () => {
    if (checkValid()) {
      try {
      } catch (err) {
        // console.log({ ...err });
        console.log(err);
      }
    }
  };
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add new Detail
          </Typography>
          <Button onClick={props.closeDialog}>Cancel</Button>
          <Button autoFocus color="inherit" onClick={saveBtn}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.content}></div>
    </div>
  );
}
