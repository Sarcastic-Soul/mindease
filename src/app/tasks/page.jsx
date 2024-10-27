// Tasks/page.jsx
"use client"

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const tasksList = [
  "Complete morning meditation",
  "Attend team meeting",
  "Work on project report",
  "Exercise for 30 minutes",
  "Read a chapter of a book",
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(tasksList.map(task => ({ task, completed: false })));
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Handle toggling task completion
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Calculate remaining tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const tasksLeft = totalTasks - completedTasks;
  const progress = (completedTasks / totalTasks) * 100;

  useEffect(() => {
    if (completedTasks === totalTasks) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [completedTasks, totalTasks]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">My Daily Tasks</h1>
      
      <div className="w-full max-w-lg">
      {tasks.map((task, index) => (
          <div
            key={index}
            onClick={() => toggleTask(index)}
            className={`flex items-center justify-between p-4 mb-4 rounded-lg cursor-pointer transition ${
              task.completed ? "bg-green-500" : "bg-gray-800"
            }`}
          >
            <span
              className={`text-lg ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.task}
            </span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)} 
              className="w-5 h-5 pointer-events-none"
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg mt-6">
        <div className="flex justify-between mb-2 text-sm">
          <span>Tasks left: {tasksLeft}</span>
          <span>{completedTasks}/{totalTasks} tasks completed</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-500 h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
        />
      )} 
    </div>
  );
}
