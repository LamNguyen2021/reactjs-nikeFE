import {
  AppBar,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import categoryService from "../../../Service/CategoryService";
import productService from "../../../Service/ProductService";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    margin: "20px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "40%",
    margin: "15px 0",
  },
}));

export default function AddProduct(props: any) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [date, setDate] = React.useState<Date>();

  const [nameValid, setNameValid] = React.useState(false);
  const [selectedCategoryValid, setSelectedCategoryValid] =
    React.useState(false);
  const [dateValid, setDateValid] = React.useState(false);

  const checkValid = () => {
    let result = true;
    if (name === "") {
      result = false;
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    if (selectedCategory === "") {
      result = false;
      setSelectedCategoryValid(true);
    } else {
      setSelectedCategoryValid(false);
    }
    if (date === undefined) {
      result = false;
      setDateValid(true);
    } else {
      setDateValid(false);
    }
    return result;
  };

  const [categories, setCategories] = React.useState<any[]>([]);
  React.useEffect(() => {
    categoryService.getAllCategory().then((res) => {
      setCategories(res.data);
    });
  }, []);

  // actions btn
  const saveBtn = async () => {
    if (checkValid()) {
      try {
        const res = await productService.createProduct({
          name: name,
          categoryId: selectedCategory,
          createDate: date,
        });
        props.setLoadAgain(!props.loadAgain);
        props.closeDialog();
      } catch (err) {
        // console.log({ ...err });
        console.log(err);
      }
    }
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add new product
          </Typography>
          <Button onClick={props.closeDialog}>Cancel</Button>
          <Button autoFocus color="inherit" onClick={saveBtn}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <TextField
          error={nameValid}
          className={classes.input}
          id="outlined-name-input"
          label="Name"
          type="text"
          variant="outlined"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          error={selectedCategoryValid}
          className={classes.input}
          id="outlined-category-input"
          label="Category"
          select
          variant="outlined"
          value={selectedCategory}
          required
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          {categories.map((item, index) => {
            return (
              <MenuItem key={index} value={item._id}>
                {item.nameCategory}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          error={dateValid}
          className={classes.input}
          id="outlined-date-input"
          type="date"
          variant="outlined"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setDate(date);
          }}
        />
      </div>
    </div>
  );
}
