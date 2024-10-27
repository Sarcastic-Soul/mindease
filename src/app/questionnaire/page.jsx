'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(20).fill(3)); // Initialize all answers to "Neutral" (3)
  const router = useRouter();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate scores
    const depressionScore = answers.slice(0, 5).reduce((acc, cur) => acc + cur, 0);
    const bipolarScore = answers.slice(5, 10).reduce((acc, cur) => acc + cur, 0);
    const ptsdScore = answers.slice(10, 15).reduce((acc, cur) => acc + cur, 0);
    const adhdScore = answers.slice(15, 20).reduce((acc, cur) => acc + cur, 0);

    const scores = [
      { name: "Depression", score: depressionScore },
      { name: "Bipolar", score: bipolarScore },
      { name: "PTSD", score: ptsdScore },
      { name: "ADHD", score: adhdScore },
    ];

    // Sort by highest score and take the top 3 disorders
    const topDisorders = scores
      .filter(score => score.score >= 11) // Filter only disorders with mild symptoms and higher
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Send the results to the backend to update the user data
    const response = await fetch('/api/submitQuestionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disorders: topDisorders }),
    });

    if (response.ok) {
      // Redirect to some page (e.g., user's profile or results page)
      router.push('/profile');
    } else {
      console.error("Error submitting questionnaire");
    }
  };

  return (
    <div>
      <h1>Mental Health Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <label>{question}</label>
            <select value={answers[index]} onChange={(e) => handleAnswerChange(index, e.target.value)}>
              <option value="1">Strongly Disagree</option>
              <option value="2">Disagree</option>
              <option value="3">Neutral</option>
              <option value="4">Agree</option>
              <option value="5">Strongly Agree</option>
            </select>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// List of questions
const questions = [
  // Depression
  "I often feel sad or empty, even without a specific reason.",
  "I have lost interest in activities that I once enjoyed.",
  "I feel exhausted, even when I have had enough sleep.",
  "I have difficulty concentrating or making decisions.",
  "I often feel worthless or excessively guilty.",

  // Bipolar Disorder
  "I have periods of time where I feel unusually energetic or extremely irritable.",
  "My mood swings between periods of extreme happiness and deep sadness.",
  "During high-energy periods, I talk more than usual or feel like my thoughts are racing.",
  "I often take risks or act impulsively during these high-energy phases.",
  "My mood changes have significantly affected my personal relationships or work.",

  // PTSD
  "I frequently experience flashbacks, nightmares, or intrusive thoughts about a traumatic event.",
  "I try to avoid people, places, or situations that remind me of something traumatic.",
  "I feel constantly on edge, easily startled, or overly alert.",
  "I have trouble sleeping because of memories or nightmares related to trauma.",
  "I experience feelings of intense fear, helplessness, or horror in certain situations.",

  // ADHD
  "I find it hard to focus on tasks, even those that are important to me.",
  "I frequently misplace things or forget important appointments.",
  "I often feel restless or unable to sit still for long periods.",
  "I start many tasks but struggle to finish them.",
  "I get easily distracted by unrelated thoughts or external stimuli.",
];

export default Questionnaire;
