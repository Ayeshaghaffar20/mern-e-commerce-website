import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk("checkout/createCheckout" , async(checkoutData,{rejectWithValue})=>{
   try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/newCheckout`,checkoutData,
        {
            withCredentials: true, // ✅ sends cookies including the auth token
          }
     );

     return response.data
      

   } catch (error) {
    return rejectWithValue(error.response.data)
   } 
})

export const payForCheckout = createAsyncThunk(
    "checkout/payForCheckout",
    async ({ id, paymentData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkout/payForCheckout/${id}/pay`,
          paymentData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  export const finalizeCheckout = createAsyncThunk(
    "checkout/finalizeCheckout",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkout/finalizeCheckout/${id}/finalize`,
          {},
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  const initialState = {
    checkout: null,
    loading: false,
    error: null,
  };
  
  const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {},


    extraReducers: (builder) => {
      builder
        // 🛒 Create Checkout
        .addCase(createCheckout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.checkout = action.payload.message;
        })
        .addCase(createCheckout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to create checkout.";
        })
  
        // 💳 Pay for Checkout
        .addCase(payForCheckout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(payForCheckout.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.checkout = action.payload.message;
        })
        .addCase(payForCheckout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Payment failed.";
        })
  
        // 📦 Finalize Checkout
        .addCase(finalizeCheckout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(finalizeCheckout.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload.message;
        })
        .addCase(finalizeCheckout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to finalize checkout.";
        });
    },
  });
  
  export default checkoutSlice.reducer;
  

