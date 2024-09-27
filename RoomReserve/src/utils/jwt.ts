import jwt from 'jsonwebtoken'

export const generateToken = async (userId: number)=>{
    return jwt.sign({userId},process.env.JWT_SECRET as string,{expiresIn:"1h"})
}