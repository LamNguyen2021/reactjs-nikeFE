import { Grid, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import ProductComponent from "../../Component/ProductComponent";

const useStyles = makeStyles((theme) => ({
  listProductMainContainer: {
    width: "100%",
    padding: "0 40px 0 0",
    marginLeft: 0,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  productLinkGTColor: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
    "&:hover $productDetailColorway": {
      display: "none",
    },
    "&:hover $collectImageSmall": {
      display: "block",
    },
  },
  collectImageSmall: {
    display: "none",
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
    color: "rgb(17, 17, 17)",
    fontSize: 14,
    lineHeight: 1.75,
    fontWeight: 500,
    display: "block",
  },
  colorShoe: {
    color: "rgb(117, 117, 117)",
    fontWeight: 400,
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
  imageSmall: {
    height: 40,
    margin: "0 5px",
  },
}));
interface IProps {
  products: [];
}
export default function ListProducts({ products }: IProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.listProductMainContainer}>
      {products.map((product, index) => {
        return (
          <Grid item xs={6} md={4} key={index}>
            <ProductComponent product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
