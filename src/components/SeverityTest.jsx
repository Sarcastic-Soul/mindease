"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SeverityTest({ disorderName, questions }) {
    const router = useRouter();
    const [responses, setResponses] = useState(Array(questions.length).fill(0));
    const [tooltipIndex, setTooltipIndex] = useState(-1); // State for the tooltip
    const questionRefs = useRef(questions.map(() => React.createRef()));

    const handleOptionChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
        // Hide the tooltip if the question is answered
        if (tooltipIndex === index) {
            setTooltipIndex(-1);
        }
    };

    const calculateScore = async () => {
        const unansweredIndex = responses.findIndex((response) => response === 0);
        if (unansweredIndex !== -1) {
            questionRefs.current[unansweredIndex].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            setTooltipIndex(unansweredIndex); // Show tooltip for the unanswered question
            return;
        }

        const totalScore = responses.reduce((acc, curr) => acc + curr, 0);
        const finalScore = totalScore / responses.length;
        try {
            await axios.post("/api/users/submitSeverityTest", {
                disorderName,
                severity: finalScore,
            });

            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting severity test:", error);
            alert("Failed to submit the test. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
                    {`${disorderName} Assessment`}
                </h1>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            ref={questionRefs.current[index]}
                            className="relative p-4 bg-gray-800 rounded-lg shadow-lg"
                        >
                            <p className="mb-4 text-lg font-semibold">{`${index + 1}. ${question}`}</p>
                            {tooltipIndex === index && (
                                <div className="absolute left-2 top-[-40px] w-40 p-2 bg-gray-700 text-red-400 text-sm rounded shadow-lg z-10">
                                    This question is required
                                    <div className="absolute left-2 top-full w-3 h-3 transform rotate-45 bg-gray-700"></div>
                                </div>
                            )}
                            <div className="flex flex-wrap space-x-4">
                                {[
                                    { label: "Strongly Agree", value: 5 },
                                    { label: "Agree", value: 4 },
                                    { label: "Neutral", value: 3 },
                                    { label: "Disagree", value: 2 },
                                    { label: "Strongly Disagree", value: 1 },
                                ].map((option, i) => (
                                    <label
                                        key={i}
                                        className="flex items-center space-x-2 cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option.value}
                                            checked={responses[index] === option.value}
                                            onChange={() => handleOptionChange(index, option.value)}
                                            className="form-radio w-6 h-6 rounded-full border-2 border-gray-600 checked:bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
                                        />
                                        <span className="text-gray-300 group-hover:text-white transition duration-200 ease-in-out">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="text-center mt-8">
                        <button
                            type="button"
                            onClick={calculateScore}
                            className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-400 transition duration-300 ease-in-out shadow-lg hover:shadow-blue-500/40"
                        >
                            Submit Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
