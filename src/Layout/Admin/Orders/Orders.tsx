import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import cartService from "../../../Service/CartService";
import userService from "../../../Service/UserService";
import { StyledButton } from "../../../Component/Button";
import { useForm } from "react-hook-form";
import { ID_STATUS } from "../../../Config/id";
import { notifiError, notifiSuccess } from "../../../utils/MyToys";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  imgFavorite: {
    height: 100,
  },
  modifyUser: {
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "red",
    },
  },
  Title: {
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe0000",
  },
  ButtonSubmit: {
    outline: "none",
    lineHeight: "24px",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    fontSize: 14,
  },
  Form: {
    width: 350,
  },
  alert: {
    padding: "6px",
  },
  styleButton: {
    padding: "0 10px",
  },
}));

export default function Orders() {
  const classes = useStyles();
  const token = userService.getAccessToken();
  const [data, setData] = React.useState<any>();
  const [change, setChange] = React.useState<boolean>(false);

  let dataTable = [] as any;

  const renderDate = (UTCdate: string) => {
    const newDateFormat = new Date(UTCdate).toLocaleDateString("en-GB");
    const newTimeFormat = new Date(UTCdate).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return newDateFormat + ", " + newTimeFormat;
  };

  if (data) {
    data.map((item) => {
      if (item.orders.length > 0) {
        // const { orders, ...user } = item;
        // console.log(orders);
        // console.log(user);
        console.log(item);

        item.orders.forEach((element) => {
          const oneRow = {
            _id: element.info._id,
            createdAt: renderDate(element.info.dateOrder),
            totalPrice: element.info.totalPrice,
            customer: item.user.name,
            products: element.products,
            status: element.info.status.nameStatus,
          };
          dataTable.push(oneRow);
        });
      }
    });
  }

  React.useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await cartService.getAllOrders(token);
        setData(res.data);
        console.log(data);
      } catch (error) {
        // console.log({ ...error });
        console.log(error);
      }
    };
    callAPI();
  }, [change]);

  // =========== update ===========
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [idOrder, setIdOrder] = React.useState<string>("");

  const handleOpenDialog = (name: string, idOrder: string) => {
    setIdOrder(idOrder);
    if (name === "pending") {
      setValue("idStatus", ID_STATUS.PENDING);
    } else if (name === "delivery") {
      setValue("idStatus", ID_STATUS.DELIVERY);
    } else if (name === "complete") {
      setValue("idStatus", ID_STATUS.COMPLETE);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    reset();
    setOpenDialog(false);
  };

  type FormUpdateStatusValues = {
    idStatus: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormUpdateStatusValues>();

  const onSubmitEdit = async (data: any) => {
    try {
      const updateStatus = await cartService.updateStatus(idOrder, data, token);
      reset();
      handleCloseDialog();
      setChange(!change);
      notifiSuccess("Update status successfully");
    } catch (err) {
      // const error = { ...err };
      // notifiError(error.response.data.message);
      console.log(err);
    }
  };

  return (
    <div>
      <MaterialTable
        title="Orders"
        columns={[
          {
            title: "Order ID",
            field: "_id",
            editable: "never",
            render: (rowData) => {
              return <p>{rowData._id}</p>;
            },
          },
          {
            title: "Create At",
            field: "createdAt",
            editable: "never",
            customSort: (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            render: (rowData) => {
              return <p>{rowData.createdAt}</p>;
            },
          },
          {
            title: "Total Price",
            field: "totalPrice",
            width: "80%",
            editable: "never",
            render: (rowData) => {
              return <p>${rowData.totalPrice}</p>;
            },
          },
          {
            title: "Customer",
            field: "customer",
            editable: "never",
            render: (rowData) => {
              return <p>{rowData.customer}</p>;
            },
          },
          {
            title: "Product",
            field: "products",
            editable: "never",
            render: (rowData) =>
              rowData.products.map((item) => {
                return (
                  <div>
                    {item.nameProduct} [quantity : {item.quantity}]
                  </div>
                );
              }),
          },
          {
            title: "Status",
            field: "status",
            type: "string",
            align: "center",
            editable: "never",
            render: (rowData) => {
              return (
                <div>
                  {rowData.status === "pending" && (
                    <Alert
                      className={classes.alert}
                      variant="outlined"
                      severity="warning"
                    >
                      Pending order
                    </Alert>
                  )}
                  {rowData.status === "delivery" && (
                    <Alert
                      className={classes.alert}
                      icon={<LocalShippingOutlinedIcon fontSize="inherit" />}
                      variant="outlined"
                      severity="info"
                    >
                      Delivery order
                    </Alert>
                  )}
                  {rowData.status === "complete" && (
                    <Alert
                      className={classes.alert}
                      variant="outlined"
                      severity="success"
                    >
                      Order received
                    </Alert>
                  )}
                </div>
              );
            },
          },
          {
            title: "Update",
            field: "update",
            align: "center",
            editable: "never",
            render: (rowData) => (
              <StyledButton
                className={classes.styleButton}
                onClick={() => handleOpenDialog(rowData.status, rowData._id)}
              >
                Update Status
              </StyledButton>
            ),
          },
        ]}
        data={dataTable}
        options={{
          // pageSize: 10,
          // pageSizeOptions: [10, 15, 20, 25],
          // emptyRowsWhenPaging: false,
          paging: false,
        }}
        editable={{}}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          className={classes.Form}
          id="FormUpdateStatusValues"
          onSubmit={handleSubmit(onSubmitEdit)}
        >
          <DialogContent>
            <div className={classes.inputContainer}>
              <div>Status:</div>
              <select
                {...register("idStatus", {
                  required: "Status is required",
                })}
                className={classes.Detail}
              >
                <option value={`${ID_STATUS.PENDING}`}>Pending</option>
                <option value={`${ID_STATUS.DELIVERY}`}>Delivery</option>
                <option value={`${ID_STATUS.COMPLETE}`}>Complete</option>
              </select>
              {errors.idStatus && (
                <p className={classes.inputValid}>{errors.idStatus.message}</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
