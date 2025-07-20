import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How does MindEase work?",
        answer: "MindEase helps you improve your mental health by providing personalized resources, a supportive community, and tracking features.",
    },
    {
        question: "Is my data private?",
        answer: "Yes, we prioritize your privacy and ensure that your data is securely stored and only accessible to you.",
    },
    {
        question: "Can I talk to a mental health expert?",
        answer: "MindEase offers guidance and tools for mental wellness. For professional help, we recommend consulting a licensed therapist.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-blue-100 to-white">
            <div className="max-w-5xl mx-auto text-center">
                <h3 className="text-3xl font-semibold mb-10 text-gray-800">Frequently Asked Questions</h3>
                <div className="space-y-6 text-left">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-2xl">
                            <div
                                className="p-6 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h4 className="text-lg font-semibold text-blue-900">{faq.question}</h4>
                                <ChevronDown
                                    className={`h-6 w-6 text-blue-600 transition-transform duration-500 ${openIndex === index ? 'transform rotate-180' : ''
                                        }`}
                                />
                            </div>
                            <div
                                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'
                                    }`}
                            >
                                <p className="p-6 text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
