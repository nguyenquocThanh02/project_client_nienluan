import React from "react";
import Slider from "react-slick";
import {Image} from "antd";
function SliderComponent({arrImages}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return ( 
        <Slider {...settings} >
            {
                arrImages.map((image, i)=>{
                    return (
                        <Image  key={i} src={image} alt="slider" preview={false}/>
                    )
                })
            }
        </Slider>
     );
}

export default SliderComponent;