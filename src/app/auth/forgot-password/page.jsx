"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const baseURL = window.location.origin;
            const response = await axios.post('/api/users/reset-password', { email, baseURL });
            if (response.data.success) {
                setMessage('A reset password email has been sent to your email address.');
            } else {
                setError(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending the reset email. Please try again.');
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

            <div className="max-w-lg w-full mx-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
                    <div className="py-6 px-8">
                        <h2 className="text-center text-3xl font-bold text-blue-800">
                            Reset Password
                        </h2>
                        <p className="mt-4 text-center text-blue-600">
                            Enter your email to receive a password reset link
                        </p>

                        <div className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Email address"
                                            className="appearance-none relative block w-full px-3 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 sm:text-sm"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={loading || !email}
                                            className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white ${loading || !email
                                                ? "bg-gradient-to-r from-blue-300 to-blue-400 cursor-not-allowed opacity-50"
                                                : "bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 hover:shadow-lg transition duration-300"
                                                }`}
                                        >
                                            {loading ? "Processing..." : "Send Reset Link"}
                                        </button>
                                    </div>
                                </form>
                            </div>

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
                        <Link
                            href="/auth/login"
                            className="font-medium text-blue-500 hover:text-teal-500 transition duration-200"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;