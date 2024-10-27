"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(40,46,96,1) 10%, rgba(34,39,79,1) 30%, rgba(15,16,33,1) 60%, rgba(0,0,0,1) 95%)",
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="max-w-lg w-full">
        <div
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Sign in to continue
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
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
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={onLogin}
                  disabled={buttonDisabled}
                  className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white ${
                    buttonDisabled
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                  } transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? "Processing" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
