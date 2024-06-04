// src/AiCarousel.js
import React from 'react';
import Slider from 'react-slick';
import image2 from './images/ai_sample2.jpg';
import image3 from './images/ai_sample3.jpg';
import image4 from './images/ai_sample4.jpg';
import image5 from './images/ai_sample5.jpg';
import image6 from './images/ai_sample6.jpg';

const AiCarousel = ({ images }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <div className="image-slider">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

export default AiCarousel;
