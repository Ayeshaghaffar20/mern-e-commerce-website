import React from 'react'
// import MensCollectionImg from "../../assets/mens-collection.webp"
import MensCollectionImg from "../../assets/Mens_dress.jpg"

import womenCollectionImg from "../../assets/women_dress.jpg"

import { Link } from 'react-router-dom'

const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'> 
    <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-0 flex flex-col md:flex-row gap-8'>
        {/* Womens collection  */}
        <div className='relative flex-1'>
            <img src={womenCollectionImg} alt="" className='w-full h-[550px] object-cover' />
            <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                Women's Collection
            </h2>
            <Link to="/collection/all?gender=women" className='text-gray-900 underline'>
            shop Now

            </Link>

            </div>
        </div>
        {/* Men's Collection  */}
          <div className='relative flex-1'>
            <img src={MensCollectionImg} alt="" className='w-full h-[550px] object-cover' />
            <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                Men's Collection
            </h2>
            <Link to="/collection/all?gender=men" className='text-gray-900 underline'>
            shop Now

            </Link>

            </div>
        </div>
    </div>

    </section>
  )
}

export default GenderCollectionSection
