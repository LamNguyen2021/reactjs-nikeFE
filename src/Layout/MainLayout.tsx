import React, { Fragment } from "react";
import Counter from "../Component/Counter";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";
import ShowProductsAndFilter from "./ListProducts/ShowProductsAndFilter";
import NavBar from "./Navbar/Navbar";

export default function MainLayout() {
  return (
    <Fragment>
      {/* <Carousel /> */}
      <ShowProductsAndFilter />
      <Counter />
    </Fragment>
  );
}
