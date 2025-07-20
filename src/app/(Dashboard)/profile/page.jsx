"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StreakComponent from "@/components/Profile/streak";
import TaskHeatmap from "@/components/Profile/taskHeatmap";
import { User, LoaderCircle, ShieldCheck, ShieldAlert, Camera } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const res = await axios.get("/api/users/profile");
                setUser(res.data.data);
            } catch (error) {
                console.error("Error fetching profile:", error.message);
            } finally {
                setLoading(false);
            }
        };
        getUserProfile();
    }, []);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            toast.error("File is too large. Please select an image under 2MB.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('image', file);

        try {
            const response = await axios.post('/api/users/upload-avatar', formData);
            setUser(response.data.user); // Update local state for instant UI change
            toast.success("Profile picture updated!");
        } catch (error) {
            toast.error("Failed to upload image. Please try again.");
            console.error("Avatar upload failed:", error);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center bg-gray-50">
                <LoaderCircle className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (!user) {
        return <div className="p-8 text-center text-gray-600">Could not load profile.</div>;
    }

    const detectedDisorders = user.mentalDisorders || [];
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-full bg-gray-50 p-4 sm:p-6 md:p-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {/* --- HEADER --- */}
                <motion.div variants={cardVariants} className="flex items-center gap-4 mb-8">
                    <User className="text-blue-600" size={36} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
                        <p className="text-gray-500">Your personal space and progress overview.</p>
                    </div>
                </motion.div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- LEFT COLUMN --- */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Details Card */}
                        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                {/* <-- CHANGED: Avatar display and upload button --> */}
                                <div className="relative w-24 h-24 mb-4 group">
                                    {user.avatarUrl ? (
                                        <Image
                                            src={user.avatarUrl}
                                            alt={user.username}
                                            width={96}
                                            height={96}
                                            className="rounded-full object-cover w-24 h-24 border-4 border-white shadow-md"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl border-4 border-white shadow-md">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        {uploading ? <LoaderCircle className="animate-spin" /> : <Camera size={24} />}
                                    </label>
                                    <input id="avatar-upload" type="file" className="hidden" accept="image/jpeg, image/png" onChange={handleAvatarChange} disabled={uploading} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </motion.div>

                        {/* Mental Health Overview Card */}
                        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Mental Health Overview</h3>
                            <ul className="space-y-3">
                                {detectedDisorders.length > 0 ? (
                                    detectedDisorders.map((disorder) => (
                                        <li key={disorder.disorderName} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                            <span className="font-medium text-gray-700">{disorder.disorderName}</span>
                                            {disorder.severity !== null ? (
                                                <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-100 py-1 px-2.5 rounded-full">
                                                    <ShieldCheck size={14} /> {disorder.severity}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-100 py-1 px-2.5 rounded-full">
                                                    <ShieldAlert size={14} /> Pending
                                                </span>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 text-sm text-center py-4">No disorders detected yet.</li>
                                )}
                            </ul>
                        </motion.div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Task Progress Card */}
                        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Progress</h3>
                            <div className="mb-6">
                                <StreakComponent streak={user.streak || 0} />
                            </div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Activity Heatmap</h3>
                            <TaskHeatmap taskRecords={user.taskRecords || []} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
