import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";

export async function GET(req, res) {


    await dbConnect();

    const id = res.params.id
    try {
    
        const comments = await Comment.find({blogId:id}).populate('authorId')

        console.log(comments)

        return (NextResponse.json(comments))

    } catch (error) {
        return NextResponse.json({ error: 'error in getcoments' + error }, { status: 403 })
    }


}

export async function DELETE(req, res) {

    const id = res.params.id

    await dbConnect();

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const user = verifyJwtToken(token)

    if (!user) {
        return (NextResponse.json({ error: "unauthorized access" }, { status: 403 }))
    }

    try {

        const comment = await Comment.findById(id).populate('authorId')

        if (comment.authorId._id.toString() !== user._id.toString()) {
            return NextResponse.json({ message: 'only author can delete his comment' }, { status: 403 })
        }

        await Comment.findByIdAndDelete(id)

        return NextResponse.json({ message: 'comment successfully deleted' }, { status: 200 })



    } catch (error) {
        return NextResponse.json({ error: 'error in deleteComment' + error }, { status: 403 })
    }

}