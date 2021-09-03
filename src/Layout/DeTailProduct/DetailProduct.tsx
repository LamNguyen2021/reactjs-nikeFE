import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Images from "./Images";
import MainInfo from "./MainInfo";
import { useParams } from "react-router-dom";
import productDetailService from "../../Service/ProductDetailService";
import { useAppSelector } from "../../Hooks/Hook";
import { RootState } from "../../Redux/store";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 44,
    marginBottom: 44,
    width: "100%",
  },
}));

type ProductDetailParams = {
  id: string;
};
function DetailProduct() {
  const classes = useStyles();
  const productDetail = useAppSelector(
    (state: RootState) => state.detailProductReducer.productDetail
  );

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item sm={12} md={8}>
        <Images />
      </Grid>

      <Grid item sm={12} md={4}>
        <MainInfo />
      </Grid>
    </Grid>
  );
}

export default DetailProduct;
