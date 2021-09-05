import { Button, withStyles } from "@material-ui/core";

export const StyledButton = withStyles({
  root: {
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    backgroundSize: "250% auto",

    transition: "all 0.5s ease !important",
    width: "100%",
    "&:hover": {
      backgroundPosition: "right center",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export const StyledButtonActive = withStyles({
  root: {
    background: "linear-gradient(right, #a6f77b 10%, #2dbd6e 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    width: "100%",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(45, 189, 110, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export const StyledButtonInActive = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    width: "100%",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

// right, #a6f77b, #2dbd6e
