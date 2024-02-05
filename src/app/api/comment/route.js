import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";


export async function POST(req) {
    await dbConnect()

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if(!user){
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
    }

    try {

        const body = await req.json()

        let newComment = await Comment.create(body)

        newComment = await newComment.populate('authorId')

        return NextResponse.json((newComment))
        
    } catch (error) {
        return (NextResponse.json({error:"error in comment route"+error},{status:403}))
    }

}