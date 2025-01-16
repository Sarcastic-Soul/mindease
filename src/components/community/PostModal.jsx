"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";

export default function PostModal({ post, userId, onClose, onDelete, likedPosts }) {
    const [likes, setLikes] = useState(post.likes);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
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

    const handleLike = async () => {
        try {
            setLoading(true);
            const action = liked ? "unlike" : "like";

            const response = await axios.post("/api/community/like-post", {
                postId: post._id,
                action: action,
                userId: userId,
            });

            if (response.status === 200) {
                setLikes(action === "like" ? likes + 1 : likes - 1);
                setLiked(action === "like");
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
                    <div className="align-center flex items-center gap-3">
                        <button
                            onClick={handleLike}
                            disabled={loading}
                        >
                            {liked ? (
                                <HeartSolid className="w-7 h-7 text-red-500" />
                            ) : (
                                <HeartOutline className="w-7 h-7 text-red-500" />
                            )}
                        </button>
                        <span className="text-gray-800 text-lg font-semibold">{likes}</span>
                    </div>
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
