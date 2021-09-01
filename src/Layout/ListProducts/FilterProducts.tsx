/* eslint-disable react/jsx-key */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Filter: {
    backgroundColor: "white",
    float: "left",
    width: 190,
    fontSize: 16,
    paddingLeft: 40,
  },
  FilterGroup: {
    paddingBottom: 20,
    borderTop: "1px solid #e5e5e5",
  },
  FilterName: {
    padding: "12px 0",
    cursor: "pointer",
    color: "black",
    fontWeight: 500,
  },
  FilterCheckboxContainer: {
    paddingLeft: 5,
  },
  FilterCheckboxLabel: {
    "&:hover": {
      color: "#757575",
    },
  },
  Color: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    paddingTop: 3,
    color: "white",
    fontWeight: "bold",
  },
  ColorContainer: {
    cursor: "pointer",
  },
  ColorName: {
    marginTop: 5,
    fontSize: 12,
    "&:hover": {
      color: "#757575",
    },
  },
  size: {
    padding: "5px 10px",
    textAlign: "center",
    border: "1px #CCCCCC solid",
    borderRadius: 5,
    cursor: "pointer",
  },
}));

const BlackCheckbox = withStyles({
  root: {
    width: 30,
    height: 30,
    color: "#cccccc",
    "&$checked": {
      color: "black",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function FilterProducts(props: any) {
  const classes = useStyles();

  const Size = ["36", "37", "38", "39", "40", "41", "42"];

  const listSize = Size.map((item) => (
    <Grid item xs={4}>
      <div className={classes.size} style={{ border: "1px black solid" }}>
        {item}
      </div>
    </Grid>
  ));

  //collect color
  const capitalizeFirstLetter = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Color = ["red", "yellow", "black", "pink", "green", "white"];

  const listColor = Color.map((item) => (
    <Grid item xs={4} className={classes.ColorContainer}>
      <div
        className={classes.Color}
        style={{ backgroundColor: item, border: "1px #CCCCCC solid" }}
      ></div>
      <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
    </Grid>
  ));

  return (
    <Grid item md={2}>
      <div className={classes.Filter}>
        {/*======== Gender ========*/}
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName}>Gender</div>
          <div className={classes.FilterCheckboxContainer}>
            <div>
              <FormControlLabel
                control={<BlackCheckbox />}
                label="Men"
                className={classes.FilterCheckboxLabel}
              />
            </div>
            <div>
              <FormControlLabel
                control={<BlackCheckbox />}
                label="Women"
                className={classes.FilterCheckboxLabel}
              />
            </div>
          </div>
        </div>

        {/*======== Colour ========*/}
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName}>Colour</div>
          <Grid container spacing={2}>
            {listColor}
          </Grid>
        </div>

        {/*======== Size ========*/}
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName}>Size</div>
          <Grid container spacing={1}>
            {listSize}
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
export default FilterProducts;
