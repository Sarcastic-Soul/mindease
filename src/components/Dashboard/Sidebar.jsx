"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
    LogOut,
    User,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    CheckCircle,
    BrainCircuit,
    BookOpen,
    Users,
    Sparkles,
    BotMessageSquare
} from "lucide-react";
import Image from "next/image";


const Sidebar = ({ isCollapsed, setIsCollapsed, activeView, setActiveView, user }) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            console.log(res);
            toast.success("Logged out successfully");
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed", error.message);
            toast.error("Logout failed. Please try again.");
        }
    };

    // --- Theming & Navigation Items ---
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "bg-blue-500" },
        { id: "tasks", label: "Tasks", icon: CheckCircle, color: "bg-green-500" },
        { id: "meditation", label: "Meditate", icon: BrainCircuit, color: "bg-purple-500" },
        { id: "learn", label: "Learn", icon: BookOpen, color: "bg-amber-500" },
        { id: "community", label: "Community", icon: Users, color: "bg-pink-500" },
        { id: "chat", label: "Chat", icon: BotMessageSquare, color: "bg-teal-500" },
    ];
    // --- End of Theming ---

    return (
        <aside
            className={`relative bg-gray-50 border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Header section of the sidebar */}
            <div className={`flex items-center p-4 border-b border-gray-200 h-20 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                <Sparkles className="text-blue-600 flex-shrink-0" size={isCollapsed ? 28 : 24} />
                <h1 className={`text-xl font-bold text-blue-600 overflow-hidden whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-3'}`}>
                    MindEase
                </h1>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-7 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow-md border border-gray-200 text-gray-600 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Main navigation section */}
            <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            title={isCollapsed ? item.label : ''}
                            className={`w-full flex items-center p-3 rounded-lg transition-colors relative ${isActive
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                } ${isCollapsed ? "justify-center" : ""}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-sidebar-pill"
                                    className={`absolute left-0 top-2 bottom-2 w-1 ${item.color}`}
                                    style={{ borderRadius: '0 4px 4px 0' }}
                                />
                            )}
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className={`ml-4 text-sm whitespace-nowrap overflow-hidden transition-opacity duration-200 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* Footer section with user profile and logout */}
            <div className="px-3 py-4 border-t border-gray-200">
                <div className={`flex items-center p-2 mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
                    {user && (
                        <div className="w-10 h-10 rounded-full flex-shrink-0 relative">
                            {user.avatarUrl ? (
                                <Image src={user.avatarUrl} alt={user.username} fill className="rounded-full object-cover" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 border-2 border-blue-200">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    )}
                    {!isCollapsed && user && (
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-semibold text-gray-700 truncate">{user.username}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    )}
                </div>
                <motion.button
                    onClick={() => router.push('/profile')}
                    title={isCollapsed ? 'Profile' : ''}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-800 ${isCollapsed ? "justify-center" : ""}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <User className="h-5 w-5 flex-shrink-0" />
                    <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden ${isCollapsed ? "hidden" : "block"}`}>Profile</span>
                </motion.button>
                <motion.button
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : ''}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors text-red-500 hover:bg-red-50 hover:text-red-600 ${isCollapsed ? "justify-center" : ""}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className={`ml-4 text-sm font-medium whitespace-nowrap overflow-hidden ${isCollapsed ? "hidden" : "block"}`}>Logout</span>
                </motion.button>
            </div>
        </aside>
    );
};

export default Sidebar;
