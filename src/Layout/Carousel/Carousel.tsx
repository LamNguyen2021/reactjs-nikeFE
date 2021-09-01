import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import Carousel01 from "../../Images/carousel-01.jpg";
import Carousel02 from "../../Images/carousel-02.jpg";
import Carousel03 from "../../Images/carousel-03.jpg";
import Carousel04 from "../../Images/carousel-04.jpg";

const useStyles = makeStyles((theme) => ({
  carousel: {
    paddingTop: 50,
    vh: "90%",
  },
}));

export default function SimpleSlider() {
  const classes = useStyles();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        <img src={Carousel01} alt="carousel01" />
        <img src={Carousel02} alt="carousel02" />
        <img src={Carousel03} alt="carousel03" />
        <img src={Carousel04} alt="carousel04" />
      </Slider>
    </div>
  );
}
// Username for 'https://github.com': 
