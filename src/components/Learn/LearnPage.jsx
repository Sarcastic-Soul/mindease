"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Carousel from "./Carousel";
import disordersData1 from "./disordersData1";
import disordersData2 from "./disordersData2";

export default function LearnPage() {
    return (
        <div className="w-full min-h-full p-4 sm:p-6 md:p-8 bg-gray-50 text-gray-800">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center">
                    <BookOpen className="text-amber-500 mr-4" size={32} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Learn About Mental Wellness</h1>
                        <p className="text-gray-500">Explore disorders, their symptoms, and paths to recovery.</p>
                    </div>
                </div>
            </motion.div>

            {/* Carousels Section */}
            <div className="space-y-16">
                <Carousel title="Common Mood & Anxiety Disorders" data={disordersData1} />
                <Carousel title="Behavioral & Developmental Disorders" data={disordersData2} />
            </div>
        </div>
    );
}
