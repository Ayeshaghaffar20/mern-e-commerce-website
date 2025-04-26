import React from 'react'

const OrderManagement = () => {
    const orders = [
        {
            _id:12345,
            user:{
                name:"Fahad"
            },
            totalPrice:120,
            status:"Processing"
        },
    ]

    const handleStatueChange =(orderId,status)=>{
        console.log({id:orderId,status});
        
    }

  return (
    <div className='max-w-7xl max-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Order Management</h1>

        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
      <tr>
        <th className='py-3 px-4'>Order ID</th>
        <th className='py-3 px-4'>Customer</th>
        <th className='py-3 px-4'>Total Price</th>
        <th className='py-3 px-4'>Status</th>
        <th className='py-3 px-4'>Action</th>
      </tr>
      <tr>
        <td colSpan={4} className='h-4'></td> {/* Spacer Row */}
      </tr>
    </thead>

    <tbody>
      {orders.length > 0 ? (
        orders.map((item) => (
          <tr key={item._id} className='border-b hover:bg-gray-50 cursor-pointer'>
            <td className='py-4 px-4 font-medium whitespace-nowrap'>#{item._id}</td>
            <td className='py-4 px-4'>{item.user.name}</td>
            <td className='py-4 px-4'>${item.totalPrice}</td>
            <td className='py-4 px-4'>
                <select
            value={item.status} onChange={(e)=>handleStatueChange(item._id,e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 '>
                <option value="Processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                
                </select>
                </td>
   
                <td className='p-4'>
                    <button onClick={()=>handleStatueChange(item._id,"Delivered")} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 '>Mark as Delivered</button>

                </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className='p-4 text-center text-gray-500'>
            No Order Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
        </div>
    </div>
  )
}

export default OrderManagement
