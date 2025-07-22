"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Streak from "@/components/Profile/streak";
import TaskHeatMap from "@/components/Profile/taskHeatmap";
import { LoaderCircle, FileText, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Card = ({ children, className = "" }) => (
    <motion.div
        variants={cardVariants}
        className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
        {children}
    </motion.div>
);

export default function DashboardContent({ user, loading }) {

    const [quote, setQuote] = useState({
        q: "Loading today's inspiration...",
        a: ""
    });

    useEffect(() => {
        const fetchDailyQuote = async () => {
            const today = new Date().toISOString().split('T')[0];
            const storedQuoteData = localStorage.getItem('dailyQuote');

            if (storedQuoteData) {
                const { date, data } = JSON.parse(storedQuoteData);
                if (date === today) {
                    setQuote(data);
                    return;
                }
            }

            try {
                const response = await axios.get('/api/quote')
                console.log("Fetched quote:", response.data);
                const newQuote = { q: response.data.q, a: response.data.a };
                setQuote(newQuote);
                localStorage.setItem('dailyQuote', JSON.stringify({ date: today, data: newQuote }));
            } catch (error) {
                console.error("Failed to fetch quote:", error);
                setQuote({ q: "The journey of a thousand miles begins with a single step.", a: "Lao Tzu" });
            }
        };

        fetchDailyQuote();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoaderCircle className="animate-spin text-sky-500" size={48} />
            </div>
        );
    }

    if (!user) {
        return <div className="text-center p-10 font-medium">Could not load user profile.</div>;
    }

    const renderSeverityTestContent = () => {
        if (user.mentalDisorders && user.mentalDisorders.length > 0) {
            return (
                <>
                    <p className="text-slate-600 mb-4">Track your progress by taking a severity test.</p>
                    <div className="space-y-2">
                        {user.mentalDisorders
                            .filter((disorder) => disorder.severity === null)
                            .map((disorder) => (
                                <Link key={disorder.disorderName} href={`/severity-tests/${disorder.disorderName}`} className="group flex items-center justify-between w-full text-left bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                    <span>{disorder.disorderName} Test</span>
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            ))}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <p className="text-slate-600 mb-4">Get a personalized plan by taking our questionnaire.</p>
                    <Link href="/questionnaire" className="group inline-flex items-center gap-2 font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                        <FileText size={18} />
                        <span>Take the Initial Test</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </>
            );
        }
    };

    return (
        <motion.div
            className="p-6 md:p-8"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <motion.h1
                className="text-3xl md:text-4xl font-bold text-slate-800 mb-8"
                variants={cardVariants}
            >
                Welcome back, <span className="text-sky-600">{user.username}</span>!
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-slate-700">Your Streak</h2>
                    <Streak streak={user.streak} />
                </Card>

                <Card>
                    <h2 className="text-xl font-semibold mb-2 text-slate-700">Your Next Step</h2>
                    {renderSeverityTestContent()}
                </Card>

                {/* 4. REPLACE THE STATIC QUOTE CARD WITH THE DYNAMIC ONE */}
                <Card className="flex flex-col items-center justify-center text-center bg-sky-50">
                    <h2 className="text-lg font-semibold mb-2 text-sky-800 italic">
                        “{quote.q}”
                    </h2>
                    {quote.a && <p className="text-sm text-sky-600 font-medium">— {quote.a}</p>}
                </Card>
            </div>

            <Card className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-slate-700">Your Activity</h2>
                <TaskHeatMap taskRecords={user.taskRecords} />
            </Card>
        </motion.div>
    );
}
