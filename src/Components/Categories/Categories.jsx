import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import Slider from "react-slick";
import axios from "axios";
export default function Categories() {
  const [categories, setcategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/Categories"
    );
    setcategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id}>
                <img
                  height={300}
                  src={category.image}
                  alt=""
                  className="w-100"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
