"use client";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

const ChatBubble = ({ role, content }) => {
    const isUser = role === 'user';
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`px-4 py-3 rounded-2xl max-w-lg lg:max-w-xl ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                {content}
            </div>
        </motion.div>
    );
};

export default function GeminiPal({ user }) {
    const [messages, setMessages] = useState([
        { role: 'model', content: `Hello ${user?.username || ''}! I'm Aura, your personal AI companion. How are you feeling today?` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const history = newMessages.slice(-10);

            const response = await axios.post('/api/chat', {
                history: history.slice(0, -1),
                message: input,
                userContext: user
            });

            const modelMessage = { role: 'model', content: response.data.text };
            setMessages([...newMessages, modelMessage]);

        } catch (error) {
            console.error("Failed to get response from Gemini:", error);
            const errorMessage = { role: 'model', content: "I'm having a little trouble connecting right now. Let's try again in a moment." };
            setMessages([...newMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // <-- CHANGED: Removed card styles (bg, shadow, border) and max-height to fill the parent container.
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                        <Sparkles className="text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Aura</h2>
                        {/* <-- REMOVED: "Online" status text */}
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <ChatBubble key={index} role={msg.role} content={msg.content} />
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="px-4 py-3 rounded-2xl bg-gray-200">
                            <BeatLoader size={8} color="#6B7280" />
                         </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-blue-500 text-white rounded-full disabled:bg-blue-300 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
