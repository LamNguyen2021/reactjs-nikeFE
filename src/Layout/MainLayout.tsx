import React, { Fragment } from "react";
import Counter from "../Component/Counter";
import ShowProductsAndFilter from "./ListProducts/ShowProductsAndFilter";

export default function MainLayout() {
  return (
    <Fragment>
      {/* <Carousel /> */}
      <ShowProductsAndFilter />
      {/* <Counter /> */}
    </Fragment>
  );
}
