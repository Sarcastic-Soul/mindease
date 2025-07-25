"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "./questions.js";
import { FileQuestion, AlertCircle, Send } from "lucide-react";

// Configuration for options with sizing and colors
const options = [
    { label: "Disagree", points: 1, color: "rose-500", size: "w-7 h-7" },
    { label: "Slightly Disagree", points: 2, color: "rose-400", size: "w-5 h-5" },
    { label: "Neutral", points: 3, color: "gray-400", size: "w-4 h-4" },
    { label: "Slightly Agree", points: 4, color: "teal-400", size: "w-5 h-5" },
    { label: "Agree", points: 5, color: "teal-500", size: "w-7 h-7" },
];

const Questionnaire = () => {
    const router = useRouter();
    const [responses, setResponses] = useState({});
    const [unansweredIndex, setUnansweredIndex] = useState(-1);
    const questionRefs = useRef(questions.map(() => React.createRef()));

    const handleInputChange = (questionId, points) => {
        setResponses((prev) => ({ ...prev, [questionId]: points }));
        if (unansweredIndex !== -1) {
            setUnansweredIndex(-1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstUnanswered = questions.findIndex((q) => !responses[q.id]);

        if (firstUnanswered !== -1) {
            setUnansweredIndex(firstUnanswered);
            questionRefs.current[firstUnanswered].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        const disorderScores = questions.reduce((acc, q) => {
            const points = responses[q.id];
            if (points) {
                acc[q.disorder] = (acc[q.disorder] || 0) + points;
            }
            return acc;
        }, {});

        const topDisorders = Object.entries(disorderScores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([name]) => ({ name }));

        try {
            await axios.post("/api/users/submitQuestionnaire", { disorders: topDisorders });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting questionnaire", error);
        }
    };

    const progress = (Object.keys(responses).length / questions.length) * 100;

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
                    <FileQuestion className="mx-auto text-blue-600 mb-2" size={40} />
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                        Mental Wellness Questionnaire
                    </h1>
                    <p className="text-gray-500 mt-2">Answer honestly to get the most accurate insights.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {questions.map(({ id, question }, index) => (
                        <motion.div
                            key={id}
                            ref={questionRefs.current[index]}
                            className="rounded-xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            {/* Question Text */}
                            <p className="text-xl font-medium text-gray-700 mb-4">{question}</p>

                            {/* Options with Labels */}
                            <div className="flex items-center justify-center gap-4">
                                <span className="font-semibold text-rose-600">Disagree</span>
                                <div className="flex items-center justify-center gap-3 sm:gap-4">
                                    {options.map((option) => {
                                        const isSelected = responses[id] === option.points;
                                        return (
                                            <label key={option.points} className="relative cursor-pointer" title={option.label}>
                                                <input
                                                    type="radio"
                                                    name={`question-${id}`}
                                                    checked={isSelected}
                                                    onChange={() => handleInputChange(id, option.points)}
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
};

export default Questionnaire;
