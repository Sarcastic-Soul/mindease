import User from "@/models/user.model"; // Adjust the import path as per your project
import { connect } from "@/dbConfig/dbConfig"; // Add a utility for database connection

export async function PATCH(req) {
    const { userId, taskID, isCompleted } = await req.json();

    if (!userId || !taskID || isCompleted === undefined) {
        return new Response(
            JSON.stringify({ message: "Invalid request. Provide userId, taskID, and isCompleted." }),
            { status: 400 }
        );
    }

    try {
        await connect();

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found." }),
                { status: 404 }
            );
        }

        // Find the task by taskID
        const taskIndex = user.currentTasks.findIndex((task) => task.taskID === taskID);

        if (taskIndex === -1) {
            return new Response(
                JSON.stringify({ message: "Task not found." }),
                { status: 404 }
            );
        }

        // Update the task status
        user.currentTasks[taskIndex].isCompleted = isCompleted;

        // Save the updated user
        await user.save();

        return new Response(
            JSON.stringify({ message: "Task status updated successfully.", task: user.currentTasks[taskIndex] }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating task status:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500 }
        );
    }
}
