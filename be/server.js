import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
 const app = express()
 
import { connecttoDb } from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"


 dotenv.config()
 const PORT = 5000
 app.use(express.json())
app.use(cookieParser())

 app.use("/api/v1/auth",authRoutes)
 app.use("/api/v1/movie",movieRoutes)


 app.listen(PORT,()=>{
  console.log("Listening")
  connecttoDb()
 })