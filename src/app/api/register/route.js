import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcrypt"
import User from "@/models/User";
import { NextResponse } from "next/server";


dbConnect();

export async function POST(req){
    
    try {

        let data = await req.json()

        const {username,email,password}=data

        const user = await User.findOne({email})

        if(user)
        {
            return NextResponse.json({error:"user already exists"},{status:400})
        }
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const registerUser = await newUser.save()

        return NextResponse.json({message:"User registered successfully"},{status:201})

    } catch (error) {
        return NextResponse.json({error:"some error is there"+error},{status:500})
    }

}