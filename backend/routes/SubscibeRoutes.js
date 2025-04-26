import express from "express"
import { handleSubscribe } from "../controllers/SubscribeController.js"

const subsribeRouter = express.Router()

subsribeRouter.post('/handleSubscribe', handleSubscribe)

export default subsribeRouter