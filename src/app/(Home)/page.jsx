"use client"
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '@/components/Home/FAQ';
import { BookMarked, BotMessageSquare, CircleCheck, ClockPlus, Users } from 'lucide-react';


export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 via-white to-blue-100 text-gray-800 font-sans">
            <Link href="/" className="absolute top-4 left-10 z-20 flex items-center space-x-2">
                <Image
                    src="/logo.svg"
                    alt="MindEase Logo"
                    width={100}
                    height={100}
                />
            </Link>

            {/* Hero Section */}
            <main className="relative flex items-center justify-center h-screen overflow-hidden">
                <Image
                    src="/back2.png"
                    alt="Calming Background"
                    fill
                    style={{ objectFit: "cover" }}
                    className="opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-blue-900 relative">
                        Find Peace with{' '}
                        <span className="animated-gradient bg-clip-text text-transparent">MindEase</span>
                    </h2>
                    <p className="text-lg md:text-2xl max-w-2xl mx-auto text-blue-700">
                        Diagnose, understand, and manage your mental health with MindEase’s supportive, data-driven approach.
                    </p>
                    <div className="flex space-x-8"> {/* Increased space between buttons */}
                        <Link href="/auth/signup">
                            <button className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-4 rounded-full font-semibold text-white transition duration-300">
                                Signup
                            </button>
                        </Link>
                        <Link href="/auth/login">
                            <button className="bg-white border border-blue-500 text-lg px-8 py-4 rounded-full font-semibold text-blue-500 hover:bg-blue-100 transition duration-300">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-3xl font-semibold mb-10 text-gray-800">What We Offer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />

            {/* Footer */}
            <footer className="bg-white py-8 text-gray-500">
                <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
                    <p className="text-gray-700 font-medium">&copy; {new Date().getFullYear()} MindEase</p>
                    <nav className="flex justify-center space-x-8 text-sm">
                        <Link href="/about" className="hover:text-gray-700">About</Link>
                        <Link href="/contact-us" className="hover:text-gray-700">Contact</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

const features = [
    {
        title: "Personalized Diagnostic Tools",
        description: "Gain insights into your mental health through customized diagnostic questionnaires tailored to your symptoms.",
        icon: <CircleCheck className="h-12 w-12 text-teal-500" />,
    },
    {
        title: "Supportive Community",
        description: "Connect with others facing similar challenges and share your journey in a supportive, empathetic environment.",
        icon: <Users className="h-12 w-12 text-blue-500" />,
    },
    {
        title: "Progress Tracking",
        description: "Monitor your mental health progress over time, and see how treatments and habits impact your well-being.",
        icon: <ClockPlus className="h-12 w-12 text-green-500" />,
    },
    {
        title: "AI-Powered Chat Support",
        description: "Speak with our AI chatbot for immediate mental health guidance, tips, and resources whenever you need them.",
        icon: <BotMessageSquare className="h-12 w-12 text-purple-500" />,
    },
    {
        title: "Learning Hub",
        description: "Explore detailed information on mental health disorders, coping strategies, and self-care practices.",
        icon: <BookMarked className="h-12 w-12 text-orange-500" />,
    },
];
