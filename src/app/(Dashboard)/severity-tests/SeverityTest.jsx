"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, AlertCircle, Send } from "lucide-react";

const options = [
    { label: "Strongly Disagree", value: 1, color: "rose-500", size: "w-7 h-7" },
    { label: "Disagree", value: 2, color: "rose-400", size: "w-5 h-5" },
    { label: "Neutral", value: 3, color: "gray-400", size: "w-4 h-4" },
    { label: "Agree", value: 4, color: "teal-400", size: "w-5 h-5" },
    { label: "Strongly Agree", value: 5, color: "teal-500", size: "w-7 h-7" },
];

export default function SeverityTest({ disorderName, questions }) {
    const router = useRouter();
    const [responses, setResponses] = useState(Array(questions.length).fill(0));
    const [unansweredIndex, setUnansweredIndex] = useState(-1);
    const questionRefs = useRef(questions.map(() => React.createRef()));

    const handleOptionChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
        if (unansweredIndex !== -1) {
            setUnansweredIndex(-1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstUnanswered = responses.findIndex((response) => response === 0);

        if (firstUnanswered !== -1) {
            setUnansweredIndex(firstUnanswered);
            questionRefs.current[firstUnanswered].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        const totalScore = responses.reduce((acc, curr) => acc + curr, 0);
        const finalScore = (totalScore / responses.length) * 2; // Scale to 0-10 range


        try {
            await axios.post("/api/users/submitSeverityTest", {
                disorderName,
                severity: finalScore.toFixed(2),
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting severity test:", error);
            alert("Failed to submit the test. Please try again.");
        }
    };

    const answeredQuestions = responses.filter(r => r > 0).length;
    const progress = (answeredQuestions / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-20">
                <motion.div
                    className="h-full bg-teal-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <ClipboardCheck className="mx-auto text-blue-600 mb-2" size={40} />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        {`${disorderName} Assessment`}
                    </h1>
                    <p className="text-gray-500 mt-2">Rate how much you've been bothered by the following.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <motion.div
                            key={index}
                            ref={questionRefs.current[index]}
                            className="rounded-xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <p className="text-lg font-medium text-gray-700 mb-4">{`${question}`}</p>

                            <div className="flex items-center justify-center gap-4">
                                <span className="font-semibold text-rose-600">Disagree</span>
                                <div className="flex items-center justify-center gap-3 sm:gap-4">
                                    {options.map((option) => {
                                        const isSelected = responses[index] === option.value;
                                        return (
                                            <label key={option.value} className="relative cursor-pointer" title={option.label}>
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    checked={isSelected}
                                                    onChange={() => handleOptionChange(index, option.value)}
                                                    className="sr-only"
                                                />
                                                <motion.div
                                                    className="rounded-full transition-colors duration-200 border-2"
                                                    animate={{
                                                        backgroundColor: isSelected ? `var(--color-${option.color})` : 'transparent',
                                                        borderColor: `var(--color-${option.color})`,
                                                        scale: isSelected ? 1.15 : 1,
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                    style={{
                                                        ['--color-rose-500']: '#f43f5e', ['--color-rose-400']: '#fb7185',
                                                        ['--color-gray-400']: '#9ca3af', ['--color-teal-400']: '#2dd4bf',
                                                        ['--color-teal-500']: '#14b8a6',
                                                    }}
                                                >
                                                    <div className={`${option.size} rounded-full`}></div>
                                                </motion.div>
                                            </label>
                                        );
                                    })}
                                </div>
                                <span className="font-semibold text-teal-600">Agree</span>
                            </div>


                            <hr className="my-4 border-gray-200" />

                            <AnimatePresence>
                                {unansweredIndex === index && (
                                    <motion.div
                                        className="text-red-600 text-sm flex items-center justify-center mt-3"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <AlertCircle size={14} className="mr-1.5" /> Please select an option.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    <div className="text-center pt-10">
                        <button
                            type="submit"
                            className="bg-transparent border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out shadow-lg flex items-center gap-2 mx-auto"
                        >
                            <Send size={20} />
                            Submit & See Results
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
