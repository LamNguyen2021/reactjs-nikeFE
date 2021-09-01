import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CartBag from "./CartBag";
import CartSummary from "./CartSummary";

const useStyles = makeStyles((theme) => ({
  Container: {
    margin: "40px 0",
  },
  Cart: {
    width: 1100,
    [theme.breakpoints.down("md")]: {
      width: "92%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    margin: "0px auto",
    fontSize: 16,
  },
  PromoCode: {
    padding: "8px 0 30px 16px",
    fontSize: 12,
  },
  PromoCodeTitle: {
    fontSize: 14,
  },
  Bag: {
    fontSize: 22,
  },
}));

function Cart() {
  const classes = useStyles();

  return (
    <div className={classes.Container}>
      <Container maxWidth="xl">
        <div className={classes.Cart}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <div className={classes.PromoCode}>
                <div className={classes.PromoCodeTitle}>HAVE A PROMO CODE?</div>
                <div>
                  If you have a promo code you will be able to apply it on the
                  payment page during checkout.
                </div>
              </div>
              <div className={classes.Bag}>Bag</div>

              <CartBag />
            </Grid>
            <Grid item md={4} xs={12}>
              <CartSummary />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
