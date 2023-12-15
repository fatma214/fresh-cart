import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import Products from './Components/Products/Products'
import ProuductDetails from './Components/ProuductDetails/ProuductDetails'
import { jwtDecode } from 'jwt-decode'
import ProtectedRouts from './Components/protectedRouts/protectedRouts'
import Checkout from './Components/Checkout/Checkout'
import { CartContextProvider } from './Context/CartContext'

import { ToastContainer, toast } from 'react-toastify';
import { Offline, Online } from "react-detect-offline";
export default function App() {
    const [userData, setuserData] = useState(null)
    function saveUser(){
    let encodedToken=localStorage.getItem("userToken")
    let decoded=jwtDecode(encodedToken);
    setuserData(decoded)
  }



  useEffect(()=>{
      if(localStorage.getItem("userToken")){
        saveUser()
      }

  },[])

  const routes = createBrowserRouter([
    {path:"",element:<Layout userData={userData} setuserData={setuserData}/> ,children:[
    {index:true,element:<Home/>},
    {path:'login',element:<Login saveUser={saveUser}/>},
    {path:'register',element:<Register/>},
    {path:'cart',element:<ProtectedRouts>
      <Cart/>
    </ProtectedRouts>},
    {path:'checkout',element:<ProtectedRouts>
      <Checkout/>
    </ProtectedRouts>},
    {path:'products',element:<ProtectedRouts><Products/></ProtectedRouts>},
    {path:'proudct-details/:id',element:<ProtectedRouts><ProuductDetails/></ProtectedRouts>},
    {path:'*',element:<NotFound/>},
    ]}
    ]    
    )

  return<>
    <CartContextProvider>
    <ToastContainer theme='colored' />
    <Online>Only shown when you're online</Online>
    <Offline ><div className='network text-white bg-dark'>you are offline now!!!!!!</div></Offline>
      <RouterProvider router={routes}></RouterProvider>
    </CartContextProvider>
  </>
}
