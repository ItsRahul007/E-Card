import mongoose from "mongoose";
const { URL_PASSWORD, URL_COLLECTION_NAME } = process.env;

export default async function connectWithMongo() {
    await mongoose.connect("mongodb+srv://Rahul:" + URL_PASSWORD + "@cluster0.wydmyio.mongodb.net/" + URL_COLLECTION_NAME + "?retryWrites=true&w=majority");
}