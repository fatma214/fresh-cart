import React, { useContext, useEffect, useState } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
export default function FeatureProducts() {
  let {addToCart,setnumOfCartItems}=useContext(cartContext)

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



  const [allProducts, setallProducts] = useState([]);
  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setallProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="container py-5">
        <div className="row">
          {allProducts.map((product) => {
            return (
              <div className="col-md-2" key={product.id}>
                <div className="product px-3 py-3">
                   <Link to={'/proudct-details/'+product.id}>
                   <img src={product.imageCover} alt="" className="w-100" />
                  <p className="text-main">{product.category.name}</p>
                  <h3 className="h6">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <p>{product.price} EGP</p>
                    <div>
                      <i className="fa-solid fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </div>
                  </div>
                   </Link>
                  <button onClick={()=>addProduct(product.id)} className="btn bg-main text-white w-100">
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
