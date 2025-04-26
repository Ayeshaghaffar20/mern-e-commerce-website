import express from "express"
import Checkout from "../Models/CheckoutModel.js"
import Order from "../Models/OrderModel.js"
import Cart from "../Models/CartModel.js"

export const newCheckout = async (req,res)=>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice}= req.body

    if(!checkoutItems || checkoutItems.lenght===0) {
        return res.status(404).json({
            success:false,
            message:"No Item in checkout"
        })

    }   

    try {
        const createNewCheckout = await Checkout.create({
            user:req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid:"false"
        })

        console.log(`Checkout createed for User: ${req.user._id}`);
        return res.status(201).json({
            success:true,
            message: createNewCheckout
        })

        
    } catch (error) {
        console.log("Error creating checkout session" , error);
        res.status(500).json({
            success: false,
            message: error.message
        });
        
        
    }
}

export const payForCheckout = async (req,res) =>{

    const {paymentStatus,paymentDetails} = req.body

    try {
        const checkout = await Checkout.findById(req.params.id)

        if(!checkout){
            return res.status(404).json({
                success:false,
                message:"checkout not found"
            })
    
        }

        if(paymentStatus==="paid"){
            checkout.isPaid=true,
            checkout.paymentStatus= paymentStatus,
            checkout.paymentDetails= paymentDetails,
            checkout.paidAt= Date.now()

            await checkout.save()
            return res.status(201).json({
                success:true,
                message: checkout
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"Invalid Payment Status"
            })
        }
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"checkout not found"
        })
        
    }
}

export const finalizeCheckout = async (req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id)

        if(!checkout){
            return res.status(404).json({
                success:false,
                message:"checkout not found"
            })
    
        }

        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder = await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails

            })

            checkout.isFinalized=true
            checkout.finalizedAt= Date.now()
            await checkout.save()

            await Cart.findOneAndDelete({user: checkout.user})
            res.status(201).json({
                success:true,
                message:finalOrder
            })
            
        }else if(checkout.isFinalized){
            res.status(404).json({
                success:false,
                message:"checkout already Finalized"
            })
        }else{
            res.status(404).json({
                success:false,
                message:"checkout id not Paid "
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}