import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import NavMain from "./NavMain";
import NavSub from "./NavSub";

export default function NavBar() {
  return (
    <Fragment>
      <NavSub />
      <NavMain />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}
