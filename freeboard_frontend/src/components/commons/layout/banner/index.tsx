// import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  height: 300px;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: pink;
  text-align: center;
  cursor: pointer;
`;
const SliderItem1 = styled.div`
  width: 1000px;
  height: 200px;
  background-color: #fffafa;
`;
const SliderItem2 = styled.div`
  width: 1000px;
  height: 200px;
  background-color: #f8f8ff;
`;

// Pause On Hover
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

export default function Banner() {
  const router = useRouter();
  const onClickMoveToLanding = () => {
    router.push("/");
  };
  return (
    <Wrapper>
      <Title onClick={onClickMoveToLanding}>💕Welcome!💕</Title>
      <Slider {...settings}>
        <div>
          <SliderItem1></SliderItem1>
        </div>
        <div>
          <SliderItem2></SliderItem2>
        </div>
        <div>
          <SliderItem1></SliderItem1>
        </div>
        <div>
          <SliderItem2></SliderItem2>
        </div>
        <div>
          <SliderItem1></SliderItem1>
        </div>
        <div>
          <SliderItem2></SliderItem2>
        </div>
      </Slider>
    </Wrapper>
  );
}
