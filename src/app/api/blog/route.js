import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";


export async function GET(req, res) {

    await dbConnect()

    try {

        const blogs = await Blog.find({}).limit(16).populate("authorId")

        return NextResponse.json(blogs,{status:200})

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}
export async function POST(req) {
    await dbConnect()

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if(!user){
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
    }

    try {

        let body = await req.json()

        const newBlog = await Blog.create(body)

        return NextResponse.json(newBlog)

        
    } catch (error) {
        return (NextResponse.json({error:"error in blog route"+error},{status:403}))
    }

}