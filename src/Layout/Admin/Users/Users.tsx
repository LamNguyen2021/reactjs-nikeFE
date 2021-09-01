import React, { Fragment } from "react";
import CreateUser from "./CreateUser";
import ListUsers from "./ListUsers";

function Users() {
  return (
    <Fragment>
      <CreateUser />
      <ListUsers />
    </Fragment>
  );
}

export default Users;
