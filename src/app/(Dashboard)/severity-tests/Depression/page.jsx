"use client";
import React from "react";
import SeverityTest from "@/components/SeverityTest";

const depressionQuestions = [
    "I often feel hopeless about the future.",
    "I experience little pleasure or interest in things I used to enjoy.",
    "I feel tired or have low energy most of the time.",
    "I find it hard to focus or concentrate on tasks.",
    "I frequently feel worthless or guilty.",
    "My appetite has significantly changed, either eating more or less than usual.",
    "I have trouble falling asleep or staying asleep.",
    "I sometimes think about self-harm or suicide.",
    "I feel like a failure and that I have let myself or others down.",
    "My movements or speech feel slowed down.",
    "I avoid social activities because I don’t feel up to it.",
    "I often feel irritable or restless.",
    "I feel disconnected from people around me.",
    "I have difficulty making decisions.",
    "I feel overwhelmed by even small tasks.",
    "I experience frequent crying spells or emotional outbursts.",
    "I struggle to find motivation to do daily activities.",
    "I feel numb or emotionally detached.",
    "My self-esteem has decreased significantly.",
    "I have experienced drastic weight changes without intending to."
];

export default function DepressionTest() {
    return <SeverityTest disorderName="Depression" questions={depressionQuestions} />;
}
