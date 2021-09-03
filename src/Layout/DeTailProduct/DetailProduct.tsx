import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Images from "./Images";
import MainInfo from "./MainInfo";
import { useParams } from "react-router-dom";
import productDetailService from "../../Service/ProductDetailService";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { RootState } from "../../Redux/store";
import { setProductDetail } from "./module/detailProductReducer";

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
  const dispatch = useAppDispatch();
  const { id } = useParams<ProductDetailParams>();

  const productDetail = useAppSelector(
    (state: RootState) => state.detailProductReducer.productDetail // lấy về
  );
  const [images, setImages] = React.useState({});
  const handleImages = (images: any) => {
    setImages(images);
  };

  React.useEffect(() => {
    const callAPI = async () => {
      const res = await productDetailService.getProductDetail(id);
      dispatch(setProductDetail(res.data)); // gửi lên store
    };
    callAPI();
  }, []);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item sm={12} md={8}>
        <Images images={images} />
      </Grid>

      <Grid item sm={12} md={4}>
        <MainInfo
          productDetail={productDetail}
          onSubmitImages={(images: any) => handleImages(images)}
        />
      </Grid>
    </Grid>
  );
}

export default DetailProduct;
