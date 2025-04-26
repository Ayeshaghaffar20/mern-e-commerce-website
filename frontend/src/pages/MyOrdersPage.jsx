import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyOrdersPage = () => {
    const navigate = useNavigate()

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        setTimeout(()=>{
            const mockOrders = [
                {
                    _id:"1234",
                    createdAt: new Date(),
                    shippingAddress: {city:"İstanbul" , country:"Turkey"},
                    orderItems:[
                        {
                            name:"Product 1",
                            image: "https://picsum.photos/500/500?random=1"
                        },
                    ],
                    totalPrice:"100",
                    isPaid: true
                },
                {
                    _id:"5678",
                    createdAt: new Date(),
                    shippingAddress: {city:"İstanbul" , country:"Turkey"},
                    orderItems:[
                        {
                            name:"Product 1",
                            image: "https://picsum.photos/500/500?random=1"
                        },
                    ],
                    totalPrice:"100",
                    isPaid: true
                }
            ]

            setOrders(mockOrders)
        },1000)
    },[])

    const handleRowClicked = (orderId) =>{
        navigate(`/order/${orderId}`)

    }



  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='font-bold text-xl sm:text-2xl mb-6'>My Orders</h2>
        <div className='relative show-md sm:rounded-lg overflow-hidden'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                   <tr>
                   <th className='py-2 px-4 sm:py-3 '>Image</th>
                    <th className='py-2 px-4 sm:py-3 '>Order ID</th>
                    <th className='py-2 px-4 sm:py-3 '>Created</th>
                    <th className='py-2 px-4 sm:py-3 '>Shipping Adress</th>
                    <th className='py-2 px-4 sm:py-3 '>Item</th>
                    <th className='py-2 px-4 sm:py-3 '>Price</th>
                    <th className='py-2 px-4 sm:py-3 '>Status</th>
                   </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((item)=>(
                            <tr key={item._id} onClick={()=> handleRowClicked(orders._id)} 
                            className='border-b hover:border-gray-500 cursor-pointer'>
                                   <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                 <img src={item.orderItems[0].image} alt={item.orderItems[0].name} className='w-10 h-10 sm:w-10 sm:h-10 object-cover rounded-lg' />
                                      </td>
                                      <td className='py-2 px-4 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>
                                        #{item._id}

                                      </td>
                                      <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                        {new Date(item.createdAt).toLocaleDateString()} {" "}
                                        {new Date(item.createdAt).toLocaleTimeString()}

                                      </td>
                                      <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                        {item.shippingAddress ? `${item.shippingAddress.city},${item.shippingAddress.country}` : "N/A"}
                                        </td>

                                        <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                            {item.orderItems.length}
                                        </td>
                                        <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                          $  {item.totalPrice}
                                        </td>
                                        <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                            <span className={`${item.isPaid ? "bg-gray-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-lg text-xs sm:text-sm font-medium`}>{item.isPaid ? "Paid" : "pending"}</span>
                                        </td>
                                      
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                You have no orders
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default MyOrdersPage
