"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardContent from "@/components/Dashboard/DashboardContent";
import TasksPage from "@/components/Tasks/TasksPage";
import MeditationPage from "@/components/Meditation/MeditationPage";
import LearnPage from "@/components/Learn/LearnPage";
import CommunityPage from "@/components/Community/CommunityPage";
import { LoaderCircle } from "lucide-react";
import GeminiPal from "@/components/Chat/GeminiPal";

// A small wrapper component to use the search params hook
function DashboardView() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialView = searchParams.get("tab") || "dashboard";

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeView, setActiveView] = useState(initialView);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get("/api/users/profile");
            setUser(res.data.data);
        } catch (error) {
            console.error("Error fetching profile:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSetView = (view) => {
        setActiveView(view);
        router.push(`/dashboard?tab=${view}`, { scroll: false });
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <LoaderCircle className="animate-spin text-blue-500" size={48} />
                </div>
            );
        }
        switch (activeView) {
            case "dashboard":
                return <DashboardContent user={user} loading={loading} />;
            case "tasks":
                return <TasksPage user={user} loading={loading} fetchUser={fetchUser} />;
            case "meditation":
                return <MeditationPage />;
            case "learn":
                return <LearnPage />;
            case "community":
                return <CommunityPage />;
            case "chat":
                return <GeminiPal user={user} />;
            default:
                return <DashboardContent user={user} loading={loading} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                activeView={activeView}
                setActiveView={handleSetView}
                user={user}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
}

// The main export now wraps the page in a Suspense boundary
export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><LoaderCircle className="animate-spin text-blue-500" size={48} /></div>}>
            <DashboardView />
        </Suspense>
    )
}
