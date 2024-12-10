"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircleIcon, UsersIcon } from "@heroicons/react/solid"; 
import { HeartIcon } from "@heroicons/react/outline";
import PostModal from "./postModal";
import CreatePost from "./createPost";

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userRes = await axios.post("/api/users/profile");
        setUserId(userRes.data.data._id); // Fetch user ID
        setLikedPosts(userRes.data.data.likedPosts);
        const res = await axios.get("/api/community/get-posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/community/delete-post`, {
        params: { id: postId }, // Pass the post ID in query parameters
      });

      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId)); // Update the UI
        setSelectedPost(null); // Close the modal
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Filter posts by userId if "Show My Posts" is selected
  const filteredPosts = showMyPosts
    ? posts.filter((post) => post.userId._id === userId)
    : posts;

  // Sort posts based on selected "sortOrder"
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by latest
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt); // Sort by oldest
    } else if (sortOrder === "most liked") {
      return b.likes - a.likes; // Sort by most liked (descending)
    } else if (sortOrder === "least liked") {
      return a.likes - b.likes; // Sort by least liked (ascending)
    } else {
      return 0; // Default case if no valid sortOrder
    }
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const openCreatePostModal = () => {
    setIsModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-screen p-6 bg-gray-50">
      <div className="flex justify-center items-center mb-6">
        <UsersIcon className="w-8 h-8 text-blue-500 mr-2" /> {/* Icon on the left */}
        <h1 className="text-3xl font-semibold text-gray-800">Community Posts</h1>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="flex items-center text-gray-800">
          <input
            type="checkbox"
            checked={showMyPosts}
            onChange={() => setShowMyPosts(!showMyPosts)}
            className="mr-2"
          />
          Show My Posts
        </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="most liked">Most Liked</option>
          <option value="least liked">Least Liked</option>
        </select>

        <div className="ml-auto">
          <button
            onClick={openCreatePostModal}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
          >
            <span>Create Post</span>
            <PlusCircleIcon className="w-6 h-6 ml-2" />
          </button>
        </div>
      </div>


      {loading ? (
        <p className="text-gray-600 text-center">Loading posts...</p>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : sortedPosts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedPosts.map((post) => (
            <div
              key={post._id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition ease-in-out bg-white relative"
              onClick={() => handlePostClick(post)}
            >
              {/* Like count - position it at the top right */}
              <div className="absolute top-2 right-2 flex items-center text-sm text-gray-600">
                <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
                <span>{post.likes}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-600 truncate">{post.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
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

      <CreatePost isOpen={isModalOpen} onClose={closeCreatePostModal} />
    </div>
  );
}

export default CommunityPosts;
