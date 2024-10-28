"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const questions = [
  { id: 1, question: "In the last two weeks, have you felt down, depressed, or hopeless most of the day?", disorder: "Depression" },
  { id: 2, question: "Have you lost interest or pleasure in activities you used to enjoy?", disorder: "Depression" },
  { id: 3, question: "Do you often feel tired or have little energy?", disorder: "Depression" },

  { id: 4, question: "Have you ever experienced mood swings from very high to very low?", disorder: "Bipolar" },
  { id: 5, question: "Have you had periods where you needed less sleep and still felt full of energy?", disorder: "Bipolar" },
  { id: 6, question: "Have you ever felt more self-confident than usual, leading to risky behaviors?", disorder: "Bipolar" },

  { id: 7, question: "Do you frequently have unwanted, distressing memories or nightmares about a traumatic event?", disorder: "PTSD" },
  { id: 8, question: "Do you try to avoid thoughts, feelings, or places that remind you of the event?", disorder: "PTSD" },
  { id: 9, question: "Do you feel constantly on edge, easily startled, or hyper-vigilant?", disorder: "PTSD" },

  { id: 10, question: "Do you often find it difficult to stay focused on tasks or activities?", disorder: "ADHD" },
  { id: 11, question: "Are you easily distracted by external stimuli or unrelated thoughts?", disorder: "ADHD" },
  { id: 12, question: "Do you often feel restless or fidgety?", disorder: "ADHD" },

  { id: 13, question: "Have you ever experienced hearing voices or seeing things others don't see?", disorder: "Schizophrenia" },
  { id: 14, question: "Do you sometimes feel that people are out to harm you without evidence?", disorder: "Schizophrenia" },
  { id: 15, question: "Do you have trouble organizing your thoughts?", disorder: "Schizophrenia" },

  { id: 16, question: "Do you often feel worried about your weight or body shape?", disorder: "Eating Disorder" },
  { id: 17, question: "Do you engage in restrictive dieting, binge eating, or purging behaviors?", disorder: "Eating Disorder" },
  { id: 18, question: "Do you feel out of control when eating?", disorder: "Eating Disorder" }
];


const options = [
  { label: "Strongly Agree", points: 5 },
  { label: "Agree", points: 4 },
  { label: "Neutral", points: 3 },
  { label: "Disagree", points: 2 },
  { label: "Strongly Disagree", points: 1 }
];

const Questionnaire = () => {
  const router = useRouter();
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (questionId, points) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: points,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all questions have been answered
    if (Object.keys(responses).length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    // Calculate scores for each disorder
    const disorderScores = questions.reduce((acc, question) => {
      const responsePoints = responses[question.id];
      if (responsePoints) {
        if (!acc[question.disorder]) {
          acc[question.disorder] = 0;
        }
        acc[question.disorder] += responsePoints;
      }
      return acc;
    }, {});

    // Sort disorders by score and select only the top 3
    const topDisorders = Object.entries(disorderScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => ({ name }));

    // Ensure only three disorders are selected, even if there are score ties
    if (topDisorders.length > 3) {
      topDisorders.length = 3;
    }

    try {
      setError("");
      await axios.post("/api/users/submitQuestionnaire", { disorders: topDisorders });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting questionnaire", error);
    }
  };


  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
          Mental Health Questionnaire
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map(({ id, question }) => (
            <div key={id} className="relative p-6 bg-gray-800 rounded-lg shadow-lg">
              <p className="mb-4 text-lg font-semibold">{question}</p>
              <div className="flex flex-wrap space-x-4">
                {options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="radio"
                      name={`question-${id}`}
                      value={option.points}
                      checked={responses[id] === option.points}
                      onChange={() => handleInputChange(id, option.points)}
                      required
                      className="form-radio w-6 h-6 rounded-full border-2 border-gray-600 checked:bg-blue-500 hover:bg-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                    <span className="text-gray-300 group-hover:text-white transition duration-200 ease-in-out">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-400 transition duration-300 ease-in-out shadow-lg hover:shadow-blue-500/40"
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Questionnaire;
