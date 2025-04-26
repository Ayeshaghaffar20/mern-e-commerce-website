import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders" , async(_ ,{rejectWithValue})=>{
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/myOrders`,
            { withCredentials: true }
          );
          return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchOrderDetail = createAsyncThunk(
    "orders/fetchOrderDetail",
    async (orderId, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/getOrdersDetail/${orderId}`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  )

  const initialState = {
    orders:[],
    totalOrders:0,
    orderDetails: null,
    loading: false,
    error: null,

  }
  
  const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},

    extraReducers: (builders) =>{
        builders
        .addCase(fetchUserOrders.pending, (state)=>{
            state.loading = true,
            state.error= null
        })

        .addCase(fetchUserOrders.fulfilled, (state,action)=>{
            state.loading = false,
            state.orders = action.payload.message;
        })

        .addCase(fetchUserOrders.rejected, (state,action)=>{
            state.loading = false
            state.error= null
            state.error = action.payload?.message
        })

        .addCase(fetchOrderDetail.pending, (state)=>{
            state.loading = true,
            state.error= null
        })

        .addCase(fetchOrderDetail.fulfilled, (state,action)=>{
            state.loading = false,
            state.orderDetails = action.payload.message;
        })

        .addCase(fetchOrderDetail.rejected, (state,action)=>{
            state.loading = false
            state.error= null
            state.error = action.payload?.message
        })
    }

  })

  export default orderSlice.reducer


