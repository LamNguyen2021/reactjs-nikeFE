import { Button, Dialog, Slide } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import productDetailService from "../../../Service/ProductDetailService";
import SizeProduct from "./SizeProduct";
import AddDetail from "./AddDetail";
import EditProduct from "./EditProduct";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailProduct(props: any) {
  const [details, setDetails] = React.useState([]);
  const [addNewType, setAddNewType] = React.useState(false);
  const [itemData, setItemData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    productDetailService.getProductDetail(props.itemData._id).then((res) => {
      setDetails(res.data);
    });
  }, []);

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

  return (
    <div>
      <MaterialTable
        title={`Detail: ${props.itemData.name}`}
        columns={[
          {
            title: "Image",
            render: (rowData: any) => (
              <img src={rowData.images[0].urlImage} style={{ width: 80 }} />
            ),
          },
          { title: "Color", field: "info.color.nameColor" },
          { title: "Gender", field: "info.gender.nameGender" },
        ]}
        data={details}
        actions={[
          {
            tooltip: "edit detail",
            icon: "edit",
            onClick: (event, rowData) => {},
          },
          {
            tooltip: "delete detail",
            icon: "delete",
            onClick: (event, rowData) => {},
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
        }}
        detailPanel={[
          {
            tooltip: "Show Sizes",
            render: (rowData: any) => (
              <SizeProduct itemData={rowData.quantities} />
            ),
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
                  Add New Detail
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
          <AddDetail
            handleCloseAddNew={handleCloseAddNew}
            closeDialog={handleClose}
          />
        ) : (
          <EditProduct itemData={itemData} closeDialog={handleClose} />
        )}
      </Dialog>
    </div>
  );
}
