import jwt from "jsonwebtoken"

export const gettokencookie =  async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{expiresIn:'15d'})
    res.cookie("jwt-netflix",token,{
      maxAge:15*24*60*60*1000,
      httpOnly:true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite:"Strict",
      
    })
    return token
}