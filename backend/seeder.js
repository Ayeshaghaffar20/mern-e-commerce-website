import bcrypt from "bcrypt"

import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import Product from "./Models/ProductModle.js";
import User from "./Models/UserModle.js";
import Cart from './Models/CartModel.js';
import connectedDB from "./db/db.js";
import { products } from "./data/products.js";

const importData = async ()=>{
    try {
        await connectedDB()

        await Product.deleteMany();
        await User.deleteMany()
        await Cart.deleteMany();

        //Create a default Admin user

        // const createUser = await User.create({
        //     name:"Admin User",
        //     email:"admin@example.com",
        //     password: "Admin123",
        //     role:"admin"
        // })

        const hashedPassword = await bcrypt.hash("Admin123", 10);

        const createUser = await User.create({
          name: "Admin User",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin"
        });

        const userID = createUser._id
        
        const sampleProducts = products.map((item)=>{
            return { ...item, user: userID }; 
        })

        await Product.insertMany(sampleProducts)

        console.log("🌱 Data Imported Successfully");
        process.exit(); // exit after seeding



    } catch (error) {
        console.error("❌ Seeding Failed", error);
    process.exit(1);
        
    }
}

importData()