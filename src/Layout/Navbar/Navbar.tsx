import React, { Fragment } from "react";
import NavMain from "./NavMain";
import NavSub from "./NavSub";

export default function NavBar() {
  return (
    <Fragment>
      <NavSub />
      <NavMain />
    </Fragment>
  );
}
