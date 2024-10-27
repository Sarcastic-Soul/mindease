"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  XIcon,
  CheckCircleIcon,
  BookOpenIcon,
  UsersIcon,
  SupportIcon,
} from "@heroicons/react/outline";

export default function DashboardPage() {
  const router = useRouter();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username when the component mounts
    getUserName();
  }, []); // Keeping the dependency array empty to run only once on mount

  const getUserName = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout"); // Added leading slash to correct the path
      router.push("/");
      console.log("user logged out");
    } catch (error) {
      console.log(error.message);
    }
  };

  const pushTasks = () => {
    try {
      router.push("/tasks");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4 flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5 text-blue-400" />
              <button
                onClick={pushTasks}
                className="text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition duration-300"
              >
                Tasks
              </button>
            </li>
            <li className="mb-4 flex items-center space-x-2">
              <BookOpenIcon className="w-5 h-5 text-blue-400" />
              <button
                className="text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition duration-300"
                // Add respective functionality when ready
                onClick={() => console.log("Learn section clicked")}
              >
                Learn
              </button>
            </li>
            <li className="mb-4 flex items-center space-x-2">
              <UsersIcon className="w-5 h-5 text-blue-400" />
              <button
                className="text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition duration-300"
                // Add respective functionality when ready
                onClick={() => console.log("Community section clicked")}
              >
                Community
              </button>
            </li>
            <li className="mb-4 flex items-center space-x-2">
              <SupportIcon className="w-5 h-5 text-blue-400" />
              <button
                className="text-blue-400 hover:bg-gray-700 p-2 rounded-lg transition duration-300"
                // Add respective functionality when ready
                onClick={() => console.log("Help section clicked")}
              >
                Help
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold">
            Welcome to Your Dashboard!
          </h1>
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={toggleProfileMenu}
            aria-label="Profile menu"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User profile picture" // Updated alt text for better accessibility
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <span className="text-xl font-semibold">
              {username || "User Name"}
            </span>
          </div>
        </header>
        <p className="text-lg leading-relaxed">
          Here you can manage your tasks, learn more about mental health,
          connect with the community, and get help if needed.
        </p>
      </main>

      {/* Profile Menu */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-gray-800 p-4 rounded-l-lg shadow-lg transition-transform transform ${
          isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-labelledby="profile-menu-title"
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-400"
          onClick={toggleProfileMenu}
          aria-label="Close profile menu"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center mt-12">
          <img
            src="https://via.placeholder.com/40"
            alt="User profile picture"
            className="w-24 h-24 rounded-full border-4 border-gradient-to-br from-blue-500 via-teal-500 to-green-500 mb-4"
          />
          <span className="text-xl font-semibold mb-4">
            {username || "User Name"}
          </span>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
            onClick={logout}
          >
            Logout
          </button>
          <button className="text-blue-400 mt-4 hover:bg-gray-700 p-2 rounded-lg transition duration-300">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}
