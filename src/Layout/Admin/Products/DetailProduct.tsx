import { Button } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import productDetailService from "../../../Service/ProductDetailService";
import SizeProduct from "./SizeProduct";

export default function DetailProduct(props: any) {
  const [details, setDetails] = React.useState([]);
  React.useEffect(() => {
    productDetailService.getProductDetail(props.itemData._id).then((res) => {
      setDetails(res.data);
    });
  }, []);

  return (
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
          icon: "edit",
          onClick: (event, rowData) => {},
        },
        {
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
                onClick={() => {}}
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
  );
}
