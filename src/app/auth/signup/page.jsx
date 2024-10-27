"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
      className="flex items-center justify-center min-h-screen bg-gray-900"
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
              Create an Account
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Sign up to get started
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
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={onSignup}
                  disabled={buttonDisabled}
                  className={`group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white ${
                    buttonDisabled
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                  } transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? "Processing" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Already have an account?</span>
            <Link
              href="/auth/login"
              className="font-medium text-indigo-500 hover:text-indigo-400"
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
