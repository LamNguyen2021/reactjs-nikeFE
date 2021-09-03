import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  ProductContainer: {
    padding: "0 44px",
    width: "100%",
    fontSize: 16,
    lineHeight: 1.7,
    [theme.breakpoints.down("md")]: {
      padding: "0 8px",
    },
  },
  ProductImage: {
    width: "100%",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
}));

interface IProps {
  images: any;
}
function Images({ images }: IProps) {
  const classes = useStyles();
  if (images) {
    if (Object.keys(images).length === 0) {
      return <span>loading...</span>;
    }
  }

  return (
    <Grid container className={classes.ProductContainer} spacing={2}>
      {images &&
        images.map((item: any) => {
          return (
            <Grid item xs={6} key={images._id}>
              <img
                alt=""
                className={classes.ProductImage}
                src={item.urlImage}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Images;
