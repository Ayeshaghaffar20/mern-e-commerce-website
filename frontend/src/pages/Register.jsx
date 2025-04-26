import React, { useState, useEffect } from 'react';
import register from "../assets/register.webp";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearSuccess } from '../redux/slices/authSlices';
import { mergeCart } from '../redux/slices/cartSlices';

const Register = () => {
  const dispatch = useDispatch();    
  const navigate = useNavigate()
  const location = useLocation()
  const { user, error, guestId,success } = useSelector((state) => state.auth);
  const {cart} = useSelector((state)=> state.cart)

  const redirect = new URLSearchParams(location.search).get("redirect") || "/"
  const isCheckoutRedirect = redirect.includes("checkout")
  const currentPath = location.pathname;

  useEffect(()=>{
    if(user) {

      // if (currentPath === "/login") {
      //   navigate("/"); // If user tries to go to /login, redirect to home
      //   return;
      // }



      if(cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({user,guestId})).then(()=>{
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        })

      }else{
        navigate(isCheckoutRedirect ? "/checkout" : "/")
      }
    }
  }, [user, guestId , cart , navigate ,isCheckoutRedirect, dispatch,currentPath])





  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user && success) {
      toast.success(
        "🎉 Registration successful! 📬 A confirmation email has been sent to your email address.",
        {
          duration: 6000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          icon: '✉️',
        }
      );
      setFormData({ name: '', email: '', password: '' });
      dispatch(clearSuccess());
    }
  }, [user, success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      toast.error("Please fill all required fields!");
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className='flex'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>CherryMart</h2>
          </div>
          <h2 className='font-bold text-2xl text-center mb-6'>Create Your Account 👋</h2>
          <p className='text-center mb-6'>Join us today and start your seamless shopping journey!</p>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder='Enter your Full Name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 rounded border'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input
              type="email"
              name="email"
              placeholder='Enter your email address'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 rounded border'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-2 rounded border'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer'
          >
            Sign Up
          </button>

          <p className='mt-6 text-center text-sm flex gap-2 items-center justify-center'>
            Already have an Account
            <Link to={`/login?redirect${encodeURIComponent(redirect)}`} className='text-blue-500'>Login</Link>
          </p>
        </form>
      </div>

      <div className='hidden md:block bg-gray-800 w-1/2'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={register} alt="" className='h-[750px] w-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Register;
