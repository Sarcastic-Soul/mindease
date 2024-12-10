import { useRouter } from "next/navigation";
import { CheckCircleIcon, BookOpenIcon, EmojiHappyIcon, UsersIcon } from "@heroicons/react/outline";

const Sidebar = () => {
    const router = useRouter();

    return (
        <aside className="w-64 p-4 h-full">
            <h2 className="text-2xl font-bold mb-6 text-black">Dashboard</h2>
            <nav>
                <ul>
                    <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
                        <CheckCircleIcon className="w-5 h-5 text-purple-500 mr-2" />
                        <button
                            className="text-blue-600"
                            onClick={() => router.push("/tasks")}
                        >
                            Tasks
                        </button>
                    </li>
                    <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
                        <BookOpenIcon className="w-5 h-5 text-green-500 mr-2" />
                        <button
                            className="text-blue-600"
                            onClick={() => router.push("/learn")}
                        >
                            Learn
                        </button>
                    </li>
                    <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
                        <EmojiHappyIcon className="w-5 h-5 text-rose-500 mr-2" />
                        <button
                            className="text-blue-600"
                            onClick={() => router.push("/meditation")}
                        >
                            Meditation
                        </button>
                    </li>
                    <li className="mb-4 flex items-center p-2 rounded-lg bg-white hover:bg-blue-50 transition duration-300 shadow-md hover:shadow-lg">
                        <UsersIcon className="w-5 h-5 text-cyan-500 mr-2" />
                        <button
                            className="text-blue-600"
                            onClick={() => router.push("/community")}
                        >
                            Community
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
