import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import User from "../Models/UserModle.js";
import transporter from "../db/nodemailer.js";


export const register = async (req,res)=>{
    const {name,email,password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing Details",
        });
      }

    try {
        const existingUser =  await User.findOne({email})
        if(existingUser){
            return res.status(404).json({
                success:false,
            message:"Email Already Exit"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
         
        const user = new User({name,email,password:hashedPassword})
        await user.save();

        const token = Jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn: '7d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            sameSite:process.env.NODE_ENV ==="production",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

          //send welcome Email
          const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: '🎉 Welcome to CherryMart!',
            text: `Thank you for signing up! ${email} your new favorite place to shop! We're excited to have you on board. 🛍️🍒`

        }

        try {

            await transporter.sendMail(mailOptions);
            console.log("✅ Email Sent Successfully");

        } catch (error) {
            console.error("❌ Email Sending Failed:", error);

        }

        return res.status(200).json({
            success: true,
            user: user,
            role: user.role
        })


    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })

        }

        const token = Jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000


        })

        return res.status(200).json({
            success: true,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            },
            token
          });


    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })

    }

}

export const getProfile = async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };