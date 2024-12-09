"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { tasksByDisorder } from "./disorderTasks";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const TaskChecklist = () => {
    const [currentTasks, setCurrentTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [userId, setUserId] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const today = new Date().toISOString().split("T")[0];
    const isFetchInProgress = useRef(false);

    useEffect(() => {
        const fetchUserTasks = async () => {
            if (isFetchInProgress.current) return;

            isFetchInProgress.current = true;

            console.log("Fetching user tasks");
            try {
                const res = await axios.post("/api/users/profile");
                const user = res.data.data;
                setUserId(user._id);

                const todayTasks = user.currentTasks.filter(
                    (task) => task.date.split("T")[0] === today
                );

                if (todayTasks.length === 0) {
                    const disorders = user.mentalDisorders.map((d) => d.disorderName);
                    const newTasks = [];

                    disorders.forEach((disorder) => {
                        const severity = user.mentalDisorders.find(d => d.disorderName === disorder)?.severity;
                        const numTasks = severity === null ? 2 : Math.floor(severity / 2);

                        if (tasksByDisorder[disorder]) {
                            for (let i = 0; i < numTasks; i++) {
                                newTasks.push({
                                    taskID: uuidv4(),
                                    title: tasksByDisorder[disorder][i],
                                    date: today,
                                    isCompleted: false,
                                });
                            }
                        }
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

    const handleCheckboxChange = async (taskID, isCompleted) => {
        const updatedStatus = !isCompleted;

        setTaskStatus((prevStatus) => ({
            ...prevStatus,
            [taskID]: updatedStatus,
        }));

        const updatedTasks = currentTasks.map((task) => {
            if (task.taskID === taskID) {
                return { ...task, isCompleted: updatedStatus };
            }
            return task;
        });

        setCurrentTasks(updatedTasks);

        const tasksLeft = updatedTasks.filter((task) => !task.isCompleted).length;
        setShowConfetti(updatedTasks.every(task => task.isCompleted));

        try {
            await axios.patch("/api/users/update-task-status", {
                userId,
                taskID,
                isCompleted: updatedStatus,
            });
        } catch (error) {
            console.error("Error updating task status:", error);
            // Rollback task status change in case of failure
            setTaskStatus((prevStatus) => ({
                ...prevStatus,
                [taskID]: isCompleted,
            }));
            setCurrentTasks(updatedTasks.map(task =>
                task.taskID === taskID
                    ? { ...task, isCompleted }
                    : task
            ));
        }
    };

    const completedTasks = currentTasks.filter((task) => task.isCompleted).length;
    const totalTasks = currentTasks.length;
    const progress = (completedTasks / totalTasks) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-300 text-gray-800 p-8 flex flex-col items-center">
            {/* Task Progress Bar */}
            <div className="w-full max-w-lg mb-6">
                <h1 className="text-4xl font-bold mb-4 text-center">Your Daily Tasks</h1>
                <div className="flex justify-between mb-2 text-sm">
                    <span>Tasks left: {currentTasks.filter((task) => !task.isCompleted).length}</span>
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
                        onClick={() => handleCheckboxChange(task.taskID, taskStatus[task.taskID] || task.isCompleted)}
                        className={`flex items-center justify-between p-4 mb-4 rounded-lg cursor-pointer transition ${taskStatus[task.taskID] || task.isCompleted
                            ? "bg-emerald-500 text-slate-200"
                            : "bg-white border border-blue-300"
                            } shadow-md hover:shadow-lg`}
                    >
                        <span
                            className={`text-lg ${taskStatus[task.taskID] || task.isCompleted ? "line-through" : "text-gray-800"}`}
                        >
                            {task.title}
                        </span>
                        <input
                            type="checkbox"
                            checked={taskStatus[task.taskID] || task.isCompleted}
                            readOnly
                            className={`w-5 h-5 pointer-events-none transition-colors ${taskStatus[task.taskID] || task.isCompleted ? "bg-emerald-500 border-emerald-500" : "bg-white border-blue-300"}`}
                        />
                    </div>
                ))}
            </div>

            {/* Confetti */}
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={500}
                    recycle={false}
                />
            )}
        </div>
    );
};

export default TaskChecklist;
