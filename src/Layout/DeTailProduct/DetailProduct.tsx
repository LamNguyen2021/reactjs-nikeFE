import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Images from "./Images";
import MainInfo from "./MainInfo";
import { useParams } from "react-router-dom";
import productDetailService from "../../Service/ProductDetailService";

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
  const { id } = useParams<ProductDetailParams>();

  const [productsDetail, setProductsDetail] = React.useState<any>([]);

  React.useEffect(() => {
    productDetailService
      .getProductDetail(id)
      .then((res) => {
        setProductsDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(productsDetail);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item sm={12} md={8}>
        <Images />
      </Grid>

      <Grid item sm={12} md={4}>
        <MainInfo productsDetail={productsDetail} />
      </Grid>
    </Grid>
  );
}

export default DetailProduct;
