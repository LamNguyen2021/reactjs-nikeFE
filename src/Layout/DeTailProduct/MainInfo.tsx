/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ISize } from "../../Model/ISize";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import productService from "../../Service/ProductService";
import { notifiError, notifiSuccess } from "../../utils/MyToys";
import { useAppDispatch } from "../../Hooks/Hook";
import { useHistory } from "react-router";
import { addToCart } from "../Cart/module/cartReducer";

const useStyles = makeStyles((theme) => ({
  ProductContainer: {
    padding: "0 44px",
    fontSize: 16,
    lineHeight: 1.7,
    [theme.breakpoints.down("md")]: {
      padding: "0 8px",
    },
  },
  ProductImage: {
    width: "100%",
  },
  ShoesType: {
    fontSize: 16,
    marginBottom: 4,
  },
  ShoesName: {
    fontSize: 28,
  },
  Price: {
    fontSize: 16,
    textAlign: "right",
  },
  Size: {
    margin: "20px 0 12px",
  },
  SelectSize: {
    fontSize: 16,
    textAlign: "left",
  },
  AlertSelectSize: {
    fontSize: 16,
    color: "rgb(212, 63, 33)",
  },
  SizeRadio: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  SizeLabel: {
    fontSize: 16,
    padding: "10px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "none",
    "&:hover": {
      boxShadow: "0 0 0 2px black",
    },
  },
  SizeLabelChecked: {
    boxShadow: "0 0 0 2px black",
    padding: "10px 0 10px 0",
    fontSize: 16,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "2px",
  },
  SizeLabelNotAvailable: {
    color: "#d7d7d7",
    padding: "10px 0 10px 0",
    fontSize: 16,
    textAlign: "center",
    borderRadius: "2px",
  },
  AddtoBag: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  Favorite: {
    width: "100%",
    color: "black",
    backgroundColor: "transparent",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "1px #ccc solid",
    outline: "none",
    cursor: "pointer",
  },
  FavoriteBorderIcon: {
    height: 15,
  },
  ProductLink: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 16,
  },
  ProductColorway: {
    display: "none",
  },
  ProductColorwayImage: {
    width: "100px",
    height: "100px",
    border: "1px solid rgb(17, 17, 17)",
    borderRadius: "4px",
    opacity: 1,
  },
  ProductColorwayImageHide: {
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    opacity: 0.8,
    cursor: "pointer",
  },
  ProductColorwayImageHideChoosen: {
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    opacity: 1,
    cursor: "pointer",
    border: "1px solid black",
  },
  CheckSize: {
    boxShadow: "rgb(212, 63, 33) 0px 0px 0px 1px",
    padding: "1px",
    borderRadius: "4px",
  },
  AlertSize: {
    margin: "20px 0px",
  },
  AddtoBagNotAllow: {
    cursor: "not-allowed",
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
  },
}));

interface IProps {
  productDetail: any;
  onSubmitImages: Function;
}

function MainInfo({ productDetail, onSubmitImages }: IProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [size, setSize] = React.useState<ISize[]>([]);
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [idSize, setIDSize] = React.useState<string>("");
  const [image, setImage] = React.useState<any>();
  const [price, setPrice] = React.useState<number | null>(null);
  const [productDetailChoosen, setProductDetailChoosen] = React.useState<any>();
  const [infoProduct, setInfoProduct] = React.useState<any>({
    name: "",
    details: {},
  });

  React.useEffect(() => {
    setInfoProduct({
      name: productDetail[0] && productDetail[0].info.product.name,
      details: productDetail[0] && productDetail[0],
    });
    onSubmitImages(productDetail[0] && productDetail[0]?.images);
    setImage(productDetail[0] && productDetail[0]?.images[0].urlImage);
    setProductDetailChoosen(productDetail[0] && productDetail[0]);
  }, [productDetail]);

  useEffect(() => {
    productService
      .getAllSize()
      .then((res) => {
        setSize(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeInfo = (item: any) => {
    setProductDetailChoosen(item);
    setPrice(null);
    setInfoProduct({ ...infoProduct, details: item });
    onSubmitImages(item.images);
  };

  const handleChooseSize = (item: any) => {
    setSelectedSize(item.nameSize);
    setIDSize(item._id);

    // set price
    infoProduct.details.quantities.forEach((el: any) => {
      if (el.size._id === item._id) {
        // co size
        setPrice(el.price);
      }
    });
  };

  const handleCheckout = () => {
    if (!selectedSize) {
      notifiError("Please choose size");
      return;
    }

    const quantitySize = productDetailChoosen.quantities.find(
      (item: any) => item.size._id === idSize
    );

    const product = {
      quantitySize: quantitySize,
      image: productDetailChoosen.images[0].urlImage,
      name: productDetailChoosen.info.product.name,
      gender: productDetailChoosen.info.gender.nameGender,
      color: productDetailChoosen.info.color.nameColor,
      quantities: productDetailChoosen.quantities,
      quantity: 1,
      productID: productDetailChoosen.info._id,
    };
    dispatch(addToCart(product));
    notifiSuccess("Add product successfully");
  };

  // hiện hình nhỏ
  const bindingArr = () => {
    if (productDetail.length > 0) {
      return productDetail.map((item: any, index: number) => {
        return (
          <Grid item xs={4} key={index}>
            <img
              alt=""
              src={item.images[0].urlImage}
              className={
                item.images[0].urlImage !== image
                  ? classes.ProductColorwayImageHide
                  : classes.ProductColorwayImageHideChoosen
              }
              onClick={() => {
                handleChangeInfo(item);
                setImage(item.images[0].urlImage);
              }}
            />
          </Grid>
        );
      });
    }
  };

  const checkSize = (item: any) => {
    let flag = false;
    if (infoProduct && infoProduct.details) {
      infoProduct.details.quantities.forEach((el: any) => {
        if (el.size._id === item._id) {
          // co size trong kho
          flag = true;
        }
      });
    }

    if (flag) {
      if (selectedSize === item.nameSize) {
        return classes.SizeLabelChecked;
      } else return classes.SizeLabel;
    } else {
      // khong co size trong kho
      return classes.SizeLabelNotAvailable;
    }
  };

  const checkIsDisableSize = (item: any) => {
    let flag = false;
    if (infoProduct && infoProduct.details) {
      infoProduct.details.quantities.forEach((el: any) => {
        if (el.size._id === item._id) {
          // co size trong kho
          flag = true;
        }
      });
    }

    if (flag) {
      return false;
    } else {
      // khong co size trong kho
      return true;
    }
  };

  const listSize = size.map((item) => (
    <Grid item xs={4} key={item._id}>
      <Button
        onClick={() => {
          handleChooseSize(item);
        }}
        className={checkSize(item)}
        disabled={checkIsDisableSize(item)}
      >
        {item.nameSize}
      </Button>
    </Grid>
  ));

  const renderPrice = (price: number | null) => {
    if (price) {
      return <div className={classes.Price}>${price}</div>;
    } else {
      return <span></span>;
    }
  };

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      {/* show info */}
      <Grid item xs={8}>
        <div className={classes.ShoesType}>
          Gender:{" "}
          {infoProduct &&
            infoProduct.details &&
            infoProduct.details.info &&
            infoProduct.details.info.gender.nameGender}
        </div>
        <div className={classes.ShoesName}>
          {infoProduct &&
            infoProduct.details &&
            infoProduct.details.info &&
            infoProduct.details.info.product.name}
        </div>
      </Grid>
      <Grid item xs={4}>
        {renderPrice(price)}
      </Grid>

      {/* show small images */}
      {bindingArr()}

      {/* show sizes */}
      <Grid item xs={12}>
        <Grid container className={classes.Size} spacing={2}>
          <Grid item xs={12} className={classes.SelectSize}>
            <span>Select Size</span>
          </Grid>

          {listSize}
        </Grid>
      </Grid>

      {/* add to bag */}
      <Grid item xs={12}>
        <button
          className={classes.AddtoBag}
          onClick={() => {
            handleCheckout();
          }}
        >
          Add to Bag
        </button>
      </Grid>
    </Grid>
  );
}

export default MainInfo;
