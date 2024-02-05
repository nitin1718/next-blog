import dbConnect from "@/lib/dbConnect"
import { verifyJwtToken } from "@/lib/jwt"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"


export async function PUT(req,res){


    await dbConnect()
    const id = res.params.id

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const data= verifyJwtToken(token)

    if(!data)
    {
        return NextResponse.json({error:'unauthorized access'},{status:403})
    }


    try {
        
        const blog = await Blog.findById(id)

        if(blog.likes.includes(data._id))
        {
            blog.likes = blog.likes.filter((id)=>id.toString()!==data._id.toString())
    
        }
        else{
            blog.likes.push(data._id)
        }

        await blog.save()

        return NextResponse.json({message:'successfully interacted with blog'},{status:200})
    } catch (error) {
        return NextResponse.json({error:'error in likes'+error},{status:403})
    }
}