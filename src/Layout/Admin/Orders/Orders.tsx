import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: 150,
  },
}));

export default function Orders() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: "Order ID", field: "_id", editable: "never" },
      {
        title: "Create At",
        field: "createdAt",
        editable: "never",
        render: (rowData: any) => {
          return <p>{moment(rowData.createdAt).format("LL")}</p>;
        },
      },
      {
        title: "Product",
        field: "products",
        editable: "never",
        render: (cart: any) =>
          cart.products.map((item: any) => {
            return (
              <div>
                <h5>
                  {item.name} [ QT : {item.quantity}, SIZE : {item.size} ]
                </h5>
                <img
                  src={item.img}
                  style={{ width: 100, borderRadius: "50%" }}
                />
              </div>
            );
          }),
      },
      {
        title: "Status",
        field: "status",
        type: "numeric",
        editable: "never",
        render: (rowData: any) => {
          return (
            <div>
              {rowData.status === 1 && (
                <Alert severity="warning">Pending order</Alert>
              )}
              {rowData.status === 2 && (
                <Alert severity="info">Delivery order</Alert>
              )}
              {rowData.status === 3 && (
                <Alert severity="success">Payment success</Alert>
              )}
            </div>
          );
        },
        validate: (rowData: any) => rowData.status >= 1 && rowData.status <= 3,
      },
      {
        title: "Payment",
        field: "isPayed",
        type: "boolean",
        editable: "never",
        render: (rowData: any) => {
          if (rowData.isPayed === true) {
            return (
              <Alert variant="outlined" severity="success">
                Paid (Paypal)
              </Alert>
            );
          } else if (rowData.isPayed === false && rowData.status === 3) {
            return (
              <Alert variant="outlined" severity="success">
                Paid (COD)
              </Alert>
            );
          } else if (rowData.isPayed === false) {
            return (
              <Alert variant="outlined" severity="info">
                No payment
              </Alert>
            );
          }
        },
      },
    ],
    data: [
      {
        _id: "121212",
        createdAt: "1627805272045",
        products: [
          {
            name: "nike 1",
            quantity: "12",
            size: "36",
            img: "https://static.nike.com/a/images/t_PDP_144_v1/f_auto/a0ca97be-ce25-456a-8ba7-73216a041c70/air-force-1-shadow-shoe-klCJXd.png",
          },
        ],
        status: 1,
        isPayed: true,
      },
      {
        _id: "121212",
        createdAt: "1627805272045",
        products: [
          {
            name: "nike 1",
            quantity: "12",
            size: "36",
            img: "https://static.nike.com/a/images/t_PDP_144_v1/f_auto/a0ca97be-ce25-456a-8ba7-73216a041c70/air-force-1-shadow-shoe-klCJXd.png",
          },
        ],
        status: 2,
        isPayed: false,
      },
      {
        _id: "121212",
        createdAt: "1627805272045",
        products: [
          {
            name: "nike 1",
            quantity: "12",
            size: "36",
            img: "https://static.nike.com/a/images/t_PDP_144_v1/f_auto/a0ca97be-ce25-456a-8ba7-73216a041c70/air-force-1-shadow-shoe-klCJXd.png",
          },
        ],
        status: 3,
        isPayed: true,
      },
    ],
  });

  const handleDeleteCart = (cart: any) => {};

  const updateStatus = async (cart: any, noti: any) => {};

  return (
    <div>
      <MaterialTable
        title="Orders"
        columns={[
          { title: "Order ID", field: "_id", editable: "never" },
          {
            title: "Create At",
            field: "createdAt",
            editable: "never",
            render: (rowData: any) => {
              return <p>{moment(rowData.createdAt).format("LL")}</p>;
            },
          },
          {
            title: "Product",
            field: "products",
            editable: "never",
            render: (cart: any) =>
              cart.products.map((item: any) => {
                return (
                  <div>
                    <h5>
                      {item.name} [ QT : {item.quantity}, SIZE : {item.size} ]
                    </h5>
                    <img
                      src={item.img}
                      style={{ width: 100, borderRadius: "50%" }}
                    />
                  </div>
                );
              }),
          },
          {
            title: "Status",
            field: "status",
            type: "numeric",
            editable: "never",
            render: (rowData: any) => {
              return (
                <div>
                  {rowData.status === 1 && (
                    <Alert severity="warning">Pending order</Alert>
                  )}
                  {rowData.status === 2 && (
                    <Alert severity="info">Delivery order</Alert>
                  )}
                  {rowData.status === 3 && (
                    <Alert severity="success">Payment success</Alert>
                  )}
                </div>
              );
            },
            validate: (rowData: any) =>
              rowData.status >= 1 && rowData.status <= 3,
          },
          {
            title: "Payment",
            field: "isPayed",
            type: "boolean",
            editable: "never",
            render: (rowData: any) => {
              if (rowData.isPayed === true) {
                return (
                  <Alert variant="outlined" severity="success">
                    Paid (Paypal)
                  </Alert>
                );
              } else if (rowData.isPayed === false && rowData.status === 3) {
                return (
                  <Alert variant="outlined" severity="success">
                    Paid (COD)
                  </Alert>
                );
              } else if (rowData.isPayed === false) {
                return (
                  <Alert variant="outlined" severity="info">
                    No payment
                  </Alert>
                );
              }
            },
          },
        ]}
        data={state.data}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 15, 20, 25],
          emptyRowsWhenPaging: false,
        }}
        editable={{}}
      />
    </div>
  );
}
