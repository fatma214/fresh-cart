import React from 'react'
import styles from './NotFound.module.css'
import errorImg from '../../assets/images/erroe.jpg'
export default function NotFound() {
  return <>
    <div className="container py-5">
      <div className="w-50 m-auto">
        <img src={errorImg} className='w-100' alt="" />
      </div>
    </div>
    </>
}
