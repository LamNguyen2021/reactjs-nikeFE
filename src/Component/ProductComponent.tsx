import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../Hooks/Hook";
import { setProductDetail } from "../Layout/DeTailProduct/module/detailProductReducer";

const useStyles = makeStyles((theme) => ({
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
  product: any;
}
export default function ProductComponent({ product }: IProps) {
  const classes = useStyles();
  let history = useHistory();

  const gotoProductDetail = () => {
    history.push(`/detailProduct/${product.product._id}`);
  };

  const [imageMain, setImageMain] = React.useState(
    product.details[0].images[0].urlImage
  );

  return (
    <span className={classes.productLinkGTColor}>
      <img
        alt=""
        className={classes.productImage}
        src={imageMain}
        onClick={gotoProductDetail}
      />
      <div className={classes.productDetailColorway}>
        <div>{product.product.name}</div>
        <div className={classes.colorShoe}>{product.details.length} Colour</div>
      </div>
      <div className={classes.collectImageSmall}>
        {product.details?.map((detail: any, index: any) => {
          return (
            <a href="#" key={index}>
              <img
                src={detail.images[0].urlImage}
                alt=""
                className={classes.imageSmall}
                onMouseOver={() => {
                  setImageMain(detail.images[0].urlImage);
                }}
              />
            </a>
          );
        })}
      </div>
      <div className={classes.price}>
        ${product.details[0].quantities[0].price}
      </div>
    </span>
  );
}
