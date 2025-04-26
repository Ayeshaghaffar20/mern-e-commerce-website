import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
export const uploadImage =  async (req,res) =>{
    try {
        if(!req.file){
           return res.status(404).json({
                success: false,
                message: "No file Upload"
            });
            
        }

        const streamUpload = (fileBuffer) =>{
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject(error)
                    }
                })
                streamifier.createReadStream(fileBuffer).pipe(stream)           
            })
        }

        const result = await streamUpload(req.file.buffer)

        res.status(201).json({
            success:true,
            message:({imageUrl:result.secure_url})
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
        
    }
}