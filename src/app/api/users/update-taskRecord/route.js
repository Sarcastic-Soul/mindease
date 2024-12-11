import { NextResponse } from "next/server";
import User from "@/models/user.model";
import mongoose from "mongoose";

export async function PATCH(req) {
    try {
        const { userId, date, completedTasks } = await req.json();

        // Validate input
        if (!userId || completedTasks === undefined) {
            return NextResponse.json({ message: "User ID, date, and completed tasks are required" }, { status: 400 });
        }

        if (mongoose.connections[0].readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
        }

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Create task record object
        const newTaskRecord = {
            date: new Date(date),  // Convert date string to Date object if necessary
            completedTasks: completedTasks,
        };

        // Add the task record to the user's taskRecords array
        user.taskRecords.push(newTaskRecord);

        // Save the user object with the updated taskRecords
        await user.save();

        return NextResponse.json({ taskRecords: user.taskRecords }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
