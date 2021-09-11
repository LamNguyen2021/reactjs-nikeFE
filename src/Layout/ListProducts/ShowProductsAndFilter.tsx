import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useAppSelector } from "../../Hooks/Hook";
import { RootState } from "../../Redux/store";
import productService from "../../Service/ProductService";
import FilterProducts from "./FilterProducts";
import ListProducts from "./ListProducts";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: "space-around",
  },
}));

export default function ShowProductsAndFilter() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState<any>([]);
  const idcategory = useAppSelector(
    (state: RootState) => state.categoryReducer.idCategory
  );

  const filter = (name: string, genders: [], colors: [], sizes: []) => {
    let genderQuery = "";
    genders.forEach((gender) => {
      genderQuery += `&genderId=${gender}`;
    });

    let colorQuery = "";
    colors.forEach((color) => {
      colorQuery += `&colorId=${color}`;
    });

    let sizeQuery = "";
    sizes.forEach((size) => {
      sizeQuery += `&sizeId=${size}`;
    });

    const query = `name=${name}${genderQuery}${colorQuery}${sizeQuery}`;

    console.log("query", query);

    productService.getProductFilter(query).then((res) => {
      setIsLoading(true);
      if (idcategory === "") {
        setProducts(res.data);
        setIsLoading(false);
      } else {
        const filteredCate = res.data.filter(
          (el: any) => el.product.category === idcategory
        );
        setProducts(filteredCate);
        setIsLoading(false);
      }
    });
  };

  React.useEffect(() => {
    filter("", [], [], []);
  }, [idcategory]);

  return (
    <Grid container className={classes.container}>
      <FilterProducts filter={filter} />
      <Grid item sm={9}>
        <ListProducts products={products} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}
