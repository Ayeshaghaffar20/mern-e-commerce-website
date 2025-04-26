import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const localCartFromStorage = ()=>{
//     const storedCart = localStorage.getItem("cart")
//     return storedCart ? JSON.parse(storedCart) : { products:[]}
// }

const localCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart || storedCart === "undefined") {
      return { products: [] };
    }
    return JSON.parse(storedCart);
  }
  
// const saveCartToStorage = (cart)=>{
//     localStorage.setItem("cart",JSON.stringify(cart))
// }

const saveCartToStorage = (cart) => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async({userId,guestId}, {rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/carts/getAllCarts`,{
                params :(userId,guestId)
            })

            return response.data
        } catch (error) {
            console.error(error);
            
            return rejectWithValue(error.response.data);
        }
    }

) 

export const addToCart = createAsyncThunk("cart/addToCart", async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/carts/creatCart`,{
            productId,quantity,size,color,guestId,userId         

        })

        console.log("Cart Response" , response.data)

        
        return response.data.message
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/carts/updateCartProduct`,{productId,quantity,size,color,guestId,userId}) 

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteCart = createAsyncThunk("cart/deleteCart" , async({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
    try {
        const response = await axios({
            method:"DELETE",
            url:`${import.meta.env.VITE_BACKEND_URL}/api/carts/deleteCartProduct`,
            data:{productId,quantity,size,color,guestId,userId},
        })

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const mergeCart = createAsyncThunk("cart/mergeCart", async({guestId,user},{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/carts/mergeCarts`,
            {guestId ,user},
            {
                withCredentials: true, 
              }
            
    );
    return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:localCartFromStorage(),
        loading: false,
        error:null,
    
    },
    reducer:{
        clearCart:(state)=>{
            state.cart= {products:[]}
            localStorage.removeItem("cart")
        }
    },

    extraReducers:(builder)=>{
        builder

        .addCase(fetchCart.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(fetchCart.fulfilled, (state,action)=>{
            state.loading = false
            state.cart = action.payload
            saveCartToStorage(action.payload)
        })

        .addCase(fetchCart.rejected, (state)=>{
            state.loading = true
            state.error = action.payload?.message || "Faild to fetch  cart"
        })

        .addCase(addToCart.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(addToCart.fulfilled, (state,action)=>{
            state.loading = false
            state.cart = action.payload
            saveCartToStorage(action.payload)
        })


        

        .addCase(addToCart.rejected, (state)=>{
            state.loading = true
            state.error = action.payload?.message || "Faild to add to cart"
        })

        .addCase(updateCartItemQuantity.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(updateCartItemQuantity.fulfilled, (state,action)=>{
            state.loading = false
            state.cart = action.payload
            saveCartToStorage(action.payload)
        })

        .addCase(updateCartItemQuantity.rejected, (state)=>{
            state.loading = true
            state.error = action.payload?.message || "Faild to update  cart"
        })

        .addCase(deleteCart.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(deleteCart.fulfilled, (state,action)=>{
            state.loading = false
            state.cart = action.payload
            saveCartToStorage(action.payload)
        })

        .addCase(deleteCart.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload?.message || "Faild to delete cart"
        })

        .addCase(mergeCart.pending, (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(mergeCart.fulfilled, (state,action)=>{
            state.loading = false
            state.cart = action.payload
            saveCartToStorage(action.payload)
        })

        .addCase(mergeCart.rejected, (state)=>{
            state.loading = true
            state.error = action.payload?.message || "Faild to merge  cart"
        })
    }

})

export const {clearCart} = cartSlice.actions
export default cartSlice.reducer