import React, { useContext } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';
export default function Checkout() {
  let {onlinePayment,cartId}=useContext(cartContext)
   
 async function handleSubmit(values){
  let response=await onlinePayment(cartId,values)
  if(response?.data?.status=='success'){
      window.location.href=response.data.session.url
  }
   console.log(response.data);
}

  let formik=useFormik(
    {
        initialValues:{
          details:'',
          phone:'',
          city:''
        },
        onSubmit:handleSubmit

    }
  )
  return <>
    <div className="w-50 py-5 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        

 <label htmlFor="details">detail: </label>
 <input type="text" className='form-control my-3' value={formik.values.details} onChange={formik.handleChange} id='details' name='details'/>

 <label htmlFor="phone">phone: </label>
 <input type="tel" className='form-control my-3' value={formik.values.phone} onChange={formik.handleChange} id='phone' name='phone'/>

 <label htmlFor="city">city: </label>
 <input type="text" className='form-control my-3' value={formik.values.city} onChange={formik.handleChange} id='city' name='city'/>
 <button type='submit' className='btn border-main w-100'>Pay</button>
      </form>
    </div>
    </>
}
