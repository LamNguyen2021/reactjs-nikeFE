import React from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Dialog, Slide } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TransitionProps } from "@material-ui/core/transitions";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Products() {
  const [addNewType, setAddNewType] = React.useState(false);
  const [itemData, setItemData] = React.useState(null);

  // Dialog
  const [open, setOpen] = React.useState(false);

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

  // delete a product
  const removeItem = async (rowData: any) => {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MaterialTable
          title="List Products"
          columns={[
            {
              title: "Image",
              field: "img",
              render: (rowData) => (
                <img
                  src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto/97d7c27d-4d87-4cf4-bbc3-c84d980c4b4b/air-force-1-shadow-shoes-mN8Glx.png"
                  style={{ width: 50 }}
                />
              ),
            },
            { title: "Name", field: "name" },
            { title: "Type", field: "typeProduct" },
            { title: "Gender", field: "gender" },
            { title: "Price", field: "price" },
          ]}
          data={[
            {
              name: "Air Force",
              typeProduct: "shoes",
              gender: "men",
              price: 252,
            },
            {
              name: "Air Force",
              typeProduct: "shoes",
              gender: "men",
              price: 252,
            },
            {
              name: "Air Force",
              typeProduct: "shoes",
              gender: "men",
              price: 252,
            },
            {
              name: "Air Force",
              typeProduct: "shoes",
              gender: "men",
              price: 252,
            },
          ]}
          actions={[
            {
              icon: "edit",
              onClick: (event, rowData) => handleOpen(rowData),
            },
            {
              icon: "delete",
              onClick: (event, rowData) => removeItem(rowData),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
          }}
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
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          {addNewType ? (
            <AddProductForm
              handleCloseAddNew={handleCloseAddNew}
              closeDialog={handleClose}
            />
          ) : (
            <EditProductForm itemData={itemData} closeDialog={handleClose} />
          )}
        </Dialog>
      </Grid>
    </Grid>
  );
}
