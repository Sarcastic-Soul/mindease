"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import StreakComponent from "@/components/streak";
import TaskHeatmap from "@/components/taskHeatmap";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [detectedDisorders, setDetectedDisorders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [streak, setStreak] = useState(0);
    const [taskData, setTaskData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const res = await axios.post("/api/users/profile");
            setUsername(res.data.data.username);
            const mentalDisorders = res.data.data.mentalDisorders || [];
            const disorders = mentalDisorders.map(disorder => ({
                disorderName: disorder.disorderName,
                severity: disorder.severity,
            }));
            setDetectedDisorders(disorders);
            setStreak(res.data.data.streak || 0);
            setTaskData(res.data.data.taskRecords || []);
        } catch (error) {
            console.error("Error fetching profile:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-blue-300 text-gray-900">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-extrabold text-blue-600">Your Profile</h1>
                </header>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="User profile picture"
                                className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
                            />
                            <span className="text-xl font-semibold text-gray-800">{username}</span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-blue-600">Detected Disorders:</h3>
                        <ul className="mt-2 space-y-3">
                            {detectedDisorders.length > 0 ? (
                                detectedDisorders.map((disorder, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow transition-transform transform hover:scale-105"
                                    >
                                        <span className="font-medium text-gray-800">{disorder.disorderName}</span>
                                        <span
                                            className={`text-sm ${disorder.severity !== null ? "text-blue-400" : "text-yellow-400"
                                                } ml-4`}
                                        >
                                            {disorder.severity !== null ? `${disorder.severity}` : "Pending"}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-600">No disorders detected.</li>
                            )}
                        </ul>
                        <StreakComponent streak={streak}></StreakComponent>
                        <TaskHeatmap taskData={taskData}></TaskHeatmap>

                        <button
                            className=" bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300 mt-6"
                            onClick={async () => {
                                await axios.get("/api/users/logout");
                                router.push("/");
                            }}
                        >
                            Logout
                        </button>

                    </>
                )}
            </div>
        </div>
    );
}
