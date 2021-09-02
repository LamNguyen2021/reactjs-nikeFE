/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import productService from "../../Service/ProductService";
import { ISize } from "../../Model/ISize";
import { IColor } from "../../Model/IColor";
import { IGender } from "../../Model/IGender";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
  },
  Filter: {
    width: 220,
    height: "80vh",
    fontSize: 16,
    paddingLeft: 40,
    paddingRight: 40,
    overflowY: "auto",
    "&::-webkit-scrollbar-track": {
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar": {
      backgroundColor: "#F5F5F5",
      width: 7,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 100,
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#555",
    },
  },
  Color: {
    width: 30,
    height: 30,
    padding: 0,
    border: "1px solid black",
    borderRadius: "100%",
    cursor: "pointer",
    "&:hover": {},
  },
  size: {
    minWidth: "30px",
    padding: "5px 10px",
    textAlign: "center",
    border: "1px #CCCCCC solid",
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      border: "2px solid",
    },
  },
  hidden: {
    display: "none",
  },
  flexWrapStyle: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
interface IProps {
  filter: (name: string, genders: any, colors: any, sizes: any) => void;
}
function FilterProducts({ filter }: IProps) {
  const classes = useStyles();

  const [Size, setSize] = React.useState<ISize[]>([]);
  const [Color, setColor] = React.useState<IColor[]>([]);
  const [Gender, setGender] = React.useState<IGender[]>([]);

  useEffect(() => {
    productService.getAllSize().then((res) => {
      setSize(res.data);
    });
    productService.getAllColor().then((res) => {
      setColor(res.data);
    });
    productService.getAllGender().then((res) => {
      setGender(res.data);
    });
  }, []);

  const [openGender, setOpenGender] = React.useState(true);
  const [selectedGender, setSelectedGender] = React.useState<string[]>([]);

  const [openColor, setOpenColor] = React.useState(true);
  const [selectedColor, setSelectedColor] = React.useState<string[]>([]);

  const [openSize, setOpenSize] = React.useState(true);
  const [selectedSize, setSelectedSize] = React.useState<string[]>([]);

  const handleToggle = (id: string, selected: string[], callback: Function) => {
    const currentIndex = selected.indexOf(id); // kiểm tra item người dùng click vào đã có trong mảng đã chọn chưa
    const newSelected = [...selected];

    if (currentIndex === -1) {
      // chưa có trong mảng được chọn
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1); // có rồi -> xóa đi
    }

    callback(newSelected); // render lại
  };

  useEffect(() => {
    filter("", selectedGender, selectedColor, selectedSize);
  }, [selectedGender, selectedColor, selectedSize]);

  return (
    <Grid item sm={3}>
      <div className={classes.Filter}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          {/* Gender */}
          <ListItem
            button
            onClick={() => {
              setOpenGender(!openGender);
            }}
          >
            <ListItemText primary={`Gender(${selectedGender.length})`} />
            {openGender ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGender} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {Gender.map((value) => {
                const labelId = `checkbox-list-label-${value._id}`;

                return (
                  <ListItem
                    key={value._id}
                    role={undefined}
                    dense
                    button
                    onClick={() => {
                      handleToggle(
                        value._id,
                        selectedGender,
                        setSelectedGender
                      );
                    }}
                  >
                    <Checkbox
                      edge="start"
                      checked={selectedGender.indexOf(value._id) !== -1} // kiểm tra id hiện tại có trong mảng không
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                    <ListItemText
                      id={labelId}
                      primary={`${value.nameGender}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          {/* Color */}
          <ListItem
            button
            onClick={() => {
              setOpenColor(!openColor);
            }}
          >
            <ListItemText primary={`Color(${selectedColor.length})`} />
            {openColor ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openColor} timeout="auto" unmountOnExit>
            <List
              className={classes.flexWrapStyle}
              component="div"
              disablePadding
            >
              {Color.map((value) => {
                const labelId = `checkbox-list-label-${value._id}`;
                return (
                  <Grid item xs={4}>
                    <ListItem
                      key={value._id}
                      role={undefined}
                      dense
                      onClick={() => {
                        handleToggle(
                          value._id,
                          selectedColor,
                          setSelectedColor
                        );
                      }}
                    >
                      <ListItemIcon>
                        {selectedColor.indexOf(value._id) !== -1 ? (
                          <div
                            className={classes.Color}
                            style={{
                              backgroundColor: `${value.nameColor}`,
                              fontSize: 20,
                              textAlign: "center",
                              fontWeight: 900,
                              color: `${
                                value.nameColor === "white" ? "black" : "white"
                              }`,
                            }}
                          >
                            ✓
                          </div>
                        ) : (
                          <div
                            className={classes.Color}
                            style={{
                              backgroundColor: `${value.nameColor}`,
                            }}
                          ></div>
                        )}
                      </ListItemIcon>
                    </ListItem>
                  </Grid>
                );
              })}
            </List>
          </Collapse>
          {/* Size */}
          <ListItem
            button
            onClick={() => {
              setOpenSize(!openSize);
            }}
          >
            <ListItemText primary={`Size(${selectedSize.length})`} />
            {openSize ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSize} timeout="auto" unmountOnExit>
            <List
              className={classes.flexWrapStyle}
              component="div"
              disablePadding
            >
              {Size.map((value) => {
                const labelId = `checkbox-list-label-${value._id}`;
                return (
                  <Grid item xs={4}>
                    <ListItem
                      key={value._id}
                      role={undefined}
                      dense
                      onClick={() => {
                        handleToggle(value._id, selectedSize, setSelectedSize);
                      }}
                    >
                      <ListItemText
                        className={classes.size}
                        id={labelId}
                        primary={`${value.nameSize}`}
                        style={
                          selectedSize.indexOf(value._id) !== -1
                            ? { border: "2px solid" }
                            : {}
                        }
                      />
                    </ListItem>
                  </Grid>
                );
              })}
            </List>
          </Collapse>
        </List>
      </div>
    </Grid>
  );
}
export default FilterProducts;
