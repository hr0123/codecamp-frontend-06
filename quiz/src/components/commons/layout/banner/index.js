import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import React, { Component } from "react";

const Banner = styled.div`
  background-color: pink;
  height: 500px;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function QuizLayoutBanner() {
  return (
    <Banner>
      <h2>센과 치히로의 행방불명</h2>
      <Slider {...settings}>
        <div>
          <img src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1lOa/image/iS-UMJ3HBLxI2iGn6iq3IV5lvHs.jpg" />
        </div>
        <div>
          <img src="https://cdn.mhns.co.kr/news/photo/201701/34607_67428_3658.jpg" />
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5gUGXHLe5L8AWBpRn6rvsIcZhV0XHeE9l0g&usqp=CAU" />
        </div>
      </Slider>
    </Banner>
  );
}
