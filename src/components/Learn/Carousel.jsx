"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Info, Users, Activity, Stethoscope, BookText, Link as LinkIcon } from "lucide-react";

// --- Modern Card Component ---
const Card = ({ disorder, onClick }) => (
    <motion.div
        layout
        className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2.5"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div onClick={onClick} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-400 h-full flex flex-col cursor-pointer overflow-hidden group">
            <div className="relative w-full h-48">
                <img src={disorder.image} alt={disorder.name} className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-0 left-0 p-4 text-xl font-bold text-white">
                    {disorder.name}
                </h3>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                    {disorder.description}
                </p>
                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 self-start flex items-center gap-2">
                    View Details <ChevronRight size={16} />
                </button>
            </div>
        </div>
    </motion.div>
);

// --- Modern Modal Component ---
const Modal = ({ disorder, onClose }) => {
    const detailItems = [
        { icon: Info, label: "Prevalence", value: disorder.prevalence },
        { icon: Users, label: "Typical Age Group", value: disorder.ageGroup },
    ];
    const listItems = [
        { icon: Activity, label: "Symptoms", value: disorder.symptoms },
        { icon: Stethoscope, label: "Methods of Cure", value: disorder.cureMethods },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:bg-gray-200/50 rounded-full p-2 transition-colors z-10">
                    <X size={24} />
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Image and Key Details) */}
                    <div className="lg:w-1/3">
                        <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                            <img src={disorder.image} alt={disorder.name} className="w-full h-56 object-cover" />
                        </div>
                        {detailItems.map(item => (
                            <div key={item.label} className="flex items-start gap-3 mb-4">
                                <item.icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.label}</h3>
                                    <p className="text-gray-600 text-sm">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column (Detailed Info) */}
                    <div className="lg:w-2/3">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{disorder.name}</h2>
                        <p className="text-gray-600 mb-6">{disorder.description}</p>

                        {listItems.map(item => (
                            <div key={item.label} className="mb-5">
                                <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2"><item.icon className="w-5 h-5 text-blue-600"/>{item.label}</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1.5 pl-2">
                                    {item.value.map((v, i) => <li key={i}>{v}</li>)}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2"><BookText className="w-5 h-5 text-blue-600"/>Further Reading</h3>
                            <ul className="space-y-2">
                                {disorder.resources.map((r, i) => (
                                    <li key={i}>
                                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                                            <LinkIcon size={16}/> {r.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
};


// --- Main Carousel Component ---
export default function Carousel({ title, data }) {
    const [selectedDisorder, setSelectedDisorder] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const cardsPerView = 4; // Adjusted for a denser, more modern look

    const handlePrev = () => setCurrentSlide((p) => Math.max(p - 1, 0));
    const handleNext = () => setCurrentSlide((p) => Math.min(p + 1, data.length - cardsPerView));

    return (
        <div>
            <div className="flex justify-between items-center mb-4 px-2.5">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <div className="flex gap-2">
                    <button onClick={handlePrev} disabled={currentSlide === 0} className="bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button onClick={handleNext} disabled={currentSlide >= data.length - cardsPerView} className="bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition">
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden">
                <motion.div
                    className="flex"
                    animate={{ x: `-${currentSlide * (100 / cardsPerView)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 35 }}
                >
                    {data.map((disorder) => (
                        <Card key={disorder.name} disorder={disorder} onClick={() => setSelectedDisorder(disorder)} />
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedDisorder && (
                    <Modal disorder={selectedDisorder} onClose={() => setSelectedDisorder(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
