import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OrderStepper from "./OrderStepper";

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
    margin: "15px",
    width: 680,
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

interface IProps {
  order: any;
  index: number;
  step: number;
}

function Card({ order, index, step }: IProps) {
  const classes = useStyles();

  const renderDate = (UTCdate: string) => {
    const newDateFormat = new Date(UTCdate).toLocaleDateString("en-GB");
    const newTimeFormat = new Date(UTCdate).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return newDateFormat + ", " + newTimeFormat;
  };

  const [dataProcessClick, setdataProcessClick] = React.useState(0);
  const handleOrderClick = (index) => {
    if (index == dataProcessClick) {
      setdataProcessClick(-1);
    } else {
      setdataProcessClick(index);
    }
  };
  return (
    <button className={classes.Order} key={order.info._id}>
      <div
        className={classes.OrderHeader}
        onClick={() => {
          handleOrderClick(index);
        }}
      >
        <div className={classes.OrderStatus}>
          <OrderStepper step={step} />
        </div>
        <div className={classes.OrderInfo}>ID: {order.info._id}</div>
        <div className={classes.OrderInfo}>
          Date: {renderDate(order.info.dateOrder)}
        </div>
        <div className={classes.OrderInfo}>
          Total price: <b>${order.info.totalPrice}</b>
        </div>
        <div className={classes.OrderInfo}>
          <b>Payment: Paypal</b>
        </div>
        {/* <div className={classes.OrderCancel}>Cancel Order</div> */}
      </div>
      {order.products.map((product) => {
        return (
          <div>
            {dataProcessClick === index && (
              <div className={classes.OrderProduct}>
                <div className={classes.ProductDetail}>
                  <a href="#a" className={classes.ProductName}>
                    {product.nameProduct}
                  </a>
                  <div className={classes.Price}>${product.price}</div>
                  <div className={classes.SubDetail}>
                    <div>Quantity: {product.quantity}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </button>
  );
}

export default Card;
