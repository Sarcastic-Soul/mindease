"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import disorders from "./disordersData";
import additionalDisorders from "./additionalDisorders";

function Carousel({ data }) {
    const [selectedDisorder, setSelectedDisorder] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const cardsPerView = 3;

    const isPrevDisabled = currentSlide === 0;
    const isNextDisabled = currentSlide >= data.length - cardsPerView;

    const handlePrev = () => {
        if (!isPrevDisabled) {
            setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
    };

    const handleNext = () => {
        if (!isNextDisabled) {
            setCurrentSlide((prev) => Math.min(prev + 1, data.length - cardsPerView));
        }
    };

    return (
        <div className="relative flex items-center justify-center py-8">
            <button
                onClick={handlePrev}
                className={`absolute left-0 bg-white hover:bg-blue-100 shadow-md rounded-full z-10 p-2 ${isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={isPrevDisabled}
            >
                <ChevronLeftIcon className="h-8 w-8 text-blue-600" />
            </button>

            <div className="overflow-hidden w-full max-w-5xl">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
                >
                    {data.map((disorder, index) => (
                        <div key={index} className="flex-none w-1/3 px-4">
                            <div
                                className="bg-gradient-to-r from-white to-blue-50 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-72 flex flex-col items-center justify-between"
                                onClick={() => setSelectedDisorder(disorder)}
                            >
                                <div className="w-full h-32 rounded-lg overflow-hidden">
                                    <img
                                        src={disorder.image}
                                        alt={`${disorder.name} image`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <h2 className="text-lg font-bold text-blue-700">{disorder.name}</h2>
                                    <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                        {disorder.description}
                                    </p>
                                </div>
                                <button
                                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleNext}
                className={`absolute right-0 bg-white hover:bg-blue-100 shadow-md rounded-full z-10 p-2 ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={isNextDisabled}
            >
                <ChevronRightIcon className="h-8 w-8 text-blue-600" />
            </button>

            {/* Disorder Detail Modal */}
            {selectedDisorder && (
                <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50`}>
                    <div className="relative bg-blue-100 p-8 rounded-lg shadow-lg w-4/5 max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
                        <button
                            className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setSelectedDisorder(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">{selectedDisorder.name}</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold">Description</h3>
                                <p className="mt-2">{selectedDisorder.description}</p>
                                <h3 className="mt-4 text-xl font-semibold">Prevalence</h3>
                                <p>{selectedDisorder.prevalence}</p>
                                <h3 className="mt-4 text-xl font-semibold">Typical Age Group</h3>
                                <p>{selectedDisorder.ageGroup}</p>
                                <div className="mt-4 rounded-lg overflow-hidden shadow-md">
                                    <img
                                        src={selectedDisorder.image}
                                        alt={`${selectedDisorder.name} visual`}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold">Symptoms</h3>
                                <ul className="list-disc list-inside">
                                    {selectedDisorder.symptoms.map((symptom, idx) => (
                                        <li key={idx}>{symptom}</li>
                                    ))}
                                </ul>
                                <h3 className="mt-4 text-xl font-semibold">Problems Faced</h3>
                                <ul className="list-disc list-inside">
                                    {selectedDisorder.problems.map((problem, idx) => (
                                        <li key={idx}>{problem}</li>
                                    ))}
                                </ul>
                                <h3 className="mt-4 text-xl font-semibold">Methods of Cure</h3>
                                <ul className="list-disc list-inside">
                                    {selectedDisorder.cureMethods.map((method, idx) => (
                                        <li key={idx}>{method}</li>
                                    ))}
                                </ul>
                                <h3 className="mt-4 text-xl font-semibold">Popular People with Disorder</h3>
                                <ul className="list-disc list-inside">
                                    {selectedDisorder.popularPeople.map((person, idx) => (
                                        <li key={idx}>{person}</li>
                                    ))}
                                </ul>
                                <h3 className="mt-4 text-xl font-semibold">Further Reading</h3>
                                <ul className="list-disc list-inside">
                                    {selectedDisorder.resources.map((resource, idx) => (
                                        <li key={idx}>
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {resource.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease forwards;
                }
            `}</style>
        </div>
    );
}

export default function DisordersCarousel() {
    return (
        <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-gray-800 min-h-screen p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-opacity-20 bg-cover bg-center z-[-1]" style={{ backgroundImage: 'url("/images/back1.png")' }}></div>
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r text-shadow-md p-2 rounded-lg">Explore Mental Health Disorders</h1>
            <Carousel data={disorders} />
            <Carousel data={additionalDisorders} />
        </div>
    );
}
