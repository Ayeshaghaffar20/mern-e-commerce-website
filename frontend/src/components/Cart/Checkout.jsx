import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import StripeButton from "./StripeButton"
import toast from "react-hot-toast"

const cart = {
    products:[
        {
            name:"Stylish Jacket",
            size:"M",
            color:"Black",
            price:120,
            image: "https://picsum.photos/150?random=1",
        
          },
          {
            name:"Stylish Jacket",
            size:"XL",
            color:"Blue",
            price: 45,
            image: "https://picsum.photos/150?random=1",
        
          },
    ],
    totalPrice:195,
}

const Checkout = () => {
    const navigate = useNavigate()
    const [checkoutId ,setcheckoutId] = useState(null)
    const [shippingAddress,setShippingAddress] =useState({
        firstName:"",
        lastName:"",
        Address:"",
        city:"",
        postalCode:"",
        country:"",
        phone:"",
    })

    const handleCreateCheckout = (e) =>{
        e.preventDefault()
        // setcheckoutId(123)


    }

    const handlePaymentSuccess =(e) =>{
        e.preventDefault()
     
    
        navigate("/order-confirmation")
       
        
    }






  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* left section  */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6 ">Checkout</h2>
            <form onSubmit={handleCreateCheckout}>
                <h3 className="mb-4 text-lg">Contact Details</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email"
                    value="user@gmail.com"
                    className="w-full p-2  border rounded" disabled />
                </div>
                <h3 className="mb-4 text-lg">Delivery</h3>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700">First Name</label>
                        <input type="text"
                        value={shippingAddress.firstName}
                        onChange={((e)=>setShippingAddress({...shippingAddress,firstName:e.target.value}))}
                        className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="text-gray-700">Last Name</label>
                        <input type="text"
                        value={shippingAddress.lastName}
                        onChange={((e)=>setShippingAddress({...shippingAddress,lastName:e.target.value}))}
                        className="w-full p-2 border rounded" required />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input type="text"
                    value={shippingAddress.Address}
                    onChange={((e)=>setShippingAddress({...setShippingAddress,Address:e.target.value}))}
                    className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                        <label className="text-gray-700">City</label>
                        <input type="text"
                        value={shippingAddress.city}
                        onChange={((e)=>setShippingAddress({...shippingAddress,city:e.target.value}))}
                        className="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="text-gray-700">Postal Code</label>
                        <input type="text"
                        value={shippingAddress.postalCode}
                        onChange={((e)=>setShippingAddress({...shippingAddress,postalCode:e.target.value}))}
                        className="w-full p-2 border rounded" required />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Country</label>
                    <input type="text"
                    value={shippingAddress.country}
                    onChange={((e)=>setShippingAddress({...setShippingAddress,country:e.target.value}))}
                    className="w-full p-2 border rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input type="text"
                    value={shippingAddress.phone}
                    onChange={((e)=>setShippingAddress({...setShippingAddress,phone:e.target.value}))}
                    className="w-full p-2 border rounded" required/>
                </div>
                <div className="mt-6">
                <button type="submit" onClick={handlePaymentSuccess} className="w-full py-3 rounded bg-black text-white cursor-pointer">
                    Countinue To Payment
                </button>
             
                </div>

            </form>

        </div>

        {/* Right Section  */}

        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg mb-4">Order Summery</h3>
            <div className="border-t py-4 mb-4">
                {cart.products.map((item,index)=>(
                    <div key={index} className="flex items-center justify-between py-2 border-b ">
                        <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover mr-4" />
                            <div>
                                <h3 className="text-md">{item.name}</h3>
                                <p className="text-gray-500">Size: {item.size}</p>
                                <p className="text-gray-500">Color: {item.color}</p>
                            </div>
                        </div>
                        <p className="text-xl">${item.price?.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between text-lg mb-4">
                <p>Subtotal</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between text-lg">
                <p>Shipping</p>
                <p>Free</p>
            </div>
            <div className="flex items-center justify-between text-lg mt-4 border-t pt-4">
                <p>Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
        </div>
      
    </div>
  )
}

export default Checkout
