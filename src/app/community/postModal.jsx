"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline"; // For the outline heart
import { HeartIcon as HeartSolid } from "@heroicons/react/solid"; // For the solid heart

export default function PostModal({ post, userId, onClose, onDelete, likedPosts }) {
    const [likes, setLikes] = useState(post.likes); // Store the likes locally
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false); // Track if the post is liked by the user

    useEffect(() => {
        // Initialize liked state by checking if the postId exists in the likedPosts array of the user
        const checkIfLiked = async () => {
            try {
                if (likedPosts.includes(post._id)) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            } catch (error) {
                console.error("Error checking if post is liked:", error);
            }
        };

        checkIfLiked();
    }, [userId, post._id], likedPosts);

    // Function to handle like/unlike action
    const handleLike = async () => {
        try {
            setLoading(true);
            const action = liked ? "unlike" : "like"; // Toggle like/unlike

            const response = await axios.post("/api/community/like-post", {
                postId: post._id,
                action: action,
                userId: userId,
            });

            if (response.status === 200) {
                setLikes(action === "like" ? likes + 1 : likes - 1);
                setLiked(action === "like"); // Toggle liked state
            }
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">
                    {post.title}
                </h2>
                <p className="text-gray-700 text-lg mb-6">{post.message}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <div>
                        <p className="font-semibold">
                            Author: {post.userId.username || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <p>
                            Created on: {new Date(post.createdAt).toLocaleDateString()} at{" "}
                            {new Date(post.createdAt).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    {/* Like Button with heart icon */}
                    <button
                        onClick={handleLike}
                        disabled={loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 transition"
                            }`}
                    >
                        {/* Heart Icon */}
                        {liked ? (
                            <HeartSolid className="w-5 h-5 text-red-500" />
                        ) : (
                            <HeartOutline className="w-5 h-5 text-red-500" />
                        )}
                        <span>{likes}</span> {/* Show current like count */}
                    </button>

                    {/* Only show delete button if the current user is the post owner */}
                    {userId === post.userId._id && (
                        <button
                            onClick={() => onDelete(post._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                            Delete Post
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
