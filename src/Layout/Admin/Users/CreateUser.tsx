import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    padding: "18px 14px",
    fontSize: 18,
  },
  Form: {
    width: "50%",
  },
}));

function CreateUser() {
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <div className={classes.Title}>Create User Account</div>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.Form} id="AdminFormCreateUser">
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
