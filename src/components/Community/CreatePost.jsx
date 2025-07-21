"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X, Send, ImageIcon, XCircle } from "lucide-react";
import { toast } from "sonner";
import NextImage from "next/image";

export default function CreatePost({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const getUserProfile = async () => {
                try {
                    const res = await axios.get("/api/users/profile");
                    setUserId(res.data.data._id);
                } catch (error) {
                    console.error("Error fetching profile:", error.message);
                    toast.error("Could not fetch user profile.");
                    onClose();
                }
            };
            getUserProfile();
        }
    }, [isOpen, onClose]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            toast.error("Please select a valid image file (JPEG or PNG).");
            e.target.value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !message || !userId) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('message', message);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const promise = axios.post("/api/community/create-post", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        toast.promise(promise, {
            loading: 'Creating your post...',
           success: () => {
                setTitle("");
                setMessage("");
                setImageFile(null);
                setImagePreview(null);
                onClose();
                setTimeout(() => window.location.reload(), 1000);
                return 'Post created successfully!';
            },
            error: 'Failed to create post.',
            finally: () => setLoading(false),
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:bg-gray-200/50 rounded-full p-2 transition-colors z-10">
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">Create a New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a title..."
                        className="w-full p-3 bg-gray-100/50 border-2 border-gray-200 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={6}
                        className="w-full p-3 bg-gray-100/50 border-2 border-gray-200 rounded-lg text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                        required
                    />
                    <div className="p-3 bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <label htmlFor="image-upload" className="cursor-pointer text-blue-600 font-semibold flex items-center justify-center gap-2">
                            <ImageIcon size={20} />
                            <span>{imagePreview ? "Change Image" : "Add an Image"}</span>
                        </label>
                        <input id="image-upload" type="file" className="hidden" accept="image/jpeg, image/png" onChange={handleImageChange} />
                        <p className="text-xs text-gray-500 mt-1">PNG or JPG files only.</p>
                    </div>

                    {imagePreview && (
                        <div className="relative mt-4">
                            <NextImage src={imagePreview} alt="Image preview" width={500} height={280} className="w-full h-auto max-h-72 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    )}

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-700 bg-gray-200/50 rounded-lg hover:bg-gray-200 font-semibold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !userId}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition flex items-center gap-2 disabled:bg-blue-400"
                        >
                            <Send size={16} />
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
