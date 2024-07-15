import mongoose from "mongoose";


export async function connectDb(){

    try {

        // there we need exclamation mark because of typescript as this process.env.Mongo_uri could be string or it could be undefined so typescript prevent us form using it directly
        // one way to solve this is use if else to define type of process.env.Mongo_uri

        mongoose.connect(`${process.env.MONGODB_URI}`!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log(connection.host)
        })
        connection.on("error",(error)=>{
            console.log("mongodb connection error, please make sure the db is up and running")
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong while connecting to database ",error)
    }
}