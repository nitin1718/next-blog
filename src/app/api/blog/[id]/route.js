import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { verifyJwtToken} from "@/lib/jwt";

export async function GET(req, res) {

    await dbConnect();
    const id = res.params.id


    try {
    
        const blog = await Blog.findById(id).populate('authorId')

        return (NextResponse.json(blog))

    } catch (error) {
        return NextResponse.json({error:'error in getblogID'+error},{status:403})
    }


}

export async function PUT(req,res) {

    const id= res.params.id

    await dbConnect();

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)


    if(!user){
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
    }

    try {
        
        const body = await req.json()
        
        const blog = await Blog.findById(id).populate('authorId')

        console.log(user.id)

        if(blog?.authorId?._id.toString()!==user._id.toString())
        {
            return NextResponse.json({message:'only author can update his blog'},{status:403})
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id,{$set:{...body}},{new:true})

        return NextResponse.json(updatedBlog)



    } catch (error) {
        return NextResponse.json({error:'error in putblogID'+error},{status:403})
    }

}

export async function DELETE(req,res) {

    const id= res.params.id

    await dbConnect();

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if(!user){
        return (NextResponse.json({error:"unauthorized access"},{status:403}))
    }

    try {
        
        const blog = await Blog.findById(id).populate('authorId')

        if(blog?.authorId?._id.toString()!==user._id.toString())
        {
            return NextResponse.json({message:'only author can delete his blog'},{status:403})
        }

         await Blog.findByIdAndDelete(id)

        return NextResponse.json({message:'blog successfully updated'},{status:200})



    } catch (error) {
        return NextResponse.json({error:'error in deleteblogID'+error},{status:403})
    }

}