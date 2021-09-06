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
  menuItemClick: {
    padding: "19px 12px",
    color: "black",
    textDecoration: "none",
    borderBottom: "2px black solid",
  },
}));

export default function NavMenu() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [cate, setCate] = React.useState<ICategory[]>([]);
  const [numindex, setNumIndex] = React.useState<number | null>(null);

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

  const handleClickCate = (item: ICategory, index: number) => {
    setNumIndex(index);
    dispatch(setCategory(item._id));
  };

  return (
    <Container className={classes.menuList}>
      {cate.map((item, index) => {
        return (
          <Link
            href="#"
            className={
              index === numindex ? classes.menuItemClick : classes.menuItem
            }
            underline="none"
            key={item._id}
            onClick={() => {
              handleClickCate(item, index);
            }}
          >
            {item.nameCategory}
          </Link>
        );
      })}
    </Container>
  );
}
