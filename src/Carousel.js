// Carousel.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    fetch("https://www.newking.io/api/carousel-images")
      .then((response) => response.json())
      .then((data) => {
        // 将相对路径转换为绝对路径
        const updatedData = data.map((item) => ({
          ...item,
          image: `https://www.newking.io/public/${item.image}`
        }));
        setCarouselImages(updatedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Carousel showThumbs={false}>
      {carouselImages.map((image, index) => (
        <a
          key={index}
          href={image.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <img src={image.image} alt="" />
            <p className="legend">{image.description}</p>
          </div>
        </a>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
