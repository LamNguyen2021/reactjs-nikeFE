import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

export default function UserProfile() {
  const classes = useStyles();

  const age = [];
  for (var i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <div className={classes.Container}>
      <div>
        <div className={classes.AccountContainer}>
          <div className={classes.AccountDetail}>
            <form id="formUserProfile">
              <div className={classes.Title}>Account Detail</div>
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
                  {listAge}
                </select>
              </p>
              <button className={classes.ButtonSubmit} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
