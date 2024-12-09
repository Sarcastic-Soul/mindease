"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { XIcon, CheckCircleIcon, BookOpenIcon, ClipboardCheckIcon, EmojiHappyIcon } from "@heroicons/react/outline";

export default function DashboardPage() {
  const router = useRouter();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [detectedDisorders, setDetectedDisorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserName();
    checkQuestionnaireStatus();
  }, []);

  const getUserName = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkQuestionnaireStatus = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      const mentalDisorders = res.data.data.mentalDisorders || [];
      setHasCompletedQuestionnaire(mentalDisorders.length > 0);
      const disorders = mentalDisorders.map(disorder => ({
        disorderName: disorder.disorderName,
        severity: disorder.severity,
      }));
      setDetectedDisorders(disorders);
    } catch (error) {
      console.error("Error checking questionnaire status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireStart = () => {
    router.push("/questionnaire");
  };

  const handleSeverityTest = (disorder) => {
    router.push(`/severity-tests/${disorder}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-200 to-blue-300 text-gray-900">
      <aside className="w-64 p-4">
        <h2 className="text-2xl font-bold mb-6 text-black">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
              <CheckCircleIcon className="w-5 h-5 text-purple-500 mr-2" /> 
              <button
                className="text-blue-600"
                onClick={() => router.push("/tasks")}
              >
                Tasks
              </button>
            </li>
            <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
              <BookOpenIcon className="w-5 h-5 text-green-500 mr-2" />
              <button
                className="text-blue-600"
                onClick={() => router.push("/learn")}
              >
                Learn
              </button>
            </li>
            <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
              <EmojiHappyIcon className="w-5 h-5 text-green-500 mr-2" /> 
              <button
                className="text-blue-600"
                onClick={() => router.push("/meditation")}
              >
                Meditation
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-white rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">Welcome to Your Dashboard!</h1>
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            aria-label="Profile menu"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User profile picture"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <span className="text-xl font-semibold text-gray-700">{username || "User"}</span>
          </div>
        </header>

        <div className="text-lg leading-relaxed mb-8 text-gray-800">
          {loading ? (
            <p>Loading...</p>
          ) : !hasCompletedQuestionnaire ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
              onClick={handleQuestionnaireStart}
            >
              Start Main Questionnaire
            </button>
          ) : (
            <>
              {detectedDisorders.length > 0 ? (
                <>
                  <p>Based on your questionnaire, please complete the following severity tests:</p>
                  <ul className="mt-4 space-y-2">
                    {detectedDisorders
                      .filter(disorder => disorder.severity === null)
                      .map((disorder, index) => (
                        <li key={index} className="flex items-center">
                          <ClipboardCheckIcon className="w-5 h-5 text-blue-500 mr-2" />
                          <button
                            className="text-blue-600 hover:bg-gray-200 p-2 rounded-lg transition duration-300"
                            onClick={() => handleSeverityTest(disorder.disorderName)}
                          >
                            {disorder.disorderName} Severity Test
                          </button>
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                <p>You have completed the main questionnaire. No severity tests needed at this time.</p>
              )}
            </>
          )}
        </div>
      </main>

      {isProfileMenuOpen && (
        <div
          className="fixed top-0 right-0 w-72 h-full bg-white p-4 rounded-l-lg shadow-lg"
          role="dialog"
        >
          <button
            className="absolute top-4 right-4 text-gray-900 hover:text-gray-600"
            onClick={() => setProfileMenuOpen(false)}
            aria-label="Close profile menu"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center mt-12">
            <img
              src="https://via.placeholder.com/40"
              alt="User profile picture"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
            />
            <span className="text-xl font-semibold mb-4 text-gray-800">{username}</span>

            <h3 className="text-lg font-semibold mb-2 text-blue-600">Detected Disorders:</h3>
            <ul className="mt-2 space-y-3">
              {detectedDisorders.map((disorder, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow transition-transform transform hover:scale-105">
                  <span className="font-medium text-gray-800">{disorder.disorderName}</span>
                  <span className={`text-sm ${disorder.severity !== null ? 'text-blue-400' : 'text-yellow-400'} ml-4`}>
                    {disorder.severity !== null ? `${disorder.severity}` : 'Pending'}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
              onClick={async () => {
                await axios.get("/api/users/logout");
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
