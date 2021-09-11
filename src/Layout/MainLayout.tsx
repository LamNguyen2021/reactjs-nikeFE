import React, { Fragment } from "react";
import ShowProductsAndFilter from "./ListProducts/ShowProductsAndFilter";
import Carousel from "./Carousel/Carousel";

export default function MainLayout() {
  return (
    <Fragment>
      <Carousel />
      <ShowProductsAndFilter />
      {/* <Counter /> */}
    </Fragment>
  );
}
