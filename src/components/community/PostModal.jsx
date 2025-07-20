"use client";
import { motion } from "framer-motion";
import { Heart, Trash2, X, Calendar } from "lucide-react";
import Image from "next/image";

export default function PostModal({ post, user, onClose, onDelete, onLike }) {

    const isLiked = user.likedPosts.includes(post._id);
    const authorUsername = post.userId ? post.userId.username : "Unknown";

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
                className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:bg-gray-200/50 rounded-full p-2 transition-colors z-10">
                    <X size={24} />
                </button>

                {post.imageUrl && (
                    <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            layout="fill"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* MODAL HEADER */}
                <div className="mb-6 pb-4 border-b border-gray-200/60">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 relative">
                            {post.userId?.avatarUrl ? (
                                <Image src={post.userId.avatarUrl} alt={authorUsername} fill className="rounded-full object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-lg text-blue-600">
                                    {authorUsername.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">{authorUsername}</p>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar size={12} />
                                <span>{new Date(post.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{post.title}</h2>
                </div>

                {/* MODAL CONTENT */}
                <div className="text-gray-700 text-base leading-relaxed mb-8 flex-grow prose">
                    <p>{post.message}</p>
                </div>

                {/* MODAL FOOTER */}
                <div className="mt-auto pt-6 border-t border-gray-200/60 flex justify-between items-center">
                    <motion.button
                        onClick={onLike}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-red-50"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart size={20} className={`transition-all ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                        <span className="font-semibold">{post.likes}</span>
                    </motion.button>

                    {user._id === post.userId._id && (
                        <motion.button
                            onClick={() => onDelete(post._id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Trash2 size={18} />
                            <span>Delete</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
