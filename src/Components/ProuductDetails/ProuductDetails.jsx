import React, { useContext, useEffect, useState } from "react";
import styles from "./ProuductDetails.module.css";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
export default function ProuductDetails() {
  let { id } = useParams();
  let {addToCart,setnumOfCartItems}=useContext(cartContext)
  const [productDetails, setproductDetails] = useState({});
  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setproductDetails(data.data);
    // console.log(data.data);
  }
  async function addProduct(productId){
    let response=await addToCart(productId);
    if(response?.data?.status==='success'){
      toast.success(response.data.message)
      
    }else{
      toast.error("error")
    }
    console.log(response);
    setnumOfCartItems(response.data.numOfCartItems)
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (

    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
        
          <Slider {...settings}>
            {productDetails?.images?.map((img) => (
              <div>
                <img
                  src={img}
                  alt=""
                  className="w-100"
                />
              </div>
            ))}
          </Slider>
            {/* <img className="w-100" src={productDetails.imageCover} alt="" /> */}
          </div>
          <div className="col-md-8">
            <h1>{productDetails.title}</h1>
            <p>{productDetails.description}</p>
            <div className="d-flex justify-content-between">
              <p>{productDetails.price} EGP</p>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {productDetails.ratingsAverage}
              </div>
            </div>
            <button  onClick={()=>{addProduct(productDetails._id)}} className="btn bg-main text-white w-100">
                    + Add
                  </button>
          </div>
        </div>
      </div>
    </>
  );
}
