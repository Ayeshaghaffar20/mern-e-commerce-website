import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { finalizeCheckout, newCheckout, payForCheckout } from "../controllers/CheckoutController.js"

const checkoutRoutes = express.Router()

checkoutRoutes.post("/newCheckout",protect,newCheckout)
checkoutRoutes.put("/payForCheckout/:id/pay",protect,payForCheckout)
checkoutRoutes.post("/finalizeCheckout/:id/finalize",finalizeCheckout)

export default checkoutRoutes