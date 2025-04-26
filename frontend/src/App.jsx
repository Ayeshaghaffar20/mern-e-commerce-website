import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductsDetails from './components/Products/ProductsDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetailPage from './pages/OrderDetailPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductsManagement from './components/Admin/ProductsManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';
 
import {Provider} from "react-redux"
import store from './redux/store';

const App = () => { 
  return (
    <Provider store={store}>
    <BrowserRouter>
       <Toaster   position="top-center" autoClose={3000}  />
    <Routes>
    
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='Collection/:collection' element={<CollectionPage/>}/>
      <Route path='product/:id' element={<ProductsDetails/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='order-confirmation' element={<OrderConfirmation/>}/>
      <Route path='order/:id' element={<OrderDetailPage/>}/>
      <Route path='my-orders' element={<MyOrdersPage/>}/>
     

      </Route>
      <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<AdminHomePage/>}/>
      <Route path='users' element={<UserManagement/>}/>
      <Route path='products' element={<ProductsManagement/>}/>
      <Route path='products/:id/edit' element={<EditProductPage/>}/>
      <Route path='orders' element={<OrderManagement/>}/>

      </Route>

    </Routes>
    </BrowserRouter>
    </Provider>

       
  )
}

export default App
