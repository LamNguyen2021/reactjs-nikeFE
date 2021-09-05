import {
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import ModalPopUp from "../../../Component/Modal";
import { IStatus } from "../../../Model/IStatus";
import statusService from "../../../Service/StatusService";
import userService from "../../../Service/UserService";
import { notifiSuccess } from "../../../utils/MyToys";

export default function Status() {
  const [status, setStatus] = React.useState<IStatus[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<boolean>(false);
  const [nameStatus, setNameStatus] = React.useState<string>("");
  const [idStatus, setIDStatus] = React.useState<string>("");

  React.useEffect(() => {
    const callAPI = async () => {
      const res = await statusService.getAllStatus();
      setStatus(res.data);
    };
    callAPI();
  }, [open]);

  const openModal = () => {
    setNameStatus("");
    setOpen(true);
  };
  const closeModal = () => {
    setNameStatus("");
    setOpen(false);
  };

  // ======== Delete Status ========
  const [id, setId] = React.useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleOpenConfirm = (id: string) => {
    setId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const removeStatus = (id: string) => {
    const callAPI = async (id: string) => {
      const token: string | null = userService.getAccessToken();
      const res = await statusService.deleteStatus(id, token);
      const res1 = await statusService.getAllStatus();
      setStatus(res1.data);
    };
    notifiSuccess("remove status successfully");
    callAPI(id);
  };

  const handleRemoveStatus = (id: string) => {
    removeStatus(id);
    setOpenConfirm(false);
  };

  return (
    <div>
      <h1>Management Status</h1>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginBottom: "15px" }}
        onClick={() => {
          setFlag(false);
          openModal();
        }}
      >
        Create Status
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status.map((item: IStatus, index: number) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item._id}
                </TableCell>
                <TableCell align="left">{item.nameStatus}</TableCell>
                <TableCell align="left" style={{ display: "flex" }}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setFlag(true);
                      openModal();
                      setNameStatus(item.nameStatus);
                      setIDStatus(item._id);
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      handleOpenConfirm(item._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPopUp
        open={open}
        closeModal={closeModal}
        title={!flag ? "Form Create Status" : "Form Update Status"}
        contentButton={!flag ? "Create" : "Save"}
        nameStatus={nameStatus}
        idStatus={idStatus}
      />
      {/* Confirm Dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to DELETE ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            No
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              handleRemoveStatus(id);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
