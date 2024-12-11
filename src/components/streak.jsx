import { FireIcon } from "@heroicons/react/solid";

const StreakComponent = ({ streak }) => {
    const streakCount = Math.max(streak, 0);

    return (
        <div className="flex items-center ">
            <span className="text-lg font-semibold text-gray-800">Streak: {streakCount}</span>
            <FireIcon className="h-8 w-8 text-red-600" />
        </div>
    );
};

export default StreakComponent;
