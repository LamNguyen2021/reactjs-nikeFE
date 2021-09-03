import {
  alpha,
  Button,
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
import { StyledButton } from "../../../Component/Button";
import ModalPopUp from "../../../Component/Modal";
import { IStatus } from "../../../Model/IStatus";
import statusService from "../../../Service/StatusService";
import userService from "../../../Service/UserService";
import { notifiSuccess } from "../../../utils/MyToys";

const useStyles = makeStyles((theme) => ({
  Title: {
    fontSize: 25,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  Content: {
    display: "flex",
    justifyContent: "space-between",
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    backgroundSize: "250% auto",
    transition: "all 0.5s ease !important",
    "&:hover": {
      backgroundPosition: "right center",
    },
  },
}));

export default function Status() {
  const classes = useStyles();
  const [status, setStatus] = React.useState<IStatus[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<boolean>(false);
  const [nameStatus, setNameStatus] = React.useState<string>("");

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

  return (
    <div>
      <h1>Management Status</h1>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginBottom: "15px" }}
        onClick={() => {
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
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      removeStatus(item._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* <StyledButton
                    style={{ padding: "0px", margin: "0px 10px" }}
                    onClick={() => {
                      setFlag(true);
                      openModal();
                      setNameStatus(item.nameStatus);
                    }}
                  >
                    Update
                  </StyledButton> */}
                  {/* <StyledButton
                    style={{ padding: "0px", margin: "0px 10px" }}
                    onClick={() => {
                      removeStatus(item._id);
                    }}
                  >
                    Remove
                  </StyledButton> */}
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
      />
    </div>
  );
}
