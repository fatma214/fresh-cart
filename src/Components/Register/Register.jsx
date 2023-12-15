import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Register() {
  const notify = (msg,type) => toast[type](msg);
  //  function validate(values){
  //   let errors={}
  //   if(!values.name){
  //     errors.name="required"
  //   }else if(values.name.length<3){
  //       errors.name="must be more than 3 character"
  //   }

  //   if(!values.email){
  //     errors.email="required"
  //   }else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if(!values.password){
  //     errors.password="required"
  //   }else if(!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)){
  //       errors.password="password must start with capital [4-8] letters"
  //   }


  //   if(!values.rePassword){
  //     errors.rePassword="required"
  //   }else if(values.rePassword!=values.password){
  //       errors.rePassword="password and rePassword not matched"
  //   }

  //   if(!values.phone){
  //     errors.phone="required"
  //   }else if(!/^01[0125][0-9]{8}$/i.test(values.phone)){
  //       errors.phone="invalid phone"
  //   }

  //   return errors

  //  }

  const [isLoading, setisLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  let navigate = useNavigate()
  async function register(vales) {
    setisLoading(true)
    setErrorMsg(null)
    console.log(vales);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', vales).catch(
      (err) =>{
        notify(err.response.data.message ,"error")
        setisLoading(false);
        setErrorMsg(err.response.data.message)
      }
    )

    if (data.message == 'success') {
      setisLoading(false)
      notify("success","success")
      navigate('/login')
    }

  }

  let mySchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "min  is 3 characters").max(15, 'max is 15 characters'),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,}$/, "passoword should start with capital character ,must be at least 6 chars").required("password is required"),
    rePassword: Yup.string().required("repassword is required").oneOf([Yup.ref('password')], "repassword must match password"),
    phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "invalid phone")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: mySchema,
    onSubmit: (val) => register(val)


  })
console.log(formik);

  return <>
    <div className="container pb-5 mb-5">

      <h3>Register Now</h3>
      {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>:""}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" className='form-control mb-2' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">     {formik.errors.name}</div> : ""}

        <label htmlFor="email">Email</label>
        <input type="email" className='form-control mb-2' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">     {formik.errors.email}</div> : ""}

        <label htmlFor="password">Password</label>
        <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">     {formik.errors.password}</div> : ""}


        <label htmlFor="rePassword">rePassword</label>
        <input type="password" className='form-control mb-2' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">     {formik.errors.rePassword}</div> : ""}


        <label htmlFor="phone">phone</label>
        <input type="tel" className='form-control mb-2' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">     {formik.errors.phone}</div> : ""}

        {isLoading ? <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn opacity-100 bg-main text-white' disabled={!(formik.isValid&&formik.dirty)}>Register</button>}


      </form>
    </div>
  </>
}
