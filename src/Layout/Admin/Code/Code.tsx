import {
  alpha,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { StyledButton } from "../../../Component/Button";
import ModalCode from "../../../Component/ModalCode";
import ModalCodeDetal from "../../../Component/ModalCodeDetail";
import { ICode } from "../../../Model/ICode";
import codeService from "../../../Service/CodeService";
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
export default function CodePage() {
  const [flag, setFlag] = React.useState<boolean>(false);
  const [listCode, setListCode] = React.useState([]);
  const [code, setCode] = React.useState<any>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openCodeDetal, setOpenCodeDetail] = React.useState<boolean>(false);

  React.useEffect(() => {
    const token = userService.getAccessToken();
    const callAPI = async () => {
      const res = await codeService.getListCode(token);
      setListCode(res.data);
    };
    callAPI();
  }, [open]);

  const openModalCodeDetail = () => {
    setOpenCodeDetail(true);
  };
  const closeModalCodeDetail = () => {
    setOpenCodeDetail(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const removeStatus = (id: string) => {
    const callAPI = async (id: string) => {
      const token: string | null = userService.getAccessToken();
      const res = await codeService.removeCode(id, token);
      const res1 = await codeService.getListCode(token);
      setListCode(res1.data);
    };
    notifiSuccess("remove code successfully");
    callAPI(id);
  };

  return (
    <div>
      <h1>Management Code</h1>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginBottom: "15px" }}
        onClick={() => {
          openModal();
        }}
      >
        Create New Code
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Code name</TableCell>
              <TableCell align="left">Code value</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCode.map((item: ICode, index: number) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item._id}
                </TableCell>
                <TableCell align="left">{item.codeName}</TableCell>
                <TableCell align="left">{item.codeValue}</TableCell>
                <TableCell align="left" style={{ display: "flex" }}>
                  {/* <StyledButton
                    style={{ padding: "0px", margin: "0px 10px" }}
                    onClick={() => {
                      removeStatus(item._id);
                    }}
                  >
                    Remove
                  </StyledButton> */}
                  <StyledButton
                    style={{ padding: "0px", margin: "0px 10px" }}
                    onClick={() => {
                      setFlag(true);
                      openModal();
                      setCode(item);
                    }}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    style={{ padding: "0px", margin: "0px 10px" }}
                    onClick={() => {
                      // setFlag(true);
                      // openModal();
                      // setCode(item);
                      openModalCodeDetail();
                      setCode(item);
                    }}
                  >
                    Code User
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalCode
        open={open}
        closeModal={closeModal}
        title={!flag ? "create code" : "update code"}
        contentButton={!flag ? "create code button" : "save code"}
        code={code}
      />
      <ModalCodeDetal
        openCodeDetal={openCodeDetal}
        closeModalCodeDetail={closeModalCodeDetail}
        title={"Create Code Detail For User"}
        code={code}
      />
    </div>
  );
}
