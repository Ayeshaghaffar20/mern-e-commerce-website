import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import chalk from "chalk";

const URL = process.env.MONGODB_URL

const connectedDB = async ()=>{
    try {
        await mongoose.connect(URL,{dbName:"e-commerce"})
        console.log(chalk.bgGreen.white('connected to MongoDB'));
    } catch (error) {
        console.error(chalk.bgRed.white("error in connecting to db", error));
        
        
    }

}

export default connectedDB
