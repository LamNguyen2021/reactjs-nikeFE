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
        position="bottom-right"
        autoClose={5000}
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
