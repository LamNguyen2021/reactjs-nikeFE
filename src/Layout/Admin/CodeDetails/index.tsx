import React from "react";
import {
  alpha,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import codeService from "../../../Service/CodeService";
import userService from "../../../Service/UserService";
import {
  StyledButton,
  StyledButtonActive,
  StyledButtonInActive,
} from "../../../Component/Button";
import statusService from "../../../Service/StatusService";
import { notifiSuccess } from "../../../utils/MyToys";
export default function CodeDetails() {
  const [listCodeDetail, setListCodeDetail] = React.useState([]);
  const [statusActive, setStatusActive] = React.useState<any>();
  const [statusInActive, setStatusInActive] = React.useState<any>();

  React.useEffect(() => {
    const callAPI = async () => {
      const token = userService.getAccessToken();
      const res = await codeService.getListCodeDetail(token);
      const resListStatus = await statusService.getAllStatus();
      for (const item of resListStatus.data) {
        if (item.nameStatus === "active") {
          setStatusActive(item);
        }
        if (item.nameStatus === "inactive") {
          setStatusInActive(item);
        }
      }
      setListCodeDetail(res.data);
    };
    callAPI();
  }, []);
  //   console.log(statusActive, statusInActive);

  const updateStatus = (idStatus: string, idCodeDetail: string) => {
    const callAPI = async () => {
      const token = userService.getAccessToken();
      const data = {
        idStatus: idStatus,
      };
      const res = await codeService.updateCodeDetail(idCodeDetail, token, data);
      const res1 = await codeService.getListCodeDetail(token);
      setListCodeDetail(res1.data);
      notifiSuccess(res.data);
    };
    callAPI();
  };

  return (
    <div>
      <h1>Management Code Detail</h1>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Code Name </TableCell>
              <TableCell align="left">Code Value </TableCell>
              <TableCell align="center">Create Date</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listCodeDetail.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.code.codeName}</TableCell>
                <TableCell>{item.code.codeValue}</TableCell>
                <TableCell>
                  {new Date(item.code.createDate).toDateString()} -{" "}
                  {new Date(item.code.createDate).toLocaleTimeString()}
                </TableCell>
                <TableCell>{item.user.username}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{item.status.nameStatus.toUpperCase()}</TableCell>
                <TableCell>
                  {item.status.nameStatus === "inactive" && (
                    <StyledButtonActive
                      onClick={() => {
                        updateStatus(statusActive._id, item._id);
                      }}
                    >
                      Active
                    </StyledButtonActive>
                  )}
                  {item.status.nameStatus === "active" && (
                    <StyledButtonInActive
                      onClick={() => {
                        updateStatus(statusInActive._id, item._id);
                      }}
                    >
                      InActive
                    </StyledButtonInActive>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
