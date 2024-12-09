"use client";

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import disorders from './disordersData';

export default function DisordersCarousel() {
    const [selectedDisorder, setSelectedDisorder] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const cardsPerView = 3;

    const isPrevDisabled = currentSlide === 0;
    const isNextDisabled = currentSlide >= disorders.length - cardsPerView;

    const handlePrev = () => {
        if (!isPrevDisabled) {
            setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
        }
    };

    const handleNext = () => {
        if (!isNextDisabled) {
            setCurrentSlide((prev) => (prev < disorders.length - cardsPerView ? prev + 1 : prev));
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-200 to-blue-300 text-gray-800 min-h-screen p-8 relative">
            <h1 className="text-3xl font-bold mb-6 text-center">Explore Mental Health Disorders</h1>

            {/* Carousel Container */}
            <div className="relative flex items-center justify-center">
                <button
                    onClick={handlePrev}
                    className={`absolute left-0 bg-transparent hover:bg-white rounded-full z-10 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isPrevDisabled}
                >
                    <ChevronLeftIcon className="h-10 w-10" />
                </button>

                <div className="overflow-hidden w-full max-w-5xl">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
                    >
                        {disorders.map((disorder, index) => (
                            <div key={index} className="flex-none w-1/3 px-4">
                                <div
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-60 flex flex-col justify-between"
                                    onClick={() => setSelectedDisorder(disorder)}
                                >
                                    <h2 className="text-xl font-semibold text-blue-600">{disorder.name}</h2>
                                    <p className="mt-2 text-gray-600 line-clamp-3">{disorder.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className={`absolute right-0 bg-transparent hover:bg-white rounded-full z-10 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isNextDisabled}
                >
                    <ChevronRightIcon className="h-10 w-10" />
                </button>
            </div>

            {/* Disorder Detail Modal */}
            {selectedDisorder && (
                <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50`}>
                    <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg shadow-lg w-4/5 max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
                        <button
                            className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setSelectedDisorder(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-blue-600">{selectedDisorder.name}</h2>
                        <p className="mt-4">{selectedDisorder.description}</p>
                        <h3 className="mt-6 text-xl font-semibold">Prevalence</h3>
                        <p>{selectedDisorder.prevalence}</p>
                        <h3 className="mt-6 text-xl font-semibold">Typical Age Group</h3>
                        <p>{selectedDisorder.ageGroup}</p>
                        <h3 className="mt-6 text-xl font-semibold">Symptoms</h3>
                        <ul className="list-disc list-inside">
                            {selectedDisorder.symptoms.map((symptom, idx) => (
                                <li key={idx}>{symptom}</li>
                            ))}
                        </ul>
                        <h3 className="mt-6 text-xl font-semibold">Problems Faced</h3>
                        <ul className="list-disc list-inside">
                            {selectedDisorder.problems.map((problem, idx) => (
                                <li key={idx}>{problem}</li>
                            ))}
                        </ul>
                        <h3 className="mt-6 text-xl font-semibold">Methods of Cure</h3>
                        <ul className="list-disc list-inside">
                            {selectedDisorder.cureMethods.map((method, idx) => (
                                <li key={idx}>{method}</li>
                            ))}
                        </ul>
                        <h3 className="mt-6 text-xl font-semibold">Popular People with Disorder</h3>
                        <ul className="list-disc list-inside">
                            {selectedDisorder.popularPeople.map((person, idx) => (
                                <li key={idx}>{person}</li>
                            ))}
                        </ul>
                        <h3 className="mt-6 text-xl font-semibold">Further Reading</h3>
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
