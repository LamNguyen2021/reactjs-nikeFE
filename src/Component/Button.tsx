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
