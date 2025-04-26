import express from "express"
import multer from "multer"
import { uploadImage } from "../controllers/UploaderController.js"

const storage = multer.memoryStorage()
const upload = multer({storage}) 

const uploadRouter = express.Router()


uploadRouter.post("/uploadImage", upload.single("image"), uploadImage)

export default uploadRouter