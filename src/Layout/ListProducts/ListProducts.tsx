import { Grid, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  listProductMainContainer: {
    width: "100%",
    padding: "0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  productLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
  },
  productImage: {
    width: "100%",
    height: "300px",
    [theme.breakpoints.down("xs")]: {
      height: "150px",
      width: "100%",
    },
  },
  productDetailColorway: {
    lineHeight: 1.75,
    display: "block",
  },
  message: {
    paddingTop: 12,
    color: "#fa5400",
  },
  productType: {
    color: "#757575",
  },
  price: {
    paddingTop: 10,
  },
}));

export default function ListProducts() {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.listProductMainContainer}>
      <Grid item xs={6} md={4}>
        <span className={classes.productLink}>
          <img
            className={classes.productImage}
            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5f32941-5edb-4d3e-beab-2383ce1744db/air-force-1-shadow-shoe-klCJXd.jpg"
          />
          <div className={classes.message}></div>
          <div className={classes.productDetailColorway}>
            <div>Nike ZoomX Vaporfly NEXT</div>
          </div>
          <div className={classes.price}>$255</div>
        </span>
      </Grid>
      <Grid item xs={6} md={4}>
        <span className={classes.productLink}>
          <img
            className={classes.productImage}
            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5f32941-5edb-4d3e-beab-2383ce1744db/air-force-1-shadow-shoe-klCJXd.jpg"
          />
          <div className={classes.message}></div>
          <div className={classes.productDetailColorway}>
            <div>Nike ZoomX Vaporfly NEXT</div>
          </div>
          <div className={classes.price}>$255</div>
        </span>
      </Grid>
      <Grid item xs={6} md={4}>
        <span className={classes.productLink}>
          <img
            className={classes.productImage}
            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5f32941-5edb-4d3e-beab-2383ce1744db/air-force-1-shadow-shoe-klCJXd.jpg"
          />
          <div className={classes.message}></div>
          <div className={classes.productDetailColorway}>
            <div>Nike ZoomX Vaporfly NEXT</div>
          </div>
          <div className={classes.price}>$255</div>
        </span>
      </Grid>
    </Grid>
  );
}
