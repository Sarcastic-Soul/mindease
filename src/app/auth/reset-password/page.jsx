"use client";

import React, { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function ResetPasswordContent() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("/api/users/reset-password/confirm", {
                token,
                password,
            });
            if (response.data.success) {
                setMessage("Password has been reset successfully.");
                router.replace("/auth/login");
            } else {
                setError(response.data.message || "Error resetting password.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error resetting password.");
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

            <div className="max-w-lg w-full mx-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
                    <div className="py-6 px-8">
                        <h2 className="text-center text-3xl font-bold text-blue-800">
                            Reset Password
                        </h2>
                        <p className="mt-4 text-center text-blue-600">
                            Enter your new password below
                        </p>

                        <div className="mt-8 space-y-6">
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="New password"
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
                                <div className="mt-4">
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm password"
                                        className="appearance-none relative block w-full px-3 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 sm:text-sm"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white ${!password || !confirmPassword
                                            ? "bg-gradient-to-r from-blue-300 to-blue-400 cursor-not-allowed opacity-50"
                                            : "bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 hover:shadow-lg transition duration-300"
                                            }`}
                                        disabled={!password || !confirmPassword}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>

                            {message && (
                                <div className="mt-4 py-2 px-4 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm text-center">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 py-2 px-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-8 py-4 bg-blue-50 text-center">
                        <span className="text-blue-700">Remember your password? </span>
                        <a
                            href="/auth/login"
                            className="font-medium text-blue-500 hover:text-teal-500 transition duration-200"
                        >
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
