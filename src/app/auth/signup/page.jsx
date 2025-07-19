"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

const SignupPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameStatus, setUsernameStatus] = useState(''); // To show username status (available or not)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // To track form submission
    const router = useRouter();

    useEffect(() => {
        setButtonDisabled(
            !(user.email.length > 0 && user.password.length >= 8 && user.username.length >= 3)
        );
    }, [user]);

    const onSignup = async () => {
        setIsFormSubmitted(true);

        if (!validateEmail(user.email) || !(validateUsername(user.username)) || !(validatePassword(user.password))) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            const { verifyCode } = response.data;
            const emailResponse = await sendVerificationEmail(user.email, user.username, verifyCode);

            if (!emailResponse.success) {
                setError("Failed to send verification email. Please try again.");
                return;
            }

            router.replace(`/auth/verify/${user.username}`);
        } catch (error) {
            console.log(error.response.data.error);
            setEmailError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9_]+$/; // Alphanumeric check
        if (!regex.test(username)) {
            setUsernameError("Username can only contain letters & numbers & underscore.");
            return false;
        } else {
            setUsernameError("");
            return true;
        }
    };

    const checkUsernameAvailability = async (username) => {
        if (username) {
            try {
                const response = await axios.get(`/api/users/unique-username?username=${username}`);
                // console.log("Username check response", response.data);
                if (!response.data.success) {
                    setUsernameStatus("Username already taken.");
                    setUsernameError(response.data.message);
                } else {
                    setUsernameStatus("Username is available.");
                    setUsernameError("");
                }
            } catch (error) {
                setUsernameError("Error checking username.");
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
        if (!regex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return false
        } else {
            setEmailError("");
            return true
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            setPasswordError("Password must be at least 8 characters long, include a letter, a number, and a special character.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    useEffect(() => {
        if (user.username) {
            const timeoutId = setTimeout(() => {
                if (validateUsername(user.username)) {
                    checkUsernameAvailability(user.username);
                }
            }, 500); // Debounce username availability check

            return () => clearTimeout(timeoutId);
        }
    }, [user.username]);

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
                                    {
                                        usernameError.length > 0 ? <p className="text-red-500 text-sm">{usernameError}</p> : null
                                    }
                                    {usernameError.length == 0 && usernameStatus && (
                                        <p className={`text-sm ${usernameStatus === "Username is available." ? 'text-green-500' : 'text-red-500'}`}>
                                            {usernameStatus}
                                        </p>
                                    )}
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
                                    {isFormSubmitted && emailError && (
                                        <p className="text-red-500 text-sm">{emailError}</p>
                                    )}
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
                                {isFormSubmitted && passwordError && (
                                    <p className="text-red-500 text-sm">{passwordError}</p>
                                )}
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
                        <span className="text-blue-700">Already have an account? </span>
                        <Link
                            href="/auth/login"
                            className="font-medium text-blue-500 hover:text-teal-500 transition duration-200"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignupPage;
