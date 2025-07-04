import React from 'react'
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";



const FeaturedSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {/* Feature 1  */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag  className='text-xl'/>
                </div>
                <h4 className='mb-2 uppercase tracking-tighter'> free international shipping </h4>
                <p className='tracking-tighter text-sm text-gray-600'>On all orders over $100.00</p>
            </div>
                        {/* Feature 2  */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare  className='text-xl'/>
                </div>
                <h4 className='mb-2 uppercase tracking-tighter'> 45 days return </h4>
                <p className='tracking-tighter text-sm text-gray-600'>Money back guarantee</p>
            </div>
                        {/* Feature 1  */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard  className='text-xl'/>
                </div>
                <h4 className='mb-2 uppercase tracking-tighter'> secure checkout </h4>
                <p className='tracking-tighter text-sm text-gray-600'>100% secured process</p>
            </div>
        </div>
    </section>
  )
}

export default FeaturedSection
