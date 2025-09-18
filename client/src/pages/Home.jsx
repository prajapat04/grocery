import React from 'react'
import { Hero } from '../components/Hero'
import { Category } from '../components/Category'
import { BestSeller } from '../components/BestSeller'
import  NewsLatter  from '../components/NewsLatter'

export const Home = () => {
  return (
    <div className='mt-10'>
    <Hero />
    <Category />
    <BestSeller />
    <NewsLatter />
    </div>
  )
}
