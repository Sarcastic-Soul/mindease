import User from "@/models/user.model"; // Adjust the import path as per your project
import { connect } from "@/dbConfig/dbConfig"; // Add a utility for database connection

export async function POST(req) {
    const { userId, tasks } = await req.json();

    // Validate input
    if (!userId || !tasks || !Array.isArray(tasks)) {
        return new Response(
            JSON.stringify({ message: "Invalid request. Provide userId and tasks array." }),
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

        const today = new Date().toISOString().split("T")[0]; // Today's date (YYYY-MM-DD)

        // Loop through the tasks and add them to the user's currentTasks list if not already present
        tasks.forEach((task) => {
            // Check if the task already exists for today based on taskID or title/date match
            const existingTask = user.currentTasks.find(
                (existingTask) =>
                    existingTask.taskID === task.taskID ||
                    (existingTask.title === task.title &&
                        existingTask.date === task.date)
            );

            // If task doesn't exist, add it to the list
            if (!existingTask) {
                user.currentTasks.push({
                    taskID: task.taskID, // Ensure we use the taskID sent from the client
                    title: task.title,
                    date: task.date,
                    isCompleted: false, // Default to false for new tasks
                });
            }
        });

        // Save the user with the updated tasks
        await user.save();

        return new Response(
            JSON.stringify({ message: "Tasks added successfully.", user }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding tasks:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500 }
        );
    }
}
