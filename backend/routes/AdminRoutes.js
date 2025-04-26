import express from "express"
import { createUserByAdmin, deleteOrderByAdmin, deleteUserByAdmin, getAllProductsByAdmin, getAllUsersByAdmin, getOrdersByAdmin, updateOrderStatusByAdmin, updateUserByAdmin } from "../controllers/AdminController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const adminRouter = express.Router()

adminRouter.get("/getAllUsersByAdmin",protect,admin,getAllUsersByAdmin)
adminRouter.post("/createUserByAdmin",protect,admin,createUserByAdmin)
adminRouter.put("/updateUserByAdmin/:id",protect,admin,updateUserByAdmin)
adminRouter.delete("/deleteUserByAdmin/:id",protect,admin,deleteUserByAdmin)
adminRouter.get("/getAllProductsByAdmin",protect,admin,getAllProductsByAdmin)
adminRouter.get("/getOrdersByAdmin",protect,admin,getOrdersByAdmin)
adminRouter.put("/updateOrderStatusByAdmin/:id",protect,admin,updateOrderStatusByAdmin)
adminRouter.delete("/deleteOrderByAdmin/:id",protect,admin,deleteOrderByAdmin)

export default adminRouter  