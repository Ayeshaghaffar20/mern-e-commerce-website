import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    subscribeAt:{
        type:Date,
        default:Date.now
    },

})

const Subscribe = mongoose.model("subsribe" ,subscribeSchema)

export default Subscribe