"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // only initialized in client components

  useEffect(() => {
    // Update button disabled state only on client-side render
    setButtonDisabled(
      !(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
    );
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/auth/login");
    } catch (error) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #e0f7fa, #e3f2fd, #f3e5f5, #fce4ec)",
        animation: "gradient 10s ease infinite",
      }}
      className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="max-w-lg w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
          <div className="p-8">
            <h2 className="text-center text-3xl font-bold text-blue-800">
              Create an Account
            </h2>
            <p className="mt-4 text-center text-blue-600">
              Join us to begin your journey
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    required
                    placeholder="Username"
                    className="appearance-none relative block w-full px-3 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 sm:text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 sm:text-sm"
                  />
                </div>
                <div className="mt-4 relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 sm:text-sm"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-blue-400"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={onSignup}
                  disabled={buttonDisabled}
                  className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white ${buttonDisabled
                    ? "bg-gradient-to-r from-blue-300 to-blue-400 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 hover:shadow-lg transition duration-300"
                    }`}
                >
                  {loading ? "Processing..." : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-blue-50 text-center">
            <span className="text-blue-700">Already have an account?</span>
            <Link
              href="/auth/login"
              className="font-medium text-blue-500 hover:text-teal-500 transition duration-200"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
