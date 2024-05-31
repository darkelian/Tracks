// ImageCarousel.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Importar las imágenes
import image1 from '../../assets/parqueadero4.jpg';
import image2 from '../../assets/parqueadero5.jpg';
import image3 from '../../assets/parqueadero6.jpg';

const NextArrow = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <svg
        className="w-12 h-12 text-white bg-transparent rounded-full hover:bg-gray-500 hover:text-white transition duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M6.293 14.707a1 1 0 010-1.414L10.586 10 6.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

const PrevArrow = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <svg
        className="w-12 h-12 text-white bg-transparent rounded-full hover:bg-gray-500 hover:text-white transition duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M13.707 14.707a1 1 0 010-1.414L9.414 10l4.293-4.293a1 1 0 10-1.414-1.414l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
  
  const ImageCarousel2 = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
  
    return (
      <div className="relative h-full">
        <Slider {...settings} autoplay={true} autoplaySpeed={3000}>
          <div className="h-full">
            <img src={image1} alt="Imagen 1" className="rounded-lg w-full" />
          </div>
          <div className="h-full">
            <img src={image2} alt="Imagen 2" className="rounded-lg w-full h-full object-cover" />
          </div>
          <div className="h-full">
            <img src={image3} alt="Imagen 3" className="rounded-lg w-full h-full object-cover" />
          </div>
          {/* Añade más imágenes según sea necesario */}
        </Slider>
      </div>
    );
  }
  
  export default ImageCarousel2;