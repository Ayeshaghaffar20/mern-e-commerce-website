import bcrypt from "bcrypt"
import User from "../Models/UserModle.js"
import Product from "../Models/ProductModle.js";
import Order from "../Models/OrderModel.js";



export const getAllUsersByAdmin = async (req,res)=>{
    try {
        const users = await User.find({})

         res.status(201).json({
            success: true,
            admin: req.user,  // <- includes name, email, role
            users,
        });
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createUserByAdmin = async (req,res)=>{
    const {name,email,password,role} = req.body

    try {
        let user = await User.findOne({email})

        if(user){
            return res.status(404).json({
                success: false,
                message: "User already Exit"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10)

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "customer"
        })

        await user.save()

        res.status(201).json({
            success: true,
            message: ("User Create successfully" , user)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateUserByAdmin = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.role = req.body.role || user.role
        }

        const updateUser = await user.save()

        res.status(201).json({
            success: true,
            message: ("User Update successfully" , updateUser)
        });
         
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteUserByAdmin = async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)

        if (user) {
            await user.deleteOne()

            return res.status(201).json({
                success: true,
                message: ("User deleted successfully", user._id)
            });

           }else{
            res.status(404).json({
                success: false,
                message: ("user not Found")
            });
           }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllProductsByAdmin = async (req,res) =>{
    try {
        const products = await Product.find({})

        res.status(201).json({
            success:true,
            message:products

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getOrdersByAdmin = async (req,res)=>{
    try {
        const orders = await Order.find({}).populate( "user", 
            "name email")
              if(orders){
               return res.status(201).json({
                    success:true,
                    message: orders
                })
              }   else{
                res.status(404).json({
                    success:false,
                    message: "No orders found"
                })
              }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateOrderStatusByAdmin = async (req,res) =>{
    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.status = req.body.status || order.status
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt

            const updateOrder = await order.save()
            res.status(201).json({
                success:true,
                message: updateOrder
            })
        }else{
            res.status(404).json({
                success:false,
                message: "No orders found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteOrderByAdmin = async (req,res) =>{
    try {
        const order = await Order.findById(req.params.id)

        if(order){
           await order.deleteOne()

            res.status(201).json({
                success:true,
                message: order._id
            })
        }
        else{
            res.status(404).json({
                success:false,
                message: "No orders found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}