import React from "react";
import { makeStyles, alpha } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { RootState } from "../../../Redux/store";
import userService from "../../../Service/UserService";
import Row from "./Row";

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

export default function ListUsers() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [users, setUsers] = React.useState<any>([]);
  const token = useAppSelector(
    (state: RootState) => state.credentialsReducer.token
  );
  const isChange = useAppSelector(
    (state: RootState) => state.manageUserReducer.isCRUD
  );

  React.useEffect(() => {
    userService
      .getAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, isChange]);

  const handleFindUser = (id: string) => {
    const foundUser = users.find((x: any) => x._id === id);
    return foundUser;
  };

  return (
    <div className={classes.Title}>
      <div className={classes.Content}>
        <div className={classes.Title}>List User</div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Fullname</TableCell>
              <TableCell align="left">Year of Birth</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any, index: any) => (
              <Row
                key={index}
                user={user}
                findUser={(id: string) => handleFindUser(id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
