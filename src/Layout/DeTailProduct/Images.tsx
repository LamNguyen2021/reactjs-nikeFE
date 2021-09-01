import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  ProductContainer: {
    padding: "0 44px",
    width: "100%",
    fontSize: 16,
    lineHeight: 1.7,
    [theme.breakpoints.down("md")]: {
      padding: "0 8px",
    },
  },
  ProductImage: {
    width: "100%",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

function Images() {
  const classes = useStyles();

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      <Grid item xs={6}>
        <img
          className={classes.ProductImage}
          src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/678edbfd-96e6-49fb-9e61-7e96f22971a5/air-force-1-07-shoes-dr1bJC.png"
        />
      </Grid>
      <Grid item xs={6}>
        <img
          className={classes.ProductImage}
          src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ad97a5b6-9f06-4102-9db3-38db532d53e4/air-force-1-07-shoes-dr1bJC.png"
        />
      </Grid>
      <Grid item xs={6}>
        <img
          className={classes.ProductImage}
          src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/c678adbc-3bfb-41c8-8ca2-812f95be7c82/air-force-1-07-shoes-dr1bJC.png"
        />
      </Grid>
      <Grid item xs={6}>
        <img
          className={classes.ProductImage}
          src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/9e8be758-3521-456c-a1f5-fd904aa69c18/air-force-1-07-shoes-dr1bJC.png"
        />
      </Grid>
    </Grid>
  );
}

export default Images;
