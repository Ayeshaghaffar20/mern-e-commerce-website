import express from "express"
import cors from "cors"
import "dotenv/config"
import connectedDB from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/ProductsRoutes.js"
import cartRoutes from "./routes/CartRoutes.js"
import checkoutRoutes from "./routes/CheckoutRoutes.js"
import orderRoutes from "./routes/OrderRoutes.js"
import uploadRouter from "./routes/UploadRoutes.js"
import subsribeRouter from "./routes/SubscibeRoutes.js"
import adminRouter from "./routes/AdminRoutes.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true }))

const PORT = process.env.PORT


// Connected to Mongodb 
connectedDB()

app.get("/" ,(req,res)=>{
    res.send("WELCOME TO CHERRYMART API!")
})


app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use("/api/carts", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/subscribe", subsribeRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    

})