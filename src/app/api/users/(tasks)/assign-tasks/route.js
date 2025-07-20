// app/api/users/assign-tasks/route.js (for App Router)
import { NextResponse } from "next/server";
import User from "@/models/user.model"; // Adjust path as per your project structure
import { connect } from "@/dbConfig/dbConfig"; // Adjust path as per your project structure

connect();

export async function POST(request) {
    try {
        const { userId, tasks } = await request.json();

        if (!userId || !tasks || !Array.isArray(tasks)) {
            return NextResponse.json({ message: "User ID and an array of tasks are required" }, { status: 400 });
        }

        // Find and update the user document
        const user = await User.findByIdAndUpdate(
            userId,
            { currentTasks: tasks }, // Overwrite the entire currentTasks array
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Daily tasks assigned successfully",
            success: true,
            user: user, // Return the updated user object
        }, { status: 200 });

    } catch (error) {
        console.error("Error assigning tasks:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
