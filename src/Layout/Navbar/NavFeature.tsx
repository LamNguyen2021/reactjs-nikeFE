import {
  IconButton,
  InputBase,
  List,
  Drawer,
  makeStyles,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  navFeature: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 36,
  },
  search: {
    display: "flex",
    padding: "4px 4px",
    alignItems: "center",
    borderRadius: 30,
    width: 155,
    marginRight: 20,
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  searchIcon: {
    padding: 6,
    height: 25,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#dee1e3",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "65%",
  },
  iconCart: {
    position: "relative",
    "&:hover": {
      backgroundColor: "transparent",
    },
    color: "#000",
    padding: 2,
  },
  sumQuantity: {
    position: "absolute",
    right: -3,
    top: 0,
    fontSize: 13,
  },
  iconMenu: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    color: "#000",
    marginLeft: 15,
  },
  drawerMobileMenu: {
    width: 320,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
}));

export default function NavFeature() {
  const [mobile, setMobile] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMobile = () => {
    setMobile(!mobile);
  };

  return (
    <div className={classes.navFeature}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          className={classes.input}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <IconButton className={classes.iconCart}>
        <ShoppingCartIcon />
        <span className={classes.sumQuantity}>5</span>
      </IconButton>
      {isMobile ? (
        <>
          <IconButton className={classes.iconMenu} onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            variant="temporary"
            open={mobile}
            onClose={handleMobile}
            classes={{
              paper: classes.drawerMobileMenu,
            }}
          >
            <List component="ul">
              <ListItem button>
                <ListItemText primary="Men" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Women" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Kids" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Customise" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Sale" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="SNKRS" />
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : null}
    </div>
  );
}
