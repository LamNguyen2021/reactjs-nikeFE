import React from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Dialog, Slide, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TransitionProps } from "@material-ui/core/transitions";
import productService from "../../../Service/ProductService";
import DetailProduct from "./DetailProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Products() {
  const [addNewType, setAddNewType] = React.useState<boolean>(false);
  const [itemData, setItemData] = React.useState(null);

  // Dialog
  const [open, setOpen] = React.useState(false);

  // edit
  const handleOpen = (rowData: any) => {
    setItemData(rowData);
    setAddNewType(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAddNew = () => {
    setOpen(true);
    setAddNewType(true);
  };

  const handleCloseAddNew = () => {
    setAddNewType(false);
    setOpen(false);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  //load again
  const [loadAgain, setLoadAgain] = React.useState(false);

  // delete a product
  const removeItem = async (rowData: any) => {};
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    productService.getAllProduct().then((res) => {
      setIsLoading(true);
      setProducts(res.data);
      setIsLoading(false);
    });
  }, [loadAgain]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
        {!isLoading && (
          <MaterialTable
            title="List Products"
            columns={[
              { title: "Name", field: "name" },
              { title: "Category", field: "category.nameCategory" },
            ]}
            data={products}
            actions={[
              {
                icon: "edit",
                tooltip: "edit product",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              // {
              //   icon: "delete",
              //   tooltip: "delete all details",
              //   onClick: (event, rowData) => removeItem(rowData),
              // },
            ]}
            options={{
              paging: false,
              actionsColumnIndex: -1,
            }}
            detailPanel={[
              {
                tooltip: "Show Detail",
                render: (rowData: any) => <DetailProduct itemData={rowData} />,
                // rowData ở đây là 1 dòng dữ liệu: object trong products
              },
            ]}
            components={{
              Toolbar: (props) => (
                <div className="tableToolbar">
                  <div className="title">
                    <MTableToolbar {...props} />
                  </div>
                  <div>
                    <Button
                      onClick={handleOpenAddNew}
                      className="addnew"
                      variant="contained"
                      size="small"
                      color="primary"
                      startIcon={<AddIcon />}
                    >
                      Add new
                    </Button>
                  </div>
                </div>
              ),
            }}
          />
        )}

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          {addNewType ? (
            <AddProduct
              loadAgain={loadAgain}
              setLoadAgain={setLoadAgain}
              handleCloseAddNew={handleCloseAddNew}
              closeDialog={handleClose}
            />
          ) : (
            <EditProduct
              loadAgain={loadAgain}
              setLoadAgain={setLoadAgain}
              itemData={itemData}
              closeDialog={handleClose}
            />
          )}
        </Dialog>
      </Grid>
    </Grid>
  );
}
