import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import CartContent from '../Cart/CartContent';
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux';

const CartDrawer = ({cartdrawerOpen,toggleCartDrawer}) => {
  const navigate = useNavigate()
  const {user , guestId} = useSelector((state)=> state.auth)
  const {cart} = useSelector((state)=> state.cart)
  const userID = user ? user._id : null

  const handleCheckout = () =>{
    toggleCartDrawer()
    if(!user){
      navigate("/login?redirect=checkout")
    }
    else{
      navigate("/checkout") 

    }
    
  }


  return (
    <div className={`fixed top-0 right-0 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg  transform transition-transform duration-300 flex flex-col z-50 ${cartdrawerOpen ? "translate-x-0" : "translate-x-full"}`}>

      {/* close Icon  */}

      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer}>
         <IoMdClose className='h-6 w-6 text-gray-600 cursor-pointer' />
        </button>
      </div>

      {/* cart Content with scrollble area  */}
       <div className='flex-grow p-4 overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4 '>Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (<CartContent cart={cart} userID={userID} guestId={guestId}/>) :( <p>Your Cart is empty</p> )}
        

       </div>

       {/* checkOut Button fixed at the bottom  */}

       <div className='p-4 bg-white sticky bottom-0'>
       {cart && cart?.products?.length > 0 && (
        <>
        <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
          Checkout

        </button>

        <p className='text-center text-sm text-gray-500 tracking-tighter mt-2'>Shipping , taxes and Discount code Calculate at checkout</p>

        </>
       )}
        
       </div>





    
    </div>
  )
}

export default CartDrawer
