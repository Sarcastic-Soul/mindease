"use client";
import React from "react";
import SeverityTest from "@/app/(dashboard)/severity-tests/SeverityTest";

const schizophreniaQuestions = [
    "I hear voices or sounds that others do not.",
    "I have thoughts or beliefs that others find strange or irrational.",
    "I sometimes feel like people are watching me or plotting against me.",
    "I find it difficult to tell the difference between reality and my thoughts.",
    "I feel disconnected from reality or that things around me aren’t real.",
    "I have difficulty expressing emotions appropriately.",
    "I often feel emotionally flat or disconnected from people.",
    "I sometimes see things that others say are not there.",
    "I find it hard to concentrate or stay focused on tasks.",
    "I sometimes feel like my thoughts are being controlled by someone else.",
    "I find it difficult to organize my thoughts or communicate clearly.",
    "I have trouble maintaining social relationships or friendships.",
    "I experience long periods of confusion or disorganized thinking.",
    "I feel like I have no control over my own thoughts.",
    "I sometimes experience unusual body sensations or perceptions.",
    "I avoid social interactions because I feel paranoid or uncomfortable.",
    "I feel a lack of motivation to engage in daily activities.",
    "I often struggle with maintaining self-care or hygiene.",
    "I feel like my emotions don’t match the situation I’m in.",
    "I sometimes feel isolated, as though no one understands what I’m experiencing."
];

export default function SchizophreniaTest() {
    return <SeverityTest disorderName="Schizophrenia" questions={schizophreniaQuestions} />;
}
