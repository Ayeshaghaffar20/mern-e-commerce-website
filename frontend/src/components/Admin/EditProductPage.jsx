import React, { useState } from 'react'

const EditProductPage = () => {
    const [productData,setProductData] = useState({
        name:"",
        describtion:"",
        price:0,
        countInStock:0,
        sku:0,
        category:"",
        brand:"",
        sizes:[],
        colors:[],
        collection:"",
        material:"",
        gender:"",
        images:[
                {
                    url: "https://picsum.photos/500/500?random=1"
                },
                {
                    url: "https://picsum.photos/500/500?random=2"
                }
        ]   
    })

    const handleChange =(e)=>{
        const {name,value} =e.target
        setProductData((prevData)=>({...prevData,[name]:value}))
    }

    const handleImageUpload = async (e)=>{
        e.preventDefault()
        console.log(file);
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        
        console.log(productData);
        
    }
  return (
    <div className='max-w-7sxl mx-auto p-6 shadow-md rounded-md'>
        <h1 className='text-3xl font-bold mb-6'>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type="text" 
                    name='name'
                     value={productData.name} 
                     onChange={handleChange} 
                     className='w-full border border-gray-300 rounded-md p-2' required/>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Describtion</label>
                   <textarea name="describtion" 
                   value={productData.describtion}
                   onChange={handleChange}
                   rows={4}
                   className='w-full border border-gray-300 rounded-md p-2' required ></textarea>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type="number" 
                    name='price'
                     value={productData.price} 
                     onChange={handleChange} 
                     className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>CountIn Stock</label>
                    <input type="number" 
                    name='countInStock'
                     value={productData.countInStock} 
                     onChange={handleChange} 
                     className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sku</label>
                    <input type="number" 
                    name='sku'
                     value={productData.sku} 
                     onChange={handleChange} 
                     className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes(comma-seperated)</label>
                   <input type="text" 
                   name='sizes'
                   value={productData.sizes.join(",")}
                   onChange={(e)=>setProductData({
                    ...productData, sizes: e.target.value.split(",").map((size)=>size.trim())})} 
                   className='w-full border border-gray-300 rounded-md p-2'/>
                </div>

                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Colors(comma-seperated)</label>
                   <input type="text" 
                   name='colors'
                   value={productData.colors.join(",")}
                   onChange={(e)=>setProductData({
                    ...productData, colors: e.target.value.split(",").map((color)=>color.trim())})} 
                   className='w-full border border-gray-300 rounded-md p-2'/>
                </div>
                <div className="mb-6">
                      <label className="block font-semibold mb-2">Upload Image</label>
                        <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                            Choose File
                       <input type="file" onChange={handleImageUpload} className="hidden" />
                          </label>
                          <div className="flex gap-4 mt-4">
                            {productData.images.map((item,index)=>(
                                <div key={index}>
                                    <img src={item.url} 
                                    className='w-20 h-20 object-cover rounded-md shadow-md' />
                                </div>
                            ))}
                          </div>
                              </div>
                              <button type='submit' className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors'>Update Product</button>


                </form>
    </div>
  )
}

export default EditProductPage
