"use client";
import React from "react";
import SeverityTest from "@/components/SeverityTest";

const bipolarQuestions = [
    "I go through periods of extreme happiness followed by deep sadness.",
    "My mood can shift rapidly for no clear reason.",
    "I sometimes feel an unusual amount of energy, even without much sleep.",
    "I talk much more than usual during certain periods.",
    "I feel unusually confident or important at times.",
    "I often act impulsively, making decisions I later regret.",
    "I have racing thoughts that are difficult to control.",
    "I engage in risky activities more than I should (e.g., spending sprees, unsafe driving).",
    "I sometimes feel easily irritated and frustrated.",
    "I have difficulty maintaining a regular sleep schedule.",
    "I experience mood swings that last for days or weeks.",
    "During certain periods, I am more creative or productive than usual.",
    "I feel easily distracted, finding it hard to concentrate on one task.",
    "I experience agitation or excessive restlessness.",
    "I feel euphoric and unstoppable at times.",
    "I struggle with maintaining relationships due to unpredictable mood changes.",
    "There are times when I feel overly optimistic or unrealistic about the future.",
    "I have difficulty controlling my temper during mood swings.",
    "My energy levels fluctuate drastically without clear cause.",
    "I sometimes feel invincible, like nothing can go wrong."
];

export default function BipolarTest() {
    return <SeverityTest disorderName="Bipolar" questions={bipolarQuestions} />;
}
