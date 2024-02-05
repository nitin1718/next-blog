import mongoose from "mongoose";

export default async function dbConnect(){
    try {

        mongoose.connect(process.env.MONGO_URI)

        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("db connected")
        })

        connection.on('error',(err)=>{
            console.log("db not connected"+err)
             process.exit();
        })
        
    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}