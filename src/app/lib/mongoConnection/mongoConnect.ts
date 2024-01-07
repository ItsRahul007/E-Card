import mongoose from "mongoose";
let isAlreadyConnected: boolean = false;

export default async function connectWithMongo() {
    try {
        if (isAlreadyConnected) return;
        process.env.MONGODB_URI && await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection;
        db.on('error', () => {
            isAlreadyConnected = false;
        });
        db.once('open', () => {
            isAlreadyConnected = true;
        });
    } catch (error) {
        isAlreadyConnected = false;
    }
}