import { createAsyncThunk , createSlice  } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProductsByAdmin = createAsyncThunk("adminProduct/fetchAllProductsByAdmin" , async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllProductsByAdmin`,
        { withCredentials: true }
    )

    return response.data
})

export const addNewProductByAdmin = createAsyncThunk("adminProduct/addNewProductByAdmin" , async(productData)=>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/addnewProduct`,productData,
        { withCredentials: true }

    )

    response.data
})

export const updateProductByAdmin = createAsyncThunk("adminProduct/updateProductByAdmin", async({id,productData})=>{
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/updateProduct/${id}`,
         productData,
        {
            
                withCredentials: true, // 🔑 Important for sending cookies
            
        }
    )

    return response.data
});

export const deleteproductByAdmin = createAsyncThunk("adminProduct/deleteproductByAdmin" , async(id)=>{
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/deleteProduct/${id}`,
            { withCredentials: true }
        )

        return id
   
})

const initialState = {
    products: [],
    loading: false,
    error: null,
  };

const adminProductSlice = createSlice({
    name:"adminProduct",
    initialState,
    reducers:{},

    extraReducers: (builders) =>{
        builders

        .addCase(fetchAllProductsByAdmin.pending ,(state) =>{
            state.loading = true
        })

        .addCase(fetchAllProductsByAdmin.fulfilled ,(state,action)=>{
            state.loading=false,
            state.products = action.payload
        })

        .addCase(fetchAllProductsByAdmin.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.payload?.message
        })

        .addCase(addNewProductByAdmin.fulfilled , (state,action)=>{
            state.products.push(action.payload)
        })

        .addCase(updateProductByAdmin.fulfilled, (state,action)=>{
            const index = state.products.findIndex((product)=>product._id === action.payload._id)
            if(index!== -1){
                state.products[index] = action.payload
            }
        })

        .addCase(deleteproductByAdmin.fulfilled , (state,action)=>{
            state.products = state.products.filter((product)=>product._id !==action.payload)
        })
    }
})

export default adminProductSlice.reducer;