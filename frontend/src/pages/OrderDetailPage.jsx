import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetailPage = () => {
    const {id} = useParams()
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(()=>{
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDeliver: false,
            paymentMethod: "JazzCash",
            shippingmethod:"Standard",
            shippingAddress:{city:"USA" , country:"New York"},
            orderItems :[
                {
                    productId:1,
                    name:"Stylish Jacket",
                    price:120,
                    quantity:1,
                    image: "https://picsum.photos/150?random=1",
                },
                {
                    productId:2,
                    name:"T-shirt",
                    price:125,
                    quantity:1,
                    image: "https://picsum.photos/150?random=2",
                }
            ],
        }
        setOrderDetails(mockOrderDetails)
    },[id])
    
  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!orderDetails ? (<p>No Order Details zfound</p> ) :(
            <div className='p-6 sm:p-4  rounded-lg border'>
                {/* Order info  */}
                <div className="flex flex-col sm:flex-row justify-between mb-8">
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold'>
                            Order ID: {orderDetails._id}
                        </h3>
                        <p className='text-gray-600'>
                            {new Date(orderDetails.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className='flex flex-col items-center sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.isPaid ? 
                            "bg-green-100 text-green-700" 
                            :"bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isPaid ? "Approved" :"Pending"}</span>
                        <span className={`${orderDetails.isDeliver ? 
                            "bg-green-100 text-green-700"
                             :"bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isDeliver ? "Delivered" :"Pending"}</span>
                    </div>
                </div>
                {/* Payment, Customer and Shipping Info  */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 '>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                        <p>Payment Method: {orderDetails.paymentMethod}</p>
                        <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                        <p>Shipping Method: {orderDetails.shippingmethod}</p>
                        <p>Address:{" "} {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
                    </div>
                </div>
                {/* Product List  */}
                <div className="overflow-x-auto">
                    <h4 className='text-lg font-semibold mb-4'>Products</h4>
                    <table className='min-w-full text-gray-600 mb-4'>
  <thead className='bg-gray-100'>
    <tr>
      <th className='py-2 px-4 text-left'>Image</th>
      <th className='py-2 px-4 text-left'>Name</th>
      <th className='py-2 px-4 text-left'>Unit Price</th>
      <th className='py-2 px-4 text-left'>Quantity</th>
      <th className='py-2 px-4 text-left'>Total</th>
    </tr>
  </thead>
  <tbody>
    {orderDetails.orderItems.map((item) => (
      <tr key={item.productId} className='border-b'>
        <td className='py-2 px-4'>
          <img
            src={item.image}
            alt={item.name}
            className='w-12 h-12 object-cover rounded-lg'
          />
        </td>
        <td className='py-2 px-4'>
          <Link
            to={`/product/${item.productId}`}
            className='text-blue-500 hover:underline'
          >
            {item.name}
          </Link>
        </td>
        <td className='py-2 px-4'>${item.price}</td>
        <td className='py-2 px-4'>{item.quantity}</td>
        <td className='py-2 px-4'>${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>

                </div>
                {/* back to My order  */}
                <Link
            to="/my-orders"
            className='text-blue-500 hover:underline'
          >
            Back to My Orders
          </Link>


            </div>
        )}

    </div>
  )
}

export default OrderDetailPage
