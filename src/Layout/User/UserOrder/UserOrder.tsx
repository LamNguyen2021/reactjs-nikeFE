import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OrderStepper from "./OrderStepper";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: "40px 48px",
    fontSize: 16,
    minHeight: 500,
  },
  Title: {
    fontSize: 24,
    backgroundColor: "black",
    color: "white",
    fontWeight: 500,
    padding: "20px",
  },
  OrderType: {
    padding: "20px 0",
    fontSize: 22,
    fontWeight: 500,
    borderBottom: "1px #cccccc solid",
  },
  Order: {
    backgroundColor: "white",
    outline: 0,
    border: 0,
    textAlign: "left",
    margin: "15px 0 0 0",
    width: 700,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    padding: "10px 0 10px 10px",
    // border: '1px #cccccc solid',
    overflow: "auto",
    borderRadius: 5,
    boxShadow:
      "0 1px 2px 2px rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
  },
  OrderHeader: {
    cursor: "pointer",
  },
  OrderStatus: {
    float: "right",
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      float: "none",
      marginBottom: 20,
    },
  },
  OrderInfo: {
    paddingBottom: 10,
  },
  OrderProduct: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    clear: "both",
    padding: "24px 0",
    margin: "15px auto 0",
    borderTop: "1px #cccccc solid",
  },
  ProductImageContainer: {
    paddingRight: 16,
    float: "left",
    [theme.breakpoints.down("xs")]: {
      float: "none",
    },
  },
  ProductImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    // [theme.breakpoints.down('xs')]: {
    //     width: 110,
    //     height: 110,
    // },
  },
  ProductDetail: {
    lineHeight: 1.75,
  },
  ProductName: {
    textDecoration: "none",
    color: "black",
  },
  Price: {
    float: "right",
    [theme.breakpoints.down("sm")]: {
      float: "none",
    },
  },
  SubDetail: {
    color: "#757575",
  },
  OrderCancel: {
    color: "#757575",
  },
}));

export default function UserOrder() {
  const classes = useStyles();

  const convertDay = (index: any) => {
    return moment(index).format("llll");
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>Your Order</div>

      {/* ========== Processing Order ========= */}
      <div>
        <div className={classes.OrderType}>Processing Order</div>
        <div>
          <button className={classes.Order}>
            <div className={classes.OrderHeader}>
              <div className={classes.OrderStatus}>
                <OrderStepper />
              </div>
              <div className={classes.OrderInfo}>ID: 121212</div>
              <div className={classes.OrderInfo}>
                Date: Sun, Aug 1, 2021 5:02 PM
              </div>
              {/* {item.isPayed == true ?
                                      <div className={classes.OrderInfo}><b>Payment: Paypal</b></div>
                                  :
                                      <div className={classes.OrderInfo}><b>Payment: Ship COD</b></div>
                                  }
                                  {item.status == 1 && item.isPayed != true &&
                                      <div className={classes.OrderCancel} onClick={()=>handleCancel(item._id)}>Cancel Order</div>
                                  } */}
              <div className={classes.OrderInfo}>
                <b>Payment: Paypal</b>
              </div>
              <div className={classes.OrderCancel}>Cancel Order</div>
            </div>
            <div className={classes.OrderProduct}>
              <a href="#a" className={classes.ProductImageContainer}>
                <img
                  alt=""
                  className={classes.ProductImage}
                  src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e0c08734-caa0-4021-97ec-90b6945dfadb/air-force-1-shadow-shoe-klCJXd.jpg"
                />
              </a>
              <div className={classes.ProductDetail}>
                <a href="#a" className={classes.ProductName}>
                  Nike Air Force
                </a>
                <div className={classes.Price}>$252</div>
                <div className={classes.SubDetail}>
                  <div>Size: 39</div>
                  <div>Qty: 1</div>
                  <div>Color: black</div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ========== Delivered Order ========= */}
      <div>
        <div className={classes.OrderType}>Delivered Order</div>
        <div>
          <button className={classes.Order}>
            <div className={classes.OrderHeader}>
              <div className={classes.OrderStatus}>
                <OrderStepper />
              </div>
              <div className={classes.OrderInfo}>ID: 121212</div>
              <div className={classes.OrderInfo}>
                Date: Sun, Aug 1, 2021 5:02 PM
              </div>
            </div>

            <div className={classes.OrderProduct}>
              <a href="#a" className={classes.ProductImageContainer}>
                <img
                  alt=""
                  className={classes.ProductImage}
                  src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e0c08734-caa0-4021-97ec-90b6945dfadb/air-force-1-shadow-shoe-klCJXd.jpg"
                />
              </a>
              <div className={classes.ProductDetail}>
                <a href="#a" className={classes.ProductName}>
                  Nike Air Force
                </a>
                <div className={classes.Price}>$252</div>
                <div className={classes.SubDetail}>
                  <div>Size: 39</div>
                  <div>Qty: 1</div>
                  <div>Color: black</div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
