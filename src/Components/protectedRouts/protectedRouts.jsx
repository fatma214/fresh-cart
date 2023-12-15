import React from 'react'
import styles from './protectedRouts.module.css'
import { Navigate } from 'react-router-dom';
export default function ProtectedRouts(props) {

  if (localStorage.getItem("userToken")) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }

}
