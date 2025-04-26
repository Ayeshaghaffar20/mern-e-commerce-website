import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteCart, updateCartItemQuantity } from '../../redux/slices/cartSlices';

const CartContent = ({ productId,cart, userID, guestId,size,color }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userID,
                size,
                color
            }))
        }
    }

    // const cartProduct = [
    //     {
    //         productId:1,
    //         name:"T-shirt",
    //         size:"S",
    //         color:"Red",
    //         quantity:"1",
    //         price:"15",
    //         image:"https://picsum.photos/200?random=1"
    //     },
    //       {
    //         productId:2,
    //         name:"Jeans",
    //         size:"L",
    //         color:"Blue",
    //         quantity:"1",
    //         price:"10",
    //         image:"https://picsum.photos/200?random=2"
    //     },
    // ]
    const handleRemoveFromCart = (productId, size, color,userID)=>{
        dispatch(deleteCart({ productId,size,color,guestId,userID }))
    }
   


    return (
        <div>
            {cart.products.map((item, index) => (
                <div key={index} className='flex items-start justify-between py-4 border-b'>
                    <div className='flex items-start'>
                        <img src={item.image} alt={item.name} className='w-20 h-24 object-cover mr-4 rounded ' />
                        <div>
                            <h3>{item.name}</h3>
                            <p className='text-sm text-gray-500'>
                                size: {item.size} | color:{item.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button onClick={() => handleAddToCart(item.productId,
                                    -1,
                                    item.quantity,
                                    item.size,
                                    item.color)} className='border rounded px-2 py-1 font-medium text-xl'>-</button>
                                <span className='mx-4'>{item.quantity}</span>
                                <button onClick={() => handleAddToCart(item.productId,
                                    1,
                                    item.quantity,
                                    item.size,
                                    item.color)} className='border rounded px-2 py-1 font-medium text-xl'>+</button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <p className='font-medium'>$ {item.price.toLocaleString()}</p>
                        <button onClick={()=> handleRemoveFromCart(item.productId,
                            item.size,
                            item.color
                        )}>
                            <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-700' />
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default CartContent
