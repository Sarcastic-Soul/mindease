import { StarIcon } from "@heroicons/react/solid";

const StreakComponent = ({ streak }) => {
    const streakCount = Math.max(streak, 0);

    return (
        <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">Streak: {streakCount}</span>
            <div className="flex gap-1">
                {Array.from({ length: streakCount }).map((_, index) => (
                    <StarIcon
                        key={index}
                        className="h-6 w-6 text-amber-500 animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
};

export default StreakComponent;
