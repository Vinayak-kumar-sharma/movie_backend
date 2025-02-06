import express from "express"
import { getalltrend } from "../controller/movie.controller.js"
const router = express.Router()

router.get("/trending",getalltrend)

export default router;