import { alpha, createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: "transparent",
      color: "#000",
      boxShadow: "0px 0px 0px 0px",
    },
  })
);
