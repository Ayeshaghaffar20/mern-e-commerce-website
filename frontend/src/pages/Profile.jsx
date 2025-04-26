import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlices'
import { logout } from '../redux/slices/authSlices'

const Profile = () => {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }

  },[user, navigate])


const handleLogout = ()=>{
  dispatch(logout())
  dispatch(clearCart())
  navigate("/login")
}

  return (
    <div className='min-h-screen flex flex-col'>
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* left section  */}
          <div className=" lg:w-1/4 md:w-1/3  p-6 shadow-md rounded-lg w-full  ">
             <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user?.name}</h1>
             <p className='text-gray-600 mb-4 text-lg'>{user?.email}</p>
             <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 cursor-pointer px-4 rounded hover:bg-red-600'>Logout</button>
          </div>
          {/* right Side  */}
          <div className='w-full md:w-2/3 lg:w-3/4' >
          <MyOrdersPage/>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Profile

