import express from "express"
import { generateImage } from "../controllers/Image.js"
import authUser from "../middleware/auth.js"

const imageRouter = express.Router()

imageRouter.post('/generate-image', authUser, generateImage)

export default imageRouter