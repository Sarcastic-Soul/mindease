"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  UsersIcon,
  ChartBarIcon,
  ChatAltIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = [
    {
      text: "The greatest wealth is health.",
      author: "Virgil",
    },
    {
      text: "Mental health is not a destination, but a process.",
      author: "Noam Shpancer",
    },
    {
      text: "You are not your illness. You have an individual story to tell.",
      author: "Julian Seifter",
    },
  ];

  const nextQuote = () => {
    setCurrentIndex((currentIndex + 1) % quotes.length);
  };

  const features = [
    {
      title: "Curated Task List",
      description:
        "Receive a personalized list of tasks based on your mental health diagnosis to help improve your well-being.",
      icon: <CheckCircleIcon className="h-12 w-12 text-teal-500" />,
    },
    {
      title: "Community Page",
      description:
        "Connect with others facing similar issues and support each other in your mental health journey. Share your progress and get feedback.",
      icon: <UsersIcon className="h-12 w-12 text-blue-500" />,
    },
    {
      title: "Progress Tracker",
      description:
        "Track your mental health improvements over time and see how your efforts lead to positive change.",
      icon: <ChartBarIcon className="h-12 w-12 text-green-500" />,
    },
    {
      title: "Chat Bot",
      description:
        "Talk to our AI-powered chatbot for instant support, guidance, and quick answers to your mental health queries.",
      icon: <ChatAltIcon className="h-12 w-12 text-purple-500" />,
    },
    {
      title: "Learn Tab",
      description:
        "Learn more about mental disorders, their symptoms, and various coping mechanisms to help you feel better.",
      icon: <BookOpenIcon className="h-12 w-12 text-orange-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Header Section */}
      <motion.h1
        className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to MindEase
      </motion.h1>

      <motion.p
        className="text-xl text-gray-300 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Discover your mental health insights and receive personalized help.
      </motion.p>

      {/* Service Section */}
      <section className="max-w-4xl mb-20">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          What We Offer
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          At MindEase, we help diagnose mental health disorders and guide you
          toward better mental well-being. Our platform provides actionable
          insights based on expert advice and scientific data, so you can track
          and improve your mental health over time.
        </motion.p>

        <div className="space-x-4">
          {/* Shimmer effect for Login Button */}
          <button
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50 border border-white/20"
            onClick={() => router.push("/auth/login")}
          >
            <span className="text-lg">Log In</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>

          {/* Shimmer effect for Signup Button */}
          <button
            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-green-500 to-lime-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-green-500/50 border border-white/20"
            onClick={() => router.push("/auth/signup")}
          >
            <span className="text-lg">Sign Up</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-10 bg-white/20"></div>
            </div>
          </button>
        </div>
      </section>

      {/* Animated Feature Cards */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 shadow-lg p-8 rounded-lg flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-center">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Quotes Carousel */}
      <section className="w-full max-w-4xl py-12">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Inspiring Quotes
        </motion.h2>

        <motion.div
          className="bg-gray-700 p-8 rounded-lg shadow-md text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-xl italic text-gray-300">
            &ldquo;{quotes[currentIndex].text}&rdquo;
          </p>
          <p className="mt-4 text-gray-400">- {quotes[currentIndex].author}</p>
        </motion.div>

        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full hover:from-blue-500 hover:to-blue-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
          onClick={nextQuote}
          whileHover={{ scale: 1.05 }}
        >
          Next Quote
        </motion.button>
      </section>
    </div>
  );
}
