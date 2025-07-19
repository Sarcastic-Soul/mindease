"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { RefreshIcon } from "@heroicons/react/outline";
import PostModal from "@/components/community/PostModal";
import CreatePost from "@/components/community/CreatePost";
import PaginationControls from "@/components/community/PaginationControls";
import PostCard from "@/components/community/PostCard";
import HeaderControls from "@/components/community/HeaderControls";

function CommunityPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [sortOrder, setSortOrder] = useState("latest");
    const [likedPosts, setLikedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [postsPerPage] = useState(12);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userRes = await axios.post("/api/users/profile");
                setUserId(userRes.data.data._id);
                setLikedPosts(userRes.data.data.likedPosts);

                const res = await axios.get(
                    `/api/community/get-posts?page=${currentPage}&limit=${postsPerPage}&sort=${sortOrder}`
                );
                setPosts(res.data.posts);
                setTotalPages(Math.ceil(res.data.total / postsPerPage));
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, sortOrder, postsPerPage]);

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(`/api/community/delete-post`, {
                params: { id: postId },
            });

            if (response.status === 200) {
                setPosts(posts.filter((post) => post._id !== postId));
                setSelectedPost(null);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const filteredPosts = showMyPosts
        ? posts.filter((post) => post.userId._id === userId)
        : posts;

    return (
        <div className="relative w-full h-screen p-6 bg-gray-50">
            <HeaderControls
                showMyPosts={showMyPosts}
                setShowMyPosts={setShowMyPosts}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                openCreatePostModal={() => setIsModalOpen(true)}
            />

            {loading ? (
                <span className="flex justify-center items-center text-gray-600 gap-2">
                    Loading Posts
                    <RefreshIcon className="w-6 h-6 animate-spin text-blue-500" />
                </span>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : filteredPosts.length === 0 ? (
                <p className="text-gray-600 text-center">No posts available.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onClick={() => setSelectedPost(post)}
                            />
                        ))}
                    </div>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}

            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    userId={userId}
                    onClose={() => setSelectedPost(null)}
                    onDelete={handleDeletePost}
                    likedPosts={likedPosts}
                />
            )}

            <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default CommunityPosts;