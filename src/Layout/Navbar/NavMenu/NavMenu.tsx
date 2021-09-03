import { Container, Link, makeStyles } from "@material-ui/core";
import React from "react";
import { useAppDispatch } from "../../../Hooks/Hook";
import { ICategory } from "../../../Model/ICategory";
import categoryService from "../../../Service/CategoryService";
import { setCategory } from "./categoryReducer";

const useStyles = makeStyles((theme) => ({
  menuList: {
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuItem: {
    padding: "19px 12px",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      borderBottom: "2px black solid",
    },
  },
}));

export default function NavMenu() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [cate, setCate] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    categoryService
      .getAllCategory()
      .then((res) => {
        setCate(res.data);
      })
      .catch((err) => {
        console.log({ ...err });
      });
  }, []);

  const handleClickCate = (item: ICategory) => {
    dispatch(setCategory(item._id));
  };

  return (
    <Container className={classes.menuList}>
      {cate.map((item) => {
        return (
          <Link
            href="#"
            className={classes.menuItem}
            underline="none"
            key={item._id}
            onClick={() => {
              handleClickCate(item);
            }}
          >
            {item.nameCategory}
          </Link>
        );
      })}
    </Container>
  );
}
