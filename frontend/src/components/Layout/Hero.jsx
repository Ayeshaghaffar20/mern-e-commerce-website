import React from 'react'

import HeroImg from "../../assets/hero_section.jpg"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
  <section className='relative'>
    <img src={HeroImg} alt="" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
    <div className='absolute inset-0  bg-black/20 flex items-center justify-center'>
        <div className='text-center text-white p-6 '>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4 '>vacation <br/>Ready</h1>
             <p className='text-sm tracking-tighter md:text-lg mb-6'>
                Explore our handpicked collections made just for your everyday style and comfort – with worldwide shipping.
             </p>
             <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
             Shop Now
             </Link>

        </div> 

    </div>
  </section>
  )
}

export default Hero
