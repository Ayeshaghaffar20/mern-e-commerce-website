import express from "express"
import { getProfile, login, register } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js";


const userRoutes = express.Router()

userRoutes.post('/register',register);
userRoutes.post('/login',login)
userRoutes.get("/profile", protect, getProfile);







export default userRoutes