// "use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Assuming 'sonner' for toasts
import axios from "axios";
import Link from "next/link";
import { LoaderCircle, CheckCircle2, Circle, Trophy, CheckCircle, FileQuestion } from "lucide-react";

// This is the provided list of tasks for each disorder.
const tasksByDisorder = {
    Depression: [
        "List 3 things you're grateful for.", "Do 10-15 minutes of exercise.", "Set one small, achievable goal.",
        "Follow a simple daily routine.", "Reach out to a friend or family member.", "Take a walk outside for 20 minutes.",
        "Try a new hobby or activity.", "Listen to calming music for 10 minutes.", "Focus on a positive affirmation.",
        "Write down one accomplishment from today."
    ],
    Bipolar: [
        "Write in your mood journal.", "Meditate for 5-10 minutes.", "Stick to a regular sleep schedule.",
        "Avoid caffeine and alcohol.", "Watch for early signs of mood shifts.", "Create a mood tracker to monitor fluctuations.",
        "Engage in a calming activity like coloring.", "Spend time outdoors for sunlight exposure.", "Talk to a therapist about your emotions.",
        "Set a reminder to check in with your emotions."
    ],
    PTSD: [
        "Spend time in your safe space.", "Practice a grounding exercise.", "Set boundaries to avoid triggers.",
        "Try deep breathing or guided relaxation.", "Join a support group or community.", "Keep a journal of your experiences and feelings.",
        "Do a sensory activity (e.g., play with textured items).", "Practice self-compassion by affirming your worth.",
        "Use calming scents or oils like lavender.", "Engage in a physical activity to release stress."
    ],
    ADHD: [
        "Use a planner or to-do list.", "Break tasks into small steps.", "Set a timer for focused work sessions.",
        "Do a quick breathing exercise.", "Place visual reminders in key spots.", "Use color coding or labels for organization.",
        "Set up a dedicated work or study space.", "Take short breaks every 20-30 minutes.", "Prioritize tasks by importance.",
        "Use a reward system for completing tasks."
    ],
    Schizophrenia: [
        "Create a daily routine.", "Do a relaxation activity.", "Limit screen time before bed.",
        "Express yourself through art or music.", "Spend time with trusted friends or family.", "Engage in calming activities like reading or puzzles.",
        "Join a support group or therapy sessions.", "Practice mindfulness to stay grounded in the present.",
        "Take medications as prescribed and talk to your doctor.", "Track your symptoms and discuss them with a therapist."
    ],
    EatingDisorder: [
        "Practice mindful eating.", "Journal emotions and triggers.", "Replace negative thoughts with positives.",
        "Follow a structured meal plan.", "Do a non-food-related activity you enjoy.", "Set healthy, achievable food goals.",
        "Learn about intuitive eating practices.", "Avoid weighing yourself daily.", "Reach out to a support group or therapist.",
        "Practice self-care activities like a bath or stretching."
    ],
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// Helper function to normalize a date to the start of the day in UTC (for comparison)
const normalizeDateToUTCStartOfDay = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0); // Set to 00:00:00.000 UTC
    return d;
};


export default function TasksPage({ user, loading, fetchUser }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user && !loading) {
            // Check if tasks exist and if they are from today
            const today = normalizeDateToUTCStartOfDay(new Date());
            const firstTaskDate = user.currentTasks && user.currentTasks.length > 0
                ? normalizeDateToUTCStartOfDay(user.currentTasks[0].date)
                : null;

            if (!user.currentTasks || user.currentTasks.length === 0 || firstTaskDate?.getTime() !== today.getTime()) {
                // Tasks are empty or outdated, generate new ones
                generateAndAssignTasks();
            } else {
                // Tasks are up-to-date, set them
                setTasks(user.currentTasks);
            }
        }
    }, [user, loading]); // Depend on user and loading to re-evaluate when they change


    const generateAndAssignTasks = async () => {
        if (!user || !user.mentalDisorders || user.mentalDisorders.length === 0) {
            console.log("No disorders or user data to generate tasks.");
            setTasks([]); // Clear tasks if no disorders
            return;
        }

        let dailyTasks = [];
        const todayDateString = new Date().toISOString(); // Use ISO string to pass to backend

        user.mentalDisorders.forEach(disorder => {
            if (disorder.severity !== null) { // Ensure severity is set
                const availableTasks = tasksByDisorder[disorder.disorderName] || [];
                let numTasks;
                if (disorder.severity < 40) numTasks = 2;
                else if (disorder.severity <= 70) numTasks = 3;
                else numTasks = 4;

                const selectedTasks = shuffleArray([...availableTasks]).slice(0, numTasks);

                selectedTasks.forEach(description => {
                    dailyTasks.push({
                        // Using a unique taskID might be tricky if you intend to reuse descriptions.
                        // For simplicity, I'm combining disorderName, timestamp, and a random number.
                        // This taskID will be used by the backend to identify the subdocument.
                        taskID: `${disorder.disorderName}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                        title: description,
                        isCompleted: false, // Newly generated tasks are always incomplete
                        date: todayDateString, // Assign today's date
                        disorder: disorder.disorderName // To display which disorder it belongs to
                    });
                });
            }
        });

        if (dailyTasks.length > 0) {
            try {
                // Send new tasks to the backend to replace currentTasks
                const res = await axios.post('/api/users/assign-tasks', { userId: user._id, tasks: dailyTasks });
                setTasks(res.data.user.currentTasks); // Update local state with tasks from backend
                toast.success("New daily tasks assigned!");
            } catch (error) {
                console.error("Failed to assign new tasks:", error);
                toast.error("Could not generate your daily tasks.");
            }
        } else {
             setTasks([]); // If no tasks were generated (e.g., no disorders with severity)
        }
    };


    const handleTaskToggle = async (task, currentIsCompleted) => {
        // Optimistic UI update:
        const updatedTasksOptimistic = tasks.map(t =>
            t._id === task._id ? { ...t, isCompleted: !currentIsCompleted } : t
        );
        setTasks(updatedTasksOptimistic);

        try {
            const res = await axios.post("/api/users/complete-task", { // Use the new combined endpoint
                userId: user._id,
                taskId: task.taskID, // Send task.taskID for identification
                isCompleted: !currentIsCompleted // Send the new desired status
            });

            if (res.data.success) {
                toast.success(res.data.message);
                // After successful update on backend, re-fetch user data to ensure all client-side
                // state (tasks, streak, taskRecords) is synchronized with the database.
                fetchUser();
            } else {
                // Revert optimistic update if API call fails
                setTasks(tasks);
                toast.error(res.data.message || "Failed to update task.");
            }

        } catch (error) {
            // Revert optimistic update on error
            setTasks(tasks);
            console.error("Error toggling task:", error);
            toast.error(error.response?.data?.message || "Failed to update task. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center bg-gray-50">
                <LoaderCircle className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    const hasDisorders = user?.mentalDisorders && user.mentalDisorders.length > 0;

    return (
        <div className="w-full min-h-full p-4 sm:p-6 md:p-8 bg-gray-50 text-gray-800">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-4" size={32} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Your Daily Tasks</h1>
                        <p className="text-gray-500">Complete these tasks to build healthy habits.</p>
                    </div>
                </div>
            </motion.div>

            {!hasDisorders ? (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <FileQuestion className="mx-auto text-blue-500 mb-4" size={48} />
                    <h2 className="text-xl font-semibold text-gray-700">Get Your Personalized Plan</h2>
                    <p className="text-gray-500 mt-2">Take our initial questionnaire to receive daily tasks tailored to your needs.</p>
                    <Link href="/questionnaire" className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
                        Take Questionnaire
                    </Link>
                </div>
            ) : (tasks.length > 0 && tasks.some(t => !t.isCompleted)) ? ( // Show if there are tasks and at least one is not completed
                 <motion.div className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div key={task._id} layout variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                onClick={() => handleTaskToggle(task, task.isCompleted)}
                                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                    task.isCompleted ? "bg-green-100 text-gray-500 line-through" : "bg-white shadow-sm hover:shadow-lg hover:border-blue-300 border border-transparent"
                                }`}
                            >
                                {task.isCompleted ? <CheckCircle2 className="text-green-500 mr-4 flex-shrink-0" size={24} /> : <Circle className="text-gray-400 mr-4 flex-shrink-0" size={24} />}
                                <div className="flex-grow">
                                    <p className={`font-medium ${task.isCompleted ? "" : "text-gray-800"}`}>
                                        {task.title}
                                    </p>
                                    {task.disorder && ( // Display disorder tag if available
                                        <span className="text-xs font-semibold uppercase text-blue-600 bg-blue-100 py-0.5 px-2 rounded-full mt-1 inline-block">
                                            {task.disorder}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (tasks.length > 0 && tasks.every(t => t.isCompleted)) ? ( // All tasks completed for today
                <div className="text-center py-16 px-6 bg-green-50 rounded-lg shadow-sm border border-green-200">
                    <Trophy className="mx-auto text-amber-500 mb-4" size={48} />
                    <h2 className="text-xl font-semibold text-green-700">All Tasks Completed for Today!</h2>
                    <p className="text-gray-600 mt-2">Great job! Check back tomorrow for new tasks and to continue your streak.</p>
                </div>
            ) : ( // No tasks generated for today, but user has disorders
                 <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700">No Daily Tasks for You Today</h2>
                    <p className="text-gray-500 mt-2">It looks like we couldn't generate tasks for your current disorder setup, or you've completed them all.</p>
                    {/* Optional: Add a button to manually try generating tasks if this state is unexpected */}
                </div>
            )}
        </div>
    );
}
