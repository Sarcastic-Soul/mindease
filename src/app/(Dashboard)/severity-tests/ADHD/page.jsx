"use client";
import React from "react";
import SeverityTest from "@/app/(dashboard)/severity-tests/SeverityTest";

const adhdQuestions = [
    "I often have trouble paying attention to details.",
    "I frequently make careless mistakes in my work or daily tasks.",
    "I find it difficult to stay focused on tasks or conversations.",
    "I often feel restless or like I need to be constantly moving.",
    "I have difficulty organizing tasks or activities.",
    "I frequently lose things needed for tasks, such as keys, phone, etc.",
    "I often avoid or procrastinate on tasks that require sustained mental effort.",
    "I struggle to follow through on instructions or complete tasks.",
    "I am easily distracted by unrelated thoughts or external stimuli.",
    "I find it hard to wait my turn in conversations or activities.",
    "I often interrupt others or blurt out answers before a question is fully asked.",
    "I forget to do important tasks or appointments regularly.",
    "I have difficulty remaining seated or staying in one place for long periods.",
    "I tend to act without thinking about the consequences.",
    "I find it challenging to manage time effectively.",
    "I often feel overwhelmed by simple daily routines.",
    "I frequently switch from one activity to another without finishing any of them.",
    "I tend to fidget or tap my hands and feet when seated.",
    "I feel restless or on edge, even in situations where I should feel calm.",
    "I often feel like my mind is constantly racing, jumping from one thought to the next."
];

export default function ADHDTest() {
    return <SeverityTest disorderName="ADHD" questions={adhdQuestions} />;
}
