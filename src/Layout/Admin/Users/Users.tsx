import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import CreateUser from "./CreateUser";
import ListUsers from "./ListUsers";

function Users() {
  return (
    <Fragment>
      <CreateUser />
      <ListUsers />
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

export default Users;
