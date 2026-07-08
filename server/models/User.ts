import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    zernioProfileId: { type: String }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)