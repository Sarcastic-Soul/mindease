import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getTokenData } from "@/utils/getTokenData";
import User from "@/models/user.model";


connect();

export async function GET(request) {
    try {
        const userID = await getTokenData(request);

        if (!userID) {
            return NextResponse.json({ error: "Unauthorized: No user ID found in token" }, { status: 401 });
        }

        const user = await User.findOne({ _id: userID }).select("-password").lean();

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 404 });
        }


        if (user.taskRecords && Array.isArray(user.taskRecords)) {
            user.taskRecords = user.taskRecords.map(record => {
                // Ensure 'date' is a Date object before calling toISOString()
                const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
                return {
                    ...record,
                    date: recordDate.toISOString()
                };
            });
        }

        if (user.currentTasks && Array.isArray(user.currentTasks)) {
            user.currentTasks = user.currentTasks.map(task => {
                // Ensure 'date' is a Date object before calling toISOString()
                const taskDate = task.date instanceof Date ? task.date : new Date(task.date);
                return {
                    ...task,
                    date: taskDate.toISOString()
                };
            });
        }

        if (user.verifyCodeExpiry instanceof Date) {
            user.verifyCodeExpiry = user.verifyCodeExpiry.toISOString();
        }
        if (user.forgotPasswordTokenExpiry instanceof Date) {
            user.forgotPasswordTokenExpiry = user.forgotPasswordTokenExpiry.toISOString();
        }
        if (user.verifyTokenExpiry instanceof Date) {
            user.verifyTokenExpiry = user.verifyTokenExpiry.toISOString();
        }

        delete user.verifyCode;
        delete user.forgotPasswordToken;
        delete user.verifyToken;

        return NextResponse.json({
            message: "User found",
            data: user,
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error("Error in /api/users/profile:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
