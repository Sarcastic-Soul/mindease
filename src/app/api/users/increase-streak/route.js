import { NextResponse } from "next/server";
import User from "@/models/user.model";
import mongoose from "mongoose";

export async function PATCH(req) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        if (mongoose.connections[0].readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.streak += 1;

        await user.save();

        return NextResponse.json({ streak: user.streak }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
