import { __DO_NOT_USE__ActionTypes, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrdersByAdmin = createAsyncThunk("adminOrders/fetchOrdersByAdmin" , async(_,
    {rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getOrdersByAdmin`,
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const updateOrderStatusByAdmin = createAsyncThunk("adminOrders/updateOrderStatusByAdmin" , async({id ,status},{rejectWithValue})=>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/updateOrderStatusByAdmin/${id}`,{status},
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const deleteOrdersByAdmin = createAsyncThunk("adminOrders/deleteOrdersByAdmin" , async(id,{rejectWithValue})=>{
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteOrderByAdmin/${id}`,
            { withCredentials: true }
        )
        return id
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
   orders:[],
   totalOrders:0,
   totalSales:0,
   loading: false,
   error:null
  };

const adminOrderSlice = createSlice({
    name:"adminOrders",
    initialState,
    reducers:{},

    extraReducers: (builder) =>{
        builder

        .addCase(fetchOrdersByAdmin.pending , (state)=>{
            state.loading = true
            state.error = null
        })

        .addCase(fetchOrdersByAdmin.fulfilled , (state,action)=>{
            state.loading = false
            state.orders = action.payload
            state.totalOrders = action.payload.lenght

            const totalSales = state.payload.reduce((acc, order)=>{
                return acc + order.totalPrice
            },0)

            state.totalSales = totalSales
        })

        .addCase(fetchOrdersByAdmin.rejected , (state,action)=>{
            state.loading = false
            state.error = action.payload?.message
          
        })
         
        .addCase(updateOrderStatusByAdmin.fulfilled, (state,action)=>{
            const updatedOrder = action.payload
            const orderIndex = state.orders.findIndex((order)=> order._id === updatedOrder._id)

            if(orderIndex !== -1){
                state.orders[orderIndex] = updatedOrder
            }
        })

        .addCase(deleteOrdersByAdmin.fulfilled , (state,action)=>{
                    state.orders = state.orders.filter((order)=>order._id !==action.payload)
                })

        

    }
})

export default adminOrderSlice.reducer