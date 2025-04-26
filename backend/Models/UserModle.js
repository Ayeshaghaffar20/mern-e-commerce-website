import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,
            required:true,
            unique:true,
            match:[/.+\@.+\..+/,"Please Enter a Valid Email"]     },
        password:{type:String,
            required:true,
            minLenght:6  },
        role:{type:String,
            enum:["customer","admin"],
            default:"customer"
        },
            
    },
    {timestamps:true}
)

const User = mongoose.model("users",userSchema)

export default User

