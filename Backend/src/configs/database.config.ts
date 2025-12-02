import {connect, ConnectOptions} from 'mongoose';
import mongoose from "mongoose";


export const dbConnect =  async () => {
   await connect(process.env.MONGO_URI as string, {
       dbName: "foodMine",

    } as ConnectOptions).then(() => {
        console.log("MongoDB connected successfully.");
    }).catch((error) => {
        console.error("MongoDB connection error:", error);
    });
}

export default dbConnect;
