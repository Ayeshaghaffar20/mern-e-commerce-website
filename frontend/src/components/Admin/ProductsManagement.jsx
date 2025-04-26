import React from 'react'
import { Link } from 'react-router-dom'

const ProductsManagement = () => {
    const products =[
        {
            _id:123321,
            name:"shirt",
            price:100,
            sku:123321
        }
    ]

    const handleDelete =(id)=>{
        if(window.confirm("Are you want to delete the product?")){
            console.log("delete Products id:", id);
            
        }

    }
  return (
    <div className='max-w-7sxl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Product Management</h1>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
      <tr>
        <th className='py-3 px-4'>Name</th>
        <th className='py-3 px-4'>price</th>
        <th className='py-3 px-4'>sku</th>
        <th className='py-3 px-4'>Actions</th>
      </tr>
    </thead>
    <tbody>
        {products.length > 0 ?(products.map((item)=>(
            <tr key={item._id}
            className='border-b hover:bg-gray-50 cursor-pointer'>
                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                    {item.name}
                </td>
                <td className='p-4'>${item.price}</td>
                <td className='p-4'>{item.sku}</td>
                <td className='p-4'>
                    <Link to={`/admin/products/${item._id}/edit`} className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'>Edit</Link>
                    <button onClick={()=> handleDelete(item._id)}
                    className='bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600'>
                        delete
                    </button>
                </td>
            </tr>
        ))
    ):(
        <tr>
        <td colSpan={4} className='p-4 text-center text-gray-500'>
          No product Found
        </td>
      </tr>
    )}
    </tbody>
    </table>
        </div>
      
    </div>
  )
}

export default ProductsManagement
