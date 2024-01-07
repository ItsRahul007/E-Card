import mongoose from "mongoose";
let isAlreadyConnected: boolean = false;

export default async function connectWithMongo() {
    try {
        if (isAlreadyConnected) return;
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            const db = mongoose.connection;
            db.on('error', () => {
                isAlreadyConnected = false;
            });
            db.once('open', () => {
                isAlreadyConnected = true;
            });

            return { connected: true, message: "DB connection established" }
        } else return { connected: false, message: "Unable to finde the DB URI" }
    } catch (error) {
        isAlreadyConnected = false;
        console.log(error);
        return { connected: false, message: "Something went wrong" };
    }
}