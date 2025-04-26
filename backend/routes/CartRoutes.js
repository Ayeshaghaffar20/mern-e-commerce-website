import express from "express"

import { creatCart, deleteCartProduct, getAllCarts, mergeCarts, UpdateCartProduct } from "../controllers/CartController.js"
import { protect } from "../middleware/authMiddleware.js"

const cartRoutes = express.Router()

cartRoutes.post("/creatCart",creatCart)
cartRoutes.put("/updateCartProduct",UpdateCartProduct)
cartRoutes.delete("/deleteCartProduct",deleteCartProduct)
cartRoutes.get("/getAllCarts",getAllCarts)
cartRoutes.post("/mergeCarts",protect,mergeCarts)

export default cartRoutes