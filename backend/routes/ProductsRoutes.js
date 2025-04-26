import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { addNewProduct, bestSellingProduct, deleteProduct, getNewArrivals, getProductsByQuery, getSimilarProduct, getSingleProduct, updateProduct } from "../controllers/productsController.js";

const productRoutes = express.Router()


productRoutes.post("/addnewProduct",protect, admin , addNewProduct)
productRoutes.put("/updateProduct/:id",protect, admin , updateProduct)
productRoutes.delete("/deleteProduct/:id",protect, admin , deleteProduct)
productRoutes.get("/getProductsByQuery/", getProductsByQuery)
productRoutes.get("/getSingleProduct/:id", getSingleProduct)
productRoutes.get("/getSimilarProduct/:id", getSimilarProduct)
productRoutes.get("/bestSellingProduct", bestSellingProduct)
productRoutes.get("/getNewArrivals", getNewArrivals)

export default productRoutes
