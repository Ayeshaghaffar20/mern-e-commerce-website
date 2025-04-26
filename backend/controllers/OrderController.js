import Order from "../Models/OrderModel.js"
import User from "../Models/UserModle.js"



export const myOrders = async (req,res)=>{
 try {
    const orders = await Order.find({user: req.user._id}).sort({
        createdAt: - 1
    })

    res.status(201).json({
        success:true,
        message:orders
    })


 } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
    
 }   
}

export const getOrdersDetail = async (req,res)=>{
    try {
        const orders = await Order.findById(req.params.id).populate(
           "user", 
           "name email"
        )

        if(!orders){
            return  res.status(404).json({
                success: false,
                message: "no order Found"
            });
            
        }

        res.status(201).json({
            success:true,
            message:orders
        })
    


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}

