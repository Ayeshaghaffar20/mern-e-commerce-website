import jwt from "jsonwebtoken";
import User from "../Models/UserModle.js";


export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

// Middleware to check role Admin/user 

export const admin = (req,res,next) =>{
  if(req.user && req.user.role === "admin"){
    next()
  } else{
    res.status(403).json({
      success:false,
      message:"Not authorized as an Admin"
    })
  }
    

} 