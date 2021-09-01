import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  CartBag: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 16,
    },
  },
  Product: {
    display: "flex",
    clear: "both",
    padding: "24px 8px",
    borderBottom: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    [theme.breakpoints.down("xs")]: {
      width: 80,
      height: 80,
    },
  },
  ProductDetail: {
    width: "100%",
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
    [theme.breakpoints.down("xs")]: {
      float: "none",
    },
  },
  SubDetail: {
    color: "#757575",
  },
  SelectContainer: {
    display: "flex",
    alignItems: "baseline",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  SelectFormControl: {
    marginRight: 10,
  },
  CartItemAction: {
    marginTop: 16,
    [theme.breakpoints.down("sm")]: {
      marginTop: 36,
    },
    color: "#757575",
  },
  CartItemActionButton: {
    marginRight: 16,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
  },
  SelectFormContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

const CustomSelect = withStyles((theme) => ({
  input: {
    fontSize: 16,
    color: "#757575",
    padding: "0px 12px",
    lineHeight: "inherit",
  },
}))(InputBase);

function CartBag() {
  const classes = useStyles();

  const Qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // get size when user click
  const [size, setSize] = React.useState("");
  const handleChangeSize = (event: any) => {
    setSize(event.target.value);
  };
  //get quntity when user click
  const [quantity, setQuantity] = React.useState("");
  const handleChangequantity = (event: any) => {
    setSize(event.target.value);
  };

  return (
    <div className={classes.CartBag}>
      <div className={classes.Product}>
        <a href="#" className={classes.ProductImageContainer}>
          <img
            className={classes.ProductImage}
            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/59c0e1dd-d58b-4d0b-a08b-ec9396bee725/air-force-1-shadow-shoe-5DkRBq.jpg"
          />
        </a>
        <div className={classes.ProductDetail}>
          <a href="#" className={classes.ProductName}>
            Nike Air Force 1 Shadow
          </a>
          <div className={classes.Price}>$252</div>
          <div className={classes.SubDetail}>
            <div>Men's Shoes</div>
            <div className={classes.SelectContainer}>
              <span className={classes.SelectFormContainer}>
                Size
                <FormControl className={classes.SelectFormControl}>
                  <NativeSelect
                    value={size}
                    onChange={handleChangeSize}
                    input={<CustomSelect />}
                  >
                    <option value={36}>36</option>
                    <option value={37}>37</option>
                    <option value={38}>38</option>
                  </NativeSelect>
                </FormControl>
              </span>
              <span className={classes.SelectFormContainer}>
                Quantity
                <FormControl className={classes.SelectFormControl}>
                  <NativeSelect
                    onChange={handleChangequantity}
                    input={<CustomSelect />}
                  >
                    {Qty.map((i) => {
                      return (
                        <option
                          // selected={item.quantity === i ? "selected" : ""}
                          value={i}
                        >
                          {i}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </span>
            </div>
          </div>
          <div className={classes.CartItemAction}>
            <span className={classes.CartItemActionButton}>Remove</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBag;
