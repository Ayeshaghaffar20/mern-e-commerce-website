import React from 'react'
import { Link } from 'react-router-dom'
import features from "../../assets/featured.webp"

const FeaturedCollection = () => {
  return (
   <section className='py-16 px-4 lg:px-0'>
    <div  className='container mx-auto px-4 lg:px-8'>
           <div className='flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
         {/* left contant  */}

         <div className='lg:w-1/2 p-8 text-center lg:text-left'>
         <h2 className='text-lg font-semibold mb-2 text-gray-700'>Comfort And Style Zone</h2>
         <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Apparel Made for Your everyday Life
         </h2>
         <p className='text-lg text-gray-600 mb-6'>
            At CherryMart, we blend premium quality with modern style and everyday comfort. Enjoy seamless shopping, exclusive collections, and features designed to elevate your experience.
         </p>
         <Link to="/collection/all" className='bg-black text-white rounded-lg text-lg px-6 py-3 hover:bg-gray-800'> Shop Now </Link>
         </div>

         {/* Right Section  */}

         <div className='lg:w-1/2'>
         <img src={features } alt="" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-2xl' />
         </div>




    </div>
    </div>
 
   </section>
  )
}

export default FeaturedCollection
