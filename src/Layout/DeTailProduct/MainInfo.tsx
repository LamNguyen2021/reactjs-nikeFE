/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ISize } from "../../Model/ISize";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import productService from "../../Service/ProductService";

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
    opacity: 1,
    cursor: "pointer",
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
  const [size, setSize] = React.useState<ISize[]>([]);
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [infoProduct, setInfoProduct] = React.useState<any>({
    name: productDetail.product.name,
    details: productDetail.details[0],
  });

  useEffect(() => {
    onSubmitImages(infoProduct.details.images);
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
    setInfoProduct({ ...infoProduct, details: item });
    onSubmitImages(item.images);
  };

  const handleChooseSize = (size: string) => {
    setSelectedSize(size);
  };

  const checkSize = (item: any) => {
    let flag = false;
    infoProduct.details.quantities.forEach((el: any) => {
      if (el.size === item._id) {
        // co size trong kho
        flag = true;
      }
    });

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
    infoProduct.details.quantities.forEach((el: any) => {
      if (el.size === item._id) {
        // co size trong kho
        flag = true;
      }
    });

    if (flag) {
      return false;
    } else {
      // khong co size trong kho
      return true;
    }
  };

  const listSize = size.map((item, index) => (
    <Grid item xs={4} key={item._id}>
      <Button
        onClick={() => {
          handleChooseSize(item.nameSize);
        }}
        className={checkSize(item)}
        disabled={checkIsDisableSize(item)}
      >
        {item.nameSize}
      </Button>
    </Grid>
  ));

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      {/* show info */}
      <Grid item xs={8}>
        <div className={classes.ShoesType}>
          Gender: {infoProduct.details.info.gender.nameGender}
        </div>
        <div className={classes.ShoesName}>{infoProduct.name}</div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.Price}>$254</div>
      </Grid>

      {/* show images */}
      {productDetail.details.map((item: any, index: any) => {
        return (
          <Grid item xs={4} key={index}>
            <img
              src={item.images[0].urlImage}
              className={classes.ProductColorwayImageHide}
              onClick={() => {
                handleChangeInfo(item);
              }}
            />
          </Grid>
        );
      })}

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
        <button className={classes.AddtoBag}>Add to Bag</button>
      </Grid>
    </Grid>
  );
}

export default MainInfo;
