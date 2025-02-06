import mongoose from "mongoose";

export const connecttoDb = async ()=>{
  try {
    const conn =  await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database connected: ", + conn.connection.host)
  } catch (error) {
    console.log("Oops database is offline")
    process.exit(1)
    
  }
}