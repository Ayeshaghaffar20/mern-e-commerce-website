
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'; 
import productReducer from "./slices/productSlices"
import cartReducer from "./slices/cartSlices"
import checkoutReducer from "./slices/checkoutSlice"
import orderReducer from "./slices/orderSlice"
import adminReducer from "./slices/adminSlice"
import adminProductReducer from "./slices/adminProductSlice"
import adminOrderReducre from "./slices/adminOrderSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,  
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders:  orderReducer,
    admin:  adminReducer,
    adminProduct:  adminProductReducer,
    adminOrder: adminOrderReducre
    
  },
});

export default store;
