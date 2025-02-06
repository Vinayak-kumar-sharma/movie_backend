import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { gettokencookie } from "../utils/gettokencookies.js";

export const signup = async(req,res)=>{
  try {
  const {username , password, email} = req.body
  if(!email || !password || !username){
    return res.status(400).json({Error:"all the field is required."})
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(email)){
    return res.status(400).json({Error:"Enter a correct email.."})
  }
  if(password.length <6){
    return res(400).json({Error:"password character is more than six characters."})
  }

  const emailuser = await User.findOne({email:email})

  if(emailuser){
    return res.status(400).json({Error:"Email already exists."})
  }
  const usernameexits = await User.findOne({username:username})
  if(usernameexits){
    return res.status(400).json({Error:"username already exists."})

  }
  const defaultprofileimg = ['boy','girl','kids','object']
  const image = defaultprofileimg[Math.floor(Math.random()*defaultprofileimg.length)]
  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(password,salt)

  const newuser = new User({
    username,
    email,
    password:hashpassword,
    profileimg:image
  })
  gettokencookie(newuser._id,res)
  await newuser.save()
  res.status(200).json({success:"true"})
  } catch (error) {
    console.error("Error in Signup: "+ error)
    res.status(500).json({message:"internal server error."})
  }
}
export const signin = async(req,res)=>{
  try {
    const {email,password} = req.body
    if(!email || !password){
      return res.status(400).json({Error:"All fields are required."})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({Error:"Input valid email address."})
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(400).json({Error:"False password"})
    }
    gettokencookie(user._id,res)

    res.status(200).json({success:"true",message:"Successful login"})
  } catch (error) {
    console.error("Error in signin: "+error)
    res.status(500).json({Error:"Internal server error."})
  }
}
export const signout = async(req,res)=>{
  try {
    res.clearCookie('jwt-netflix',{
      maxAge:0,
    })
    res.status(200).json({message:"Log out",Success:"true"})
  } catch (error) {
    console.error("Error in signout: "+error)
    res.status(500).json({Error:"Internal server error."})
  }
}