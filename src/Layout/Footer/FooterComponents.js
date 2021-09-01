import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    marginBottom: 16,
  },
  footerItem: {
    color: "white",
    display: "block",
    marginBottom: 5,
    fontSize: 14,
    textDecoration: "none",
    lineHeight: 1.9,
  },
  footerSubItem: {
    color: "#7e7e7e",
    display: "block",
    marginBottom: 5,
    fontSize: 12,
    textDecoration: "none",
    lineHeight: 1.9,
    "&:hover": {
      color: "white",
    },
  },
  socialIconContainer: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      marginTop: 16,
    },
  },
  socialLinkIcon: {
    backgroundColor: "white",
    borderRadius: "50%",
    height: 30,
    width: 30,
    margin: "0 0 0 16px",
    [theme.breakpoints.down("xs")]: {
      margin: "0 16px 0 0",
    },
  },
  Button: {
    float: "right",
  },
  hr: {
    border: "none",
    borderTop: "1px grey solid",
  },
  Col2SubMenu: {
    marginTop: 20,
  },
  Icon: {
    color: "white",
  },
  SubFooterContainer: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    borderTop: "1px #222 solid",
  },
  subFooterVietnam: {
    color: "white",
    fontSize: 10,
    margin: "0 8px 0",
  },
  subFooterItemContainer: {
    float: "right",
  },
  subFooterItem: {
    color: "#7e7e7e",
    fontSize: 10,
    margin: "0 10px 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  subFooterCol2: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
    },
  },
}));

export default function FooterComponents() {
  const classes = useStyles();
  const [buttonHelp, setButtonHelp] = useState(false);
  const [buttonAbout, setButtonAbout] = useState(false);

  return (
    <div>
      {/*Main footer*/}
      <Grid container spacing={2} className={classes.GridContainer}>
        {/***Main column***/}
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            {/***Column 1***/}
            <Grid item xs={12} sm={4} md={3}>
              <a href="#a" className={classes.footerItem}>
                <b>FIND A STORE</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>BECOME A MEMBER</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>SIGN UP FOR EMAIL</b>
              </a>
              <a href="#a" className={classes.footerItem}>
                <b>SEND US FEEDBACK</b>
              </a>
            </Grid>

            {/***Column 2***/}
            <Hidden xsDown>
              <Grid item sm={4} md={3}>
                <a href="#a" className={classes.footerItem}>
                  <b>GET HELP</b>
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Order Status
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Delivery
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Returns
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Payment Options
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Contact Us
                </a>
              </Grid>
              <Grid item sm={4} md={3}>
                <a href="#a" className={classes.footerItem}>
                  <b>ABOUT NIKE</b>
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  News
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Careers
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Investors
                </a>
                <a href="#a" className={classes.footerSubItem}>
                  Sustainability
                </a>
              </Grid>
            </Hidden>
            {/*Column 2 Mobile*/}
            <Hidden smUp>
              <Grid item xs={12}>
                <hr className={classes.hr}></hr>
                <a
                  href="#a"
                  className={classes.footerItem}
                  onClick={() => {
                    setButtonHelp(!buttonHelp);
                    setButtonAbout(false);
                  }}
                >
                  <b>
                    GET HELP
                    {/*Hide show*/}
                    {!buttonHelp && <AddIcon className={classes.Button} />}
                    {buttonHelp && <RemoveIcon className={classes.Button} />}
                  </b>
                </a>
                {buttonHelp && (
                  <div className={classes.Col2SubMenu}>
                    <a href="#a" className={classes.footerSubItem}>
                      Order Status
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Delivery
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Returns
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Payment Options
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Contact Us
                    </a>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} className={classes.col2Mobile}>
                <hr className={classes.hr}></hr>
                <a
                  href="#a"
                  className={classes.footerItem}
                  onClick={() => {
                    setButtonAbout(!buttonAbout);
                    setButtonHelp(false);
                  }}
                >
                  <b>
                    ABOUT NIKE
                    {/*Hide show*/}
                    {!buttonAbout && <AddIcon className={classes.Button} />}
                    {buttonAbout && <RemoveIcon className={classes.Button} />}
                  </b>
                </a>
                {buttonAbout && (
                  <div className={classes.Col2SubMenu}>
                    <a href="#a" className={classes.footerSubItem}>
                      News
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Careers
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Investors
                    </a>
                    <a href="#a" className={classes.footerSubItem}>
                      Sustainability
                    </a>
                  </div>
                )}
              </Grid>
            </Hidden>

            {/***Column 3***/}
            <Hidden smDown>
              <Grid item md={3}></Grid>
            </Hidden>
          </Grid>
        </Grid>

        {/***Social Icon Link***/}
        <Grid item xs={12} sm={3} className={classes.socialIconContainer}>
          <a href="#a">
            <img
              src="https://www.pngfind.com/pngs/m/159-1595562_logo-twitter-nero-vector-twitter-icon-svg-hd.png"
              className={classes.socialLinkIcon}
              alt=""
            />
          </a>
          <a href="#a">
            <img
              src="https://w7.pngwing.com/pngs/624/811/png-transparent-computer-icons-facebook-social-media-f-logo-cross-brand.png"
              className={classes.socialLinkIcon}
              alt=""
            />
          </a>
          <a href="#a">
            <img
              src="https://www.coachseansmith.com/wp-content/uploads/youtube-2048-black.png"
              className={classes.socialLinkIcon}
              alt=""
            />
          </a>
          <a href="#a">
            <img
              src="https://mpng.subpng.com/20180411/chw/kisspng-computer-icons-photography-clip-art-instagram-5ace2028a0bab5.7001577015234580886584.jpg"
              className={classes.socialLinkIcon}
              alt=""
            />
          </a>
        </Grid>
      </Grid>

      {/*Sub footer*/}
      <Grid container spacing={2} className={classes.SubFooterContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} alignItems="flex-end">
            <Hidden xsDown>
              <Grid item xs={12}>
                <LocationOnIcon className={classes.Icon} />
                <span className={classes.subFooterVietnam}>Vietnam</span>
                <span className={classes.subFooterItem}>
                  © 2020 Nike, Inc. All Rights Reserved
                </span>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid item xs={12}>
                <LocationOnIcon className={classes.Icon} />
                <span className={classes.subFooterVietnam}>Vietnam</span>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.subFooterItem}>
                  © 2020 Nike, Inc. All Rights Reserved
                </span>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.subFooterCol2}>
          <Grid container spacing={2}>
            <Hidden xsDown>
              <Grid item sm={12}>
                <div className={classes.subFooterItemContainer}>
                  <span className={classes.subFooterItem}>Guides</span>
                  <span className={classes.subFooterItem}>Terms of Sale</span>
                  <span className={classes.subFooterItem}>Terms of Use</span>
                  <span className={classes.subFooterItem}>
                    Nike Privacy Policy
                  </span>
                </div>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid item xs={12} sm={3}>
                <span className={classes.subFooterItem}>Guides</span>
              </Grid>
              <Grid item xs={12} sm={3}>
                <span className={classes.subFooterItem}>Terms of Sale</span>
              </Grid>
              <Grid item xs={12} sm={3}>
                <span className={classes.subFooterItem}>Terms of Use</span>
              </Grid>
              <Grid item xs={12} sm={3}>
                <span className={classes.subFooterItem}>
                  Nike Privacy Policy
                </span>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
