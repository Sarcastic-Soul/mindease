import { useState, useEffect } from "react";
import axios from "axios";

export default function CreatePost({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.post("/api/users/profile");
        setUserId(res.data.data._id);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    getUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message || !userId) return;

    setLoading(true);
    try {
      await axios.post("/api/community/create-post", { userId, title, message });
      setTitle("");
      setMessage("");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-3 border rounded-md text-lg text-black"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={6}
            className="w-full p-3 border rounded-md text-lg text-black"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" // Styled as slight red
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !userId}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
