// app/api/users/complete-task/route.js (for App Router)
import { NextResponse } from "next/server";
import User from "@/models/user.model"; // Adjust path as per your project structure
import { connect } from "@/dbConfig/dbConfig"; // Adjust path as per your project structure

// Connect to the database
connect();

// Helper function to normalize a date to the start of the day in UTC
const normalizeDateToUTCStartOfDay = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0); // Set to 00:00:00.000 UTC
    return d;
};

export async function POST(request) {
    try {
        const { userId, taskId, isCompleted } = await request.json(); // isCompleted is the NEW status

        if (!userId || !taskId || typeof isCompleted !== 'boolean') {
            return NextResponse.json({ message: "User ID, Task ID, and new 'isCompleted' status are required" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Find the specific task within the user's currentTasks array
        const taskIndex = user.currentTasks.findIndex(
            (task) => task.taskID === taskId
        );

        if (taskIndex === -1) {
            return NextResponse.json({ message: "Task not found in current tasks" }, { status: 404 });
        }

        const taskToUpdate = user.currentTasks[taskIndex];

        // --- 1. Update Current Task Status ---
        // Only proceed if the status is actually changing
        if (taskToUpdate.isCompleted === isCompleted) {
            return NextResponse.json({ message: "Task status already as requested.", success: true, streak: user.streak }, { status: 200 });
        }
        taskToUpdate.isCompleted = isCompleted;


        // --- 2. Update Task Records and Streak based on the NEW status ---
        const todayUTC = normalizeDateToUTCStartOfDay(new Date());

        let todayRecord = user.taskRecords.find((record) => {
            const recordDateUTC = normalizeDateToUTCStartOfDay(record.date);
            return recordDateUTC.getTime() === todayUTC.getTime();
        });

        // Handle completing a task
        if (isCompleted) {
            if (todayRecord) {
                // If record for today exists, just increment completedTasks
                todayRecord.completedTasks += 1;
            } else {
                // If no record for today, create a new one
                user.taskRecords.push({
                    date: todayUTC,
                    completedTasks: 1,
                });
                // Sort taskRecords by date to ensure correct streak calculation
                user.taskRecords.sort((a, b) => a.date.getTime() - b.date.getTime());

                // Now, calculate streak:
                const yesterdayUTC = normalizeDateToUTCStartOfDay(new Date());
                yesterdayUTC.setDate(yesterdayUTC.getDate() - 1); // Get the day before today

                const yesterdayRecord = user.taskRecords.find((record) => {
                    const recordDateUTC = normalizeDateToUTCStartOfDay(record.date);
                    return recordDateUTC.getTime() === yesterdayUTC.getTime();
                });

                if (yesterdayRecord) {
                    user.streak += 1;
                } else {
                    user.streak = 1; // Start a new streak if no task yesterday
                }
            }
            // Message for completion
            await user.save(); // Save after updates
            return NextResponse.json({
                message: "Task marked complete!",
                success: true,
                streak: user.streak,
                taskRecords: user.taskRecords,
                updatedTask: taskToUpdate,
            }, { status: 200 });

        } else { // Handle uncompleting a task
            if (todayRecord) {
                // Decrement the count if uncompleted, ensure it doesn't go below zero
                todayRecord.completedTasks = Math.max(0, todayRecord.completedTasks - 1);

                // If this uncompletion makes today's completed tasks zero,
                // you might want to consider removing the record or resetting streak.
                // However, generally, unchecking a task doesn't *break* a streak from yesterday,
                // but it might prevent a new streak from starting or continuing if it was the only task.
                // For simplicity, we only decrement the count here. The streak logic only increments.
                // A streak is broken when a new day starts and the previous day had no completions.
                // If the user unchecks ALL tasks for today, and it was the *first* day of a new streak,
                // the streak count for tomorrow might be affected.
                // This complex logic is best handled when generating/checking tasks at the start of a new day.
            }
            // Message for uncompletion
            await user.save(); // Save after updates
            return NextResponse.json({
                message: "Task marked incomplete!",
                success: true,
                streak: user.streak, // Streak doesn't change on uncompletion of today's task
                taskRecords: user.taskRecords,
                updatedTask: taskToUpdate,
            }, { status: 200 });
        }


    } catch (error) {
        console.error("Error toggling task status:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
