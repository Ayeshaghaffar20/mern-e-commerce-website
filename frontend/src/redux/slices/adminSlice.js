import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllUsersByAdmin = createAsyncThunk("admin/fetchAllUsersByAdmin" , async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllUsersByAdmin`,
        { withCredentials: true }
    );
    return response.data
})

export const addUserByAdmin = createAsyncThunk("admin/addUserByAdmin" , async(userData, {rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllUsersByAdmin`,userData,
            { withCredentials: true }
        )

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})


export const updateUserByAdmin = createAsyncThunk("admin/updateUserByAdmin", async({id,name,email,role})=>{
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/updateUserByAdmin/${id}`,{name,email,role},
        { withCredentials: true }
        
    )

    return response.data

})

export const deleteUserByAdmin = createAsyncThunk("admin/deleteUserByAdmin", async(id)=>{
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteUserByAdmin/${id}`,
        { withCredentials: true }
    )
    return id;
})

const initialState = {
    users:[],
    loading: false,
    error: null,
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{},

    extraReducers: (builder) =>{
        builder
        .addCase(fetchAllUsersByAdmin.pending, (state)=>{
            state.loading = true

        })

        .addCase(fetchAllUsersByAdmin.fulfilled, (state,action)=>{
            state.loading = false
            state.users = action.payload.message;
            
        })

        .addCase(fetchAllUsersByAdmin.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload?.message
            
        })


        .addCase(updateUserByAdmin.fulfilled, (state,action)=>{
            const updatedUser = action.payload
            const userIndex = state.users.findIndex((user)=> user._id === updatedUser._id)

            if(userIndex !==-1){
                state.users[userIndex] = updatedUser
            }
            
        })

        .addCase(deleteUserByAdmin.fulfilled , (state,action) =>{
            state.users = state.users.filter((user)=> user._id !== action.payload)
        })

        .addCase(addUserByAdmin.pending, (state)=>{
            state.loading = true
            state.error = null

        })

        .addCase(addUserByAdmin.fulfilled, (state,action)=>{
            state.loading = false
            state.users.push(action.payload.user)

        })

        .addCase(addUserByAdmin.rejected, (state)=>{
            state.loading = false
            state.error = action.payload?.message

        })

    }
})

export default adminSlice.reducer