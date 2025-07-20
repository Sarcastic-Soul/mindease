"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import PostModal from "@/components/Community/PostModal";
import CreatePost from "@/components/Community/CreatePost";
import PaginationControls from "@/components/Community/PaginationControls";
import PostCard from "@/components/Community/PostCard";
import HeaderControls from "@/components/Community/HeaderControls";
import { toast } from "sonner";

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [sortOrder, setSortOrder] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 12;

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            setLoading(true);
            try {
                const userRes = await axios.get("/api/users/profile");
                setUser(userRes.data.data);

                const postsRes = await axios.get(
                    `/api/community/get-posts?page=${currentPage}&limit=${postsPerPage}&sort=${sortOrder}`
                );
                setPosts(postsRes.data.posts);
                setTotalPages(Math.ceil(postsRes.data.total / postsPerPage));
            } catch (err) {
                setError("Failed to load posts. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndPosts();
    }, [currentPage, sortOrder]); // Removed postsPerPage from dependency array as it's constant

    const handleLikePost = async (postToLike) => {
        if (!user) return;

        const isLiked = user.likedPosts.includes(postToLike._id);
        const action = isLiked ? "unlike" : "like";

        // --- 1. Optimistic UI Update ---
        // We update the state immediately for a snappy user experience.
        const originalPosts = posts;
        const originalUser = user;

        const updatedPosts = posts.map(p =>
            p._id === postToLike._id
                ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 }
                : p
        );

        const updatedUser = {
            ...user,
            likedPosts: isLiked
                ? user.likedPosts.filter(id => id !== postToLike._id)
                : [...user.likedPosts, postToLike._id]
        };

        setPosts(updatedPosts);
        setUser(updatedUser);
        if (selectedPost) {
            setSelectedPost(updatedPosts.find(p => p._id === selectedPost._id));
        }

        // --- 2. API Call ---
        try {
            await axios.post("/api/community/like-post", {
                postId: postToLike._id,
                action: action,
                userId: user._id,
            });
        } catch (error) {
            // --- 3. Revert on Failure ---
            toast.error("Failed to update like status.");
            console.error("Error liking post:", error);
            setPosts(originalPosts); // Revert posts state
            setUser(originalUser);   // Revert user state
            if (selectedPost) {
                setSelectedPost(originalPosts.find(p => p._id === selectedPost._id));
            }
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`/api/community/delete-post?id=${postId}`);
            setPosts(posts.filter((post) => post._id !== postId));
            setSelectedPost(null);
            toast.success("Post deleted successfully.");
        } catch (err) {
            toast.error("Failed to delete post.");
            console.error(err);
        }
    };

    const filteredPosts = showMyPosts
        ? posts.filter((post) => post.userId._id === user?._id)
        : posts;

    return (
        <div className="w-full min-h-full p-4 sm:p-6 md:p-8 bg-gray-50 text-gray-800">
            <HeaderControls
                showMyPosts={showMyPosts}
                setShowMyPosts={setShowMyPosts}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                openCreatePostModal={() => setCreateModalOpen(true)}
            />

            {loading ? (
                <div className="flex w-full justify-center items-center h-64 text-gray-500 gap-2">
                    <LoaderCircle className="w-6 h-6 animate-spin text-blue-500" />
                    <span>Loading Posts...</span>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16">{error}</div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                    <p className="text-lg font-medium">No posts found.</p>
                    <p>Why not be the first to share something?</p>
                </div>
            ) : (
                <>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                    >
                        <AnimatePresence>
                            {filteredPosts.map((post) => (
                                <PostCard key={post._id} post={post} onClick={() => setSelectedPost(post)} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}

            <AnimatePresence>
                {selectedPost && user && (
                    <PostModal
                        post={selectedPost}
                        user={user}
                        onClose={() => setSelectedPost(null)}
                        onDelete={handleDeletePost}
                        onLike={() => handleLikePost(selectedPost)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreatePost
                        isOpen={isCreateModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
