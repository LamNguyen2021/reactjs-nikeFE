import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Checkbox,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import userService from "../Service/UserService";
import { USER_ROLE } from "../Config";
import { StyledButton } from "./Button";
import statusService from "../Service/StatusService";
import codeService from "../Service/CodeService";
import { notifiError, notifiSuccess } from "../utils/MyToys";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));
interface Props {
  openCodeDetal: boolean;
  closeModalCodeDetail: () => void;
  title: string;
  code: any;
}
export default function ModalCodeDetal({
  closeModalCodeDetail,
  openCodeDetal,
  title,
  code,
}: Props) {
  const classes = useStyles();
  const [listUser, setListUser] = React.useState<any>([]);
  let [count, setCount] = React.useState<number>(0);
  let [statusActive, setStatusActive] = React.useState<any>({});
  let [all, setAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (openCodeDetal) {
      const callAPI = async () => {
        const token = userService.getAccessToken();
        const res = await userService.getAllUsers(token);
        const array: any[] = [];
        // duyệt từng user
        for (let item of res.data) {
          if (item.role.nameRole === USER_ROLE.USER) {
            item = { ...item, [item.email]: false }; // thêm 1 trường email: false
            array.push(item);
          }
        }
        const res1 = await statusService.getAllStatus();
        for (const item of res1.data) {
          // duyệt để lấy object:active
          if (item.nameStatus === "active") {
            setStatusActive(item);
            break;
          }
        }
        setListUser(array);
      };
      callAPI();
    }
  }, [openCodeDetal]);

  const handleChange = (event: any) => {
    const array: any[] = [];
    if (event.target.name === "All") {
      setAll(event.target.checked);
      console.log("all", all);

      const array: any[] = [];
      for (let item of listUser) {
        item = { ...item, [item.email]: !all };
        console.log("email", item?.[item.email]);
        if (item?.[item.email] === true) {
          setCount((count += 1));
        } else if (item?.[item.email] === false && count > 0) {
          setCount((count -= 1));
        }
        array.push(item);
      }
      setListUser(array);
    } else {
      if (event.target.checked === true) {
        setCount((count += 1));
      } else {
        setCount((count -= 1));
      }
      for (let item of listUser) {
        item = { ...item, [event.target.name]: event.target.checked }; //them email:true/false
        array.push(item);
      }
      setListUser(array);
    }
  };
  const createCodeDetail = () => {
    const listIdUsers: any[] = [];
    for (const item of listUser) {
      if (item?.[item.email] === true) {
        listIdUsers.push(item._id);
      }
    }
    const data = {
      idCode: code._id,
      listIdUsers,
      idStatus: statusActive._id,
    };
    // const callAPI = async () => {
    //   const token = userService.getAccessToken();
    //   const res = await codeService.postCodeDetail(token, data);
    //   notifiSuccess(res.data);
    // };
    // callAPI();
    const token = userService.getAccessToken();
    codeService
      .postCodeDetail(token, data)
      .then((res: any) => {
        notifiSuccess(res.data);
      })
      .catch((err: any) => {
        console.log({ ...err });
        let str = "";
        for (const item of err.response.data.message) {
          str += item + " ";
        }
        notifiError(`${str} already have this code`);
      });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openCodeDetal}
        onClose={closeModalCodeDetail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCodeDetal}>
          <div className={classes.paper}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={all}
                            onChange={handleChange}
                            name="All"
                          />
                        }
                        label="All"
                      />
                      count: {count}
                    </TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">YearOfBirth</TableCell>
                    <TableCell align="center">address</TableCell>
                    <TableCell align="center">role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listUser.map((item: any) => {
                    // console.log(item);
                    return (
                      <TableRow>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={item?.[item.email]}
                                onChange={handleChange}
                                name={item.email}
                              />
                            }
                            label=""
                          />
                        </TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.yearOfBirth}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.role.nameRole}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <StyledButton
              style={{ padding: "0px", margin: "0px 10px" }}
              onClick={() => {
                createCodeDetail();
              }}
            >
              Create Code Detail
            </StyledButton>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
