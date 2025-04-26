import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getOrdersDetail, myOrders } from "../controllers/OrderController.js"

const orderRoutes = express.Router()


orderRoutes.get("/myOrders",protect,myOrders)
orderRoutes.get("/getOrdersDetail/:id",protect,getOrdersDetail)

export default orderRoutes