"use client";
import disordersData1 from "./disordersData1";
import disordersData2 from "./disordersData2";
import Carousel from "./carousel";
export default function DisordersCarousel() {
    return (
        <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-gray-800 min-h-screen p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-opacity-20 bg-cover bg-center z-[-1]" style={{ backgroundImage: 'url("/images/back1.png")' }}></div>
            <h1 className="text-4xl font-bold mb-6 text-center text-shadow-md p-2 rounded-lg">Explore Mental Health Disorders</h1>
            <Carousel data={disordersData1} />
            <Carousel data={disordersData2} />
        </div>
    );
}
