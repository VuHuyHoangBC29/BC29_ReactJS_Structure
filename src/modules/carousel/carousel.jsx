import { Carousel as CarouselAntd } from "antd";

import React from "react";

const contentStyle = {
  width: "100%",
  height: "550px",
  objectFit: "cover",
};

export default function Carousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <CarouselAntd dotPosition="right" autoplay>
      <div>
        <img
          src="https://afamilycdn.com/thumb_w/600/150157425591193600/2022/6/25/avatar1656128559553-1656128560430223223410-34-0-549-984-crop-16561288137262141958614.jpg"
          style={contentStyle}
        />
      </div>
      <div>
        <img
          src="https://photo.tinhte.vn/store/2015/09/3149851_Narniaa.jpg"
          style={contentStyle}
        />
      </div>
    </CarouselAntd>
  );
}
