import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Summary: {
    padding: "0 20px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      padding: "0 8px",
    },
  },
  Title: {
    fontSize: 22,
    marginBottom: 12,
  },
  PriceDetail: {
    marginBottom: 8,

    lineHeight: 1.75,
  },
  Price: {
    float: "right",
  },
  TotalPrice: {
    margin: "12px 0",
    borderTop: "1px #cccccc solid",
    borderBottom: "1px #cccccc solid",
    padding: "14px 0",
    [theme.breakpoints.down("sm")]: {
      border: "none",
    },
  },
  Checkout: {
    padding: "20px 16px",
  },
  CheckoutButton: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    padding: "18px 24px",
    outline: 0,
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 12,
  },
}));

function CartSummary() {
  const classes = useStyles();

  return (
    <div className={classes.Summary}>
      <div className={classes.Title}>Summary</div>
      <div className={classes.PriceDetail}>
        Subtotal
        <div className={classes.Price}>$252</div>
      </div>
      <div className={classes.PriceDetail}>
        Estimated Delivery & Handling
        <div className={classes.Price}>0₫</div>
      </div>
      <div className={classes.TotalPrice}>
        Total
        <div className={classes.Price}>
          <b>$252</b>
        </div>
      </div>
      <button className={classes.CheckoutButton}>Checkout</button>
    </div>
  );
}

export default CartSummary;
