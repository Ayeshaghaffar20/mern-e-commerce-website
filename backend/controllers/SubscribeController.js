import Subscribe from "../Models/SubscribeModel.js";



export const handleSubscribe = async (req,res) =>{
    const {email} = req.body

    if(!email){
       return  res.status(404).json({
        success: false,
        message: "Email is required"
    });
    
    }

    try {
        let subscriber = await Subscribe.findOne({email})

        if(subscriber){
            return res.status(404).json({
                success: false,
                message: "Email is already Subscribe"
            });
            
        }

        subscriber = new Subscribe({email})
        await subscriber.save()

        res.status(201).json({
            success: true,
            message: "Successfully Subscribe to Newsletter"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}