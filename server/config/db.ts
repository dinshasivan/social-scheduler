import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is missing from .env");
        }

        await mongoose.connect(uri);

    } catch (error: any) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;