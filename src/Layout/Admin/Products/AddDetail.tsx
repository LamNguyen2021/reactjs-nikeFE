import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import API_IMAGE from "../../../Config/api-image";
import colorService from "../../../Service/ColorService";
import genderService from "../../../Service/GenderService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    width: "70%",
    margin: "15px 0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface Quantity {
  quantity: number;
  sizeId: string;
  price: number;
}
export default function AddDetail(props: any) {
  const classes = useStyles();

  const [selectedColor, setSelectedColor] = React.useState("");
  const [selectedGender, setSelectedGender] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const [quantities, setQuantities] = React.useState<Quantity[]>([]);

  const [selectedColorValid, setSelectedColorValid] =
    React.useState<boolean>(false);
  const [selectedGenderValid, setSelectedGenderValid] =
    React.useState<boolean>(false);

  const checkValid = () => {
    let result = true;
    if (selectedColor === "") {
      result = false;
      setSelectedColorValid(true);
    } else {
      setSelectedColorValid(false);
    }
    if (selectedGender === "") {
      result = false;
      setSelectedGenderValid(true);
    } else {
      setSelectedGenderValid(false);
    }
    return result;
  };

  const [colors, setcolors] = React.useState<any[]>([]);
  const [genders, setgenders] = React.useState<any[]>([]);

  React.useEffect(() => {
    colorService.getAllColors().then((res) => {
      setcolors(res.data);
    });
    genderService.getAllGenders().then((res) => {
      setgenders(res.data);
    });
  }, []);

  //handle image
  const handleImage = async (e: any) => {
    let i = 0;
    const length = e.target.files.length;
    do {
      try {
        let formData = new FormData();
        formData.append("image", e.target.files[i]);
        const res = await API_IMAGE(formData);
        images.push(res.data.data.url);
      } catch (err) {
        console.log(err);
      }
      ++i;
    } while (i < length);
  };

  // actions btn
  const saveBtn = async () => {
    if (checkValid()) {
      try {
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
            Add new Detail
          </Typography>
          <Button onClick={props.closeDialog}>Cancel</Button>
          <Button autoFocus color="inherit" onClick={saveBtn}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div className={classes.content}>
              <TextField
                error={selectedColorValid}
                className={classes.input}
                id="outlined-category-input"
                label="Color"
                select
                variant="outlined"
                value={selectedColor}
                required
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                }}
              >
                {colors.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item._id}>
                      {item.nameColor}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                error={selectedGenderValid}
                className={classes.input}
                id="outlined-category-input"
                label="Gender"
                select
                variant="outlined"
                value={selectedGender}
                required
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                }}
              >
                {genders.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item._id}>
                      {item.nameGender}
                    </MenuItem>
                  );
                })}
              </TextField>
              <div>
                <input
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                  onChange={(e: any) => handleImage(e)}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload images
                  </Button>
                </label>
              </div>
            </div>
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </div>
    </div>
  );
}
