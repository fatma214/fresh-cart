import React from 'react'
import styles from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import Categories from '../Categories/Categories'
export default function Home() {
  return <>
      <Categories/>
      <FeatureProducts/>
    </>
}