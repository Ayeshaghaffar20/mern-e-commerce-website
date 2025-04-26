import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import login from "../assets/login.webp"
import { loginUser, clearSuccess} from '../redux/slices/authSlices'
import { useDispatch, useSelector,} from 'react-redux'
import toast from 'react-hot-toast'
import { mergeCart } from '../redux/slices/cartSlices'



const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()    
    const navigate = useNavigate()
    const location = useLocation()
    const {user, error,success,guestId} = useSelector((state) => state.auth);
    const {cart} = useSelector((state)=> state.cart)

    const redirect = new URLSearchParams(location.search).get("redirect") || "/"
    const isCheckoutRedirect = redirect.includes("checkout")
    const currentPath = location.pathname;

    useEffect(()=>{
      if(user) {

        if (currentPath === "/login") {
          navigate("/"); // If user tries to go to /login, redirect to home
          return;
        }



        if(cart?.products.length > 0 && guestId) {
          dispatch(mergeCart({user,guestId})).then(()=>{
            navigate(isCheckoutRedirect ? "/checkout" : "/")
          })

        }else{
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        }
      }
    }, [user, guestId , cart , navigate ,isCheckoutRedirect, dispatch,currentPath])
    



 
  useEffect(() => {
    if (user && success) {
      toast.success("login Successful ✅");
      dispatch(clearSuccess());
    }
  }, [user, success, dispatch]);

  
  useEffect(() => {
    if (error) {
      toast.error(error); 
    }
  }, [error]);  
    

    const handleSubmit =(e) =>{
        e.preventDefault()
        dispatch(loginUser({email,password}))
    }

    

  return (
    <div className='flex'> 
    <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
    <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm '>
        <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>CherryMart</h2>
        </div>
        <h2 className='font-bold text-2xl text-center mb-6'>Login 📧</h2>
        <p className='text-center mb-6'>Access your account securely by logging in below</p>
        <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input 
            type="email"
            value={email}
            placeholder='Enter your Email id'
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 rounded border' />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input 
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 rounded border' />
        </div>
        <button className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800  cursor-pointer'>Submit</button>
        <p className='mt-6 text-center text-sm  flex gap-2 items-center justify-center'>
            Don't have an account 
             <Link to={`/register?redirect${encodeURIComponent(redirect)}`} className='text-blue-500'>Register</Link>
        </p>


    </form>
    </div>

    <div className='hidden md:block bg-gray-800 w-1/2'>
    <div className='h-full flex flex-col justify-center items-center'>
        <img src={login} alt="" className='h-[750px] w-full object-cover' />
    </div>
    </div>
      
    </div>
  )
}

export default Login

