import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let cartContext=createContext();

export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    async function getCart(){
        let response =await getLoggedCart();
        if(response?.data?.status=='success'){
            setcartId(response.data.data._id);
            setnumOfCartItems(response.data.numOfCartItems)
        }
       
    }
    useEffect(()=>{
        getCart()
    },[])
        let headers={
            token:localStorage.getItem("userToken")
        }
        function addToCart(productId){
            return    axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                    productId:productId
                },{
                    headers: headers
                }
                
                
                ).then((response)=>response)
                .catch((error)=>error);
        }
        function getLoggedCart(productId){
            return    axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                    headers: headers
                }
                
                
                ).then((response)=>response)
                .catch((error)=>error);
        }

        function removeItem(productId){
            return    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                    headers: headers
                }
                
                
                ).then((response)=>response)
                .catch((error)=>error);
                
        }
        function updateProductCount(productId,count){
            return    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count:count
            },
            {
                    headers: headers
                }
                
                
                ).then((response)=>response)
                .catch((error)=>error);
                
        }
        function onlinePayment(cartId,shippingAddress){
            return    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                shippingAddress:shippingAddress
            },
            {
                    headers: headers
                }
                
                
                ).then((response)=>response)
                .catch((error)=>error);
                
        }

   return <cartContext.Provider value={{addToCart,numOfCartItems,setnumOfCartItems, cartId,getLoggedCart,removeItem,updateProductCount,onlinePayment}}>
           {props.children}
    </cartContext.Provider>

}