import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios"


export const fetchProductByFilter = createAsyncThunk("products/fetchByFilters", async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
}) =>{
    const query =  new URLSearchParams();
    if(collection) query.append("collection" , collection)
    if(size) query.append("size" , size)
    if(color) query.append("color" , color)
    if(gender) query.append("gender" , gender)
    if(minPrice) query.append("minPrice" , minPrice)
    if(maxPrice) query.append("maxPrice" , maxPrice)
    if(sortBy) query.append("sortBy" , sortBy)
    if(search) query.append("search" , search)
    if(category) query.append("category" , category)
    if(material) query.append("material" , material)
    if(brand) query.append("brand" , brand)
    if(limit) query.append("limit" , limit)
             
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProductsByQuery?${query.toString()}`);


      
          return response.data.message

   }
);

//Fetch Single Product

export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails" ,
    async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getSingleProduct/${id}`)

    // return response.data.message
    // console.log("response.data.product",response.data.message);
    
    return response.data.message
}
);


//Update Product

// export const updateProduct = createAsyncThunk("products/updateProduct", async({id,productData})=>{
//     const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/updateProduct/${id}`,
//          productData,
//         {
            
//                 withCredentials: true, // 🔑 Important for sending cookies
            
//         }
//     )

//     return response.data
// });


// Fetch Similar Poducts
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts" ,
    async({id})=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getSimilarProduct/${id}`)
    // console.log("simiar", response.data.message);
    // console.log("id",id);
    
    
    return response.data.message
    

})


const productSlices = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct: null,
        // smilarProducts:[],
        similarProducts:[],
        loading: false,
        error: null,
        filters:{
            category:"",
            size:"",
            color:"",
            gender:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            material:"",
            brand:"",
            collection:""
        }
    },

    reducers:{
        setFilters:(state,action)=>{
            state.filters={...state.filters,...action.payload }
        },
        clearFilters: (state)=>{
            state.filters = {
                category:"",
                size:"",
                color:"",
                gender:"",
                minPrice:"",
                maxPrice:"",
                sortBy:"",
                search:"",
                material:"",
                brand:"",
                collection:""
            }
        }
    },

    extraReducers: (builders)=>{
        builders
            
        //fetch Product By Filter
        .addCase(fetchProductByFilter.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchProductByFilter.fulfilled,(state,action)=>{
            // console.log("Action Payload in Reducer:", action.payload);
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })

        .addCase(fetchProductByFilter.rejected,(state,action)=>{
            state.loading = true;
            state.error = action.payload?.message
        })

        // fetch single product

        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })

        

        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            // console.log("Action Payload in Reducer selectedProduct:", action.payload);
            state.loading = false;
            state.selectedProduct = action.payload 
        })

        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading = true;
            state.error = action.payload?.message
        })

        // // Handle Product Updating

        // .addCase(updateProduct.pending,(state)=>{
        //     state.loading = true;
        //     state.error = null;
        // })

        // .addCase(updateProduct.fulfilled,(state,action)=>{
        //     state.loading = false;
        //     const updatedProduct = action.payload
        //     const index = state.products.findIndex(
        //         (product)=>product._id === updateProduct._id
        //     )
        //     if(index != 1){
        //         state.products[index] =updateProduct
        //     }
        // })

        // .addCase(updateProduct.rejected,(state,action)=>{
        //     state.loading = true;
        //     state.error = action.payload?.message
        // })

        

        // Fetch Similar products

        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.similarProducts = action.payload 
        })

        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading = true;
            state.error = action.payload?.message
        });

        
    }


})
export const {setFilters,clearFilters } = productSlices.actions
export default productSlices.reducer