import React, { useState } from 'react'
import { Link, Links} from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {

      const [cartDrawerOpen,setCartDrawerOpen] = useState(false)
      const [navDrawerOpen,setNavDrawerOpen] = useState(false)
      const {cart} = useSelector((state) => state.cart)

      const cartItemCount = cart?.products?.reduce((total,product)=>total + product.quantity, 0) || 0 

      const toggleNavDrawer =() =>{
        setNavDrawerOpen(!navDrawerOpen)
      }

  const toggleCartDrawer = () =>{
    setCartDrawerOpen(!cartDrawerOpen)
  }



  return (
  <>
  <nav className='container flex mx-auto items-center justify-between py-4 px-6'>
    {/* left-Logo  */}
    <div>
        <Link to="/" className='font-medium text-2xl'>
        CherryMart
        </Link>
    </div>
    {/* center-Navigation Links  */}
    <div className='hidden md:flex space-x-6 '>
        <Link to="/collection/all?gender=Men" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Men
        </Link>
        <Link to="/collection/all?gender=Women" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Women
        </Link>
        <Link to="/collection/all?category=Top Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Top Wear
        </Link>
        <Link to="/collection/all?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Bottom Wear
        </Link>
    </div>

    {/* right-icon  */}
    <div className='flex items-center space-x-4'>
        <Link to="/admin" className='block bg-black text-white px-2 text-sm rounded'>Admin</Link>
        <Link to="/profile" className='hover:text-black'>
            <HiOutlineUser className='text-gray-700 h-6 w-6'/>
        </Link>
        <button onClick={toggleCartDrawer} className='relative hover:text-black'>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700 cursor-pointer'/>
            {cartItemCount > 0 && (<span className='absolute -top-1 text-white px-2 py-0.5 text-xs rounded-full bg-[#eA2E0E]'>{cartItemCount}</span>) }
          
        </button>
        {/* Search  */}
        <Searchbar/>

        <button onClick={toggleNavDrawer} className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>

        </button>
    </div>

  </nav>

  <CartDrawer cartdrawerOpen={cartDrawerOpen} toggleCartDrawer={toggleCartDrawer}/>

  {/* Mobile Navigation  */}

  <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white transform transition-transform duration-300 shadow-lg z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>

  <div className='flex justify-end p-4'>
    <button onClick={toggleNavDrawer}>
        <IoMdClose className='h-6 w-6 text-gray-600'/>
    </button>
    </div>
    <div className='p-4'>
        <h2 className='text-xl font-semibold mb-4'>Menu</h2>
        <nav className='space-y-4'>
            <Link to="/collection/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Men
            </Link>
            <Link to="/collection/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Women
            </Link>
             <Link to="/collection/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Top wear
            </Link>
             <Link to="/collection/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            Bottom Wear
            </Link>
        </nav>

    </div>
  
  
  </div>


  </>
  )
}

export default Navbar
