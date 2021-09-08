import {
  AppBar,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import API_IMAGE from "../../../Config/api-image";
import colorService from "../../../Service/ColorService";
import genderService from "../../../Service/GenderService";
import sizeService from "../../../Service/SizeService";

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
  image: {
    margin: "15px 15px",
  },

  container: {
    display: "flex",
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
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
  const [selectedQuantities, setSelectedQuantities] = React.useState<
    Quantity[]
  >([]);
  const [images, setImages] = React.useState<string[]>([]);

  //check validation when send API
  const [selectedColorValid, setSelectedColorValid] = React.useState(false);
  const [selectedGenderValid, setSelectedGenderValid] = React.useState(false);
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

  //the first loading
  const [colors, setcolors] = React.useState<any[]>([]);
  const [genders, setgenders] = React.useState<any[]>([]);
  const [quantities, setQuantities] = React.useState<any[]>([]); //list size
  React.useEffect(() => {
    colorService.getAllColors().then((res) => {
      setcolors(res.data);
    });
    genderService.getAllGenders().then((res) => {
      setgenders(res.data);
    });
    sizeService.getAllSizes().then((res) => {
      setQuantities(res.data);
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
        setImages([...images]);
      } catch (err) {
        console.log(err);
        // console.log({ ...err });
      }
      ++i;
    } while (i < length);
  };

  // actions btn
  const saveBtn = async () => {
    if (checkValid()) {
      try {
      } catch (err) {
        console.log(err);
        // console.log({ ...err });
      }
    }
  };

  //Popup
  const [checked, setChecked] = React.useState(false);
  //Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  //handle quantity
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [sizeId, setSizeId] = React.useState<string>("");
  const handleQuantity = (e: any) => {
    const item = selectedQuantities.find(
      (item) => item.sizeId === e.target.value
    );
    if (item === undefined) {
      // size mới
      setSizeId(e.target.value);
      setChecked(true);
    } else {
      // trùng size đã chọn -> xóa đi
      selectedQuantities.splice(selectedQuantities.indexOf(item), 1);
      setSelectedQuantities([...selectedQuantities]);
    }
  };
  const addQuantity = (e: any) => {
    e.preventDefault();
    selectedQuantities.push({ quantity, sizeId, price });
    setSelectedQuantities([...selectedQuantities]);
    setChecked(false);
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div>
      <div className={classes.container}>
        <Fade in={checked}>
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={(e: any) => {
                addQuantity(e);
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fef6e4",
                  padding: 20,
                }}
              >
                <span>Fill quantity and price</span>
                <TextField
                  style={{ width: "100%", margin: 15 }}
                  id="outlined-category-input"
                  label="Quantity"
                  variant="outlined"
                  value={quantity}
                  type="number"
                  onChange={(e: any) => {
                    setQuantity(e.target.value);
                  }}
                />
                <TextField
                  style={{ width: "100%", margin: 15 }}
                  id="outlined-category-input"
                  label="Price"
                  variant="outlined"
                  value={price}
                  type="number"
                  onChange={(e: any) => {
                    setPrice(e.target.value);
                  }}
                />
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </div>
        </Fade>
      </div>
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
        <Grid container spacing={3} style={{ width: "100%" }}>
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
            <div
              style={{ marginLeft: 15, display: checked ? "none" : "block" }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose size</FormLabel>
                <Grid container spacing={1}>
                  {quantities.map((size) => {
                    return (
                      <Grid item xs={3}>
                        <FormControlLabel
                          value={size._id}
                          control={<Checkbox color="primary" />}
                          label={`Size: ${size.nameSize}`}
                          labelPlacement={size.nameSize}
                          onChange={(e: any) => {
                            handleQuantity(e);
                          }}
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                        />

                        <Popover
                          id="mouse-over-popover"
                          className={classes.popover}
                          classes={{
                            paper: classes.paper,
                          }}
                          open={open}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Typography>I use Popover.</Typography>
                        </Popover>
                      </Grid>
                    );
                  })}
                </Grid>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.image}>
              <h2>Images:</h2>
              {images.map((url) => {
                return (
                  <img
                    src={url}
                    style={{
                      width: 150,
                      border: "1px solid black",
                      marginLeft: 10,
                    }}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
