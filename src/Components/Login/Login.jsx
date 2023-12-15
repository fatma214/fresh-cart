import React, { useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
export default function Register({saveUser}) {
  const [isLoading, setisLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  let navigate = useNavigate()
  async function login(vales) {
    setisLoading(true)
    setErrorMsg(null)
    console.log(vales);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', vales).catch(
      (err) =>{
        console.log(err);
        setisLoading(false);
        setErrorMsg(err.response.data.message)
      }
    )
   
    if (data.message == 'success') {
      setisLoading(false)
      localStorage.setItem("userToken",data.token)
      saveUser()
      navigate('/')
    }

  }

  let mySchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/, "passoword should start with capital character ,must be at least 6 chars").required("password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (val) => login(val)


  })


  return <>
    <div className="container pb-5 mb-5">

      <h3>Login Now</h3>
      {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:""}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email</label>
        <input type="email" className='form-control mb-2' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">     {formik.errors.email}</div> : ""}

        <label htmlFor="password">Password</label>
        <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">     {formik.errors.password}</div> : ""}


        {isLoading ? <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn bg-main text-white'>Login</button>}


      </form>
    </div>
  </>
}
