"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { tasksByDisorder } from "./disorderTasks";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const TaskChecklist = () => {
    const [currentTasks, setCurrentTasks] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const today = new Date().toISOString().split("T")[0];
    const isFetchInProgress = useRef(false);

    useEffect(() => {
        const fetchUserTasks = async () => {
            if (isFetchInProgress.current) return;

            isFetchInProgress.current = true;

            try {
                const res = await axios.post("/api/users/profile");
                const user = res.data.data;
                setUserId(user._id);

                const todayTasks = user.currentTasks.filter(
                    (task) => task.date.split("T")[0] === today
                );

                const taskDateBeforeUpdate = user.currentTasks.length > 0 ? user.currentTasks[0].date : null;
                if (todayTasks.length === 0) {
                    console.log(user._id);
                    console.log(taskDateBeforeUpdate);
                    console.log(user.currentTasks);
                    await axios.patch("/api/users/update-taskRecord", {
                        userId: user._id,
                        date: taskDateBeforeUpdate,
                        completedTasks: user.currentTasks.filter(
                            (task) => task.isCompleted === true
                        ).length,
                    });
                    const disorders = user.mentalDisorders.map((d) => d.disorderName);
                    const newTasks = disorders.flatMap((disorder) => {
                        const severity = user.mentalDisorders.find(
                            (d) => d.disorderName === disorder
                        )?.severity;
                        const numTasks = severity === null ? 2 : Math.floor(severity / 2);
                        return tasksByDisorder[disorder]?.slice(0, numTasks).map((title) => ({
                            taskID: uuidv4(),
                            title,
                            date: today,
                            isCompleted: false,
                        })) || [];
                    });

                    if (newTasks.length > 0) {

                        await axios.post("/api/users/update-tasks", {
                            userId: user._id,
                            tasks: newTasks,
                        });
                        setCurrentTasks(newTasks);
                    }
                } else {
                    setCurrentTasks(todayTasks);
                }
            } catch (error) {
                console.error("Error fetching or updating tasks:", error);
            } finally {
                isFetchInProgress.current = false;
            }
        };

        fetchUserTasks();
    }, []);

    const handleCheckboxChange = async (taskID) => {
        const updatedTasks = currentTasks.map((task) => {
            if (task.taskID === taskID && !task.isCompleted) {
                return { ...task, isCompleted: true };
            }
            return task;
        });

        setCurrentTasks(updatedTasks);
        const allTasksCompleted = updatedTasks.every((task) => task.isCompleted);

        setShowConfetti(allTasksCompleted);

        if (allTasksCompleted) {
            try {
                await axios.patch("/api/users/increase-streak", { userId });
            } catch (error) {
                console.error("Error updating streak:", error);
            }
        }

        try {
            await axios.patch("/api/users/update-task-status", {
                userId,
                taskID,
                isCompleted: true,
            });
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const completedTasks = currentTasks.filter((task) => task.isCompleted).length;
    const totalTasks = currentTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-300 text-gray-800 p-8 flex flex-col items-center">
            {/* Progress Bar */}
            <div className="w-full max-w-lg mb-6">
                <h1 className="text-4xl font-bold mb-4 text-center">Your Daily Tasks</h1>
                <div className="flex justify-between mb-2 text-sm">
                    <span>Tasks left: {totalTasks - completedTasks}</span>
                    <span>{completedTasks}/{totalTasks} tasks completed</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-cyan-400 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Task List */}
            <div className="w-full max-w-lg">
                {currentTasks.map((task) => (
                    <div
                        key={task.taskID}
                        className={`flex items-center justify-between p-4 mb-4 rounded-lg transition shadow-md hover:shadow-lg ${task.isCompleted
                            ? "bg-emerald-500 text-slate-200"
                            : "bg-white border border-blue-300"
                            }`}
                    >
                        <span
                            className={`text-lg ${task.isCompleted ? "line-through" : "text-gray-800"
                                }`}
                        >
                            {task.title}
                        </span>
                        <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => handleCheckboxChange(task.taskID)}
                            disabled={task.isCompleted}
                            className={`w-5 h-5 transition-colors ${task.isCompleted
                                ? "bg-emerald-500 border-emerald-500"
                                : "bg-white border-blue-300"
                                }`}
                        />
                    </div>
                ))}
            </div>

            {/* Confetti */}
            {showConfetti && (
                <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />
            )}
        </div>
    );
};

export default TaskChecklist;
