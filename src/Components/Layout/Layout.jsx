import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
export default function Layout({userData,setuserData}) {
let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem("userToken")
    setuserData(null)
    navigate('/login')
  }
 


  return <>
      <div className='py-5 my-5'>
      <Navbar userData={userData} logOut={logOut}/>
    <Outlet></Outlet>
    <Footer/>
      </div>
    </>

}
