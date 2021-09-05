import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OrderStepper from "./OrderStepper";
import moment from "moment";
import cartService from "../../../Service/CartService";
import userService from "../../../Service/UserService";
import { notifiError } from "../../../utils/MyToys";
import Card from "./Card";
import { useAppSelector } from "../../../Hooks/Hook";
import { RootState } from "../../../Redux/store";

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
  const token = userService.getAccessToken();
  const [listOrder, setListOrder] = React.useState<any>([]);
  const isChange = useAppSelector(
    (state: RootState) => state.cartReducer.isOrderHistoryChange
  );

  React.useEffect(() => {
    cartService
      .orderHistoryMe(token)
      .then((res) => {
        setListOrder(res.data);
      })
      .catch((err) => {
        console.log({ ...err });
      });
  }, [isChange]);

  const renderProcessingOrder = listOrder.map((order, index) => {
    if (order.info.status.nameStatus === "pending") {
      return <Card order={order} index={index} step={0} />;
    } else if (order.info.status.nameStatus === "delivery") {
      return <Card order={order} index={index} step={1} />;
    }
  });

  const renderDeliveryOrder = listOrder.map((order, index) => {
    if (order.info.status.nameStatus === "complete")
      return <Card order={order} index={index} step={2} />;
  });

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>Your Order</div>

      <div className={classes.OrderType}>Processing Order</div>
      {renderProcessingOrder}

      <div className={classes.OrderType}>Delivered Order</div>
      {renderDeliveryOrder}
    </div>
  );
}
