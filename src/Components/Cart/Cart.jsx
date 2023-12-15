import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
export default function Cart() {
  let { getLoggedCart,removeItem,updateProductCount } = useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function getCart() {
    let response = await getLoggedCart();
    // console.log(response.data.data);
    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
    }
  }
  async function deleteItem(productId){
    let response=await removeItem(productId)
    // console.log(response.data);
    setcartDetails(response.data.data)
    toast.success("product deleted successfully")

  }
  async function updateProductQuantity(productId,count){
    let response=await updateProductCount(productId,count)
    console.log(response.data);
    setcartDetails(response.data.data)
    toast.success("product count updated")

  }
  useEffect(() => { 
    getCart();
  }, []);
  return (
    <>
    <Helmet>
                <title>Cart Details</title>
    </Helmet>

    
      {cartDetails ? (
        <div className="p-4 ">
          <h3>Shop Cart</h3>
          <h6 className="text-main">
            Total Cart Price : {cartDetails.totalCartPrice}
          </h6>
          {cartDetails.products.map((product) => { 
            //  console.log(product);
            return ( 
              <div className="row py-2 border-bottom align-items-center" key={product.product._id}>
                <div className="col-md-1">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main">Price : {product.price}</h6>
                    <button onClick={()=>deleteItem(product.product._id)} className="btn border-0 p-0 "><i className="fa-regular fa-trash-can text-main"></i></button>
                  </div>
                  <div>
                    <button onClick={()=>updateProductQuantity(product.product._id,product.count+1)} className="btn border-main">+</button>
                    <span className="mx-3">{product.count}</span>
                    <button onClick={()=>updateProductQuantity(product.product._id,product.count-1)}  className="btn border-main">-</button>
                  </div>
                </div>
              </div>
            );
          })}



          <button className="btn bg-main mt-3">
            <Link to="/checkout" className="text-white">checkout</Link>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
