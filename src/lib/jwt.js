import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export const verifyJwtToken=(token)=>{
    
    try {
        const secret = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
    
}