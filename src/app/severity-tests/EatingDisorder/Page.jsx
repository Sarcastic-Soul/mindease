"use client";
import React from "react";
import SeverityTest from "@/components/SeverityTest";

const eatingDisorderQuestions = [
    "I often feel guilty or ashamed after eating.",
    "I feel a strong urge to restrict my food intake to lose weight.",
    "I regularly avoid eating around others because I am self-conscious.",
    "I frequently check my body in the mirror to look for flaws.",
    "I am obsessed with my body weight or shape.",
    "I feel like I have lost control over how much I eat.",
    "I engage in strict dieting or fasting to control my weight.",
    "I use laxatives, vomiting, or excessive exercise to prevent weight gain.",
    "I experience intense fear of gaining weight, even if others say I am underweight.",
    "I eat large amounts of food in a short period of time and feel unable to stop.",
    "I count calories or track my food intake obsessively.",
    "I feel distressed when I cannot control my eating habits.",
    "I avoid certain foods because I am afraid they will make me fat.",
    "I am preoccupied with food, thinking about it constantly throughout the day.",
    "I skip meals intentionally to prevent weight gain.",
    "I eat secretly or hide food from others to avoid judgment.",
    "I have lost a significant amount of weight in a short period of time.",
    "I avoid social activities because of anxiety about food or eating.",
    "My self-worth is heavily influenced by how much I weigh or how I look.",
    "I experience physical symptoms like dizziness, weakness, or hair loss due to my eating habits."
];

export default function EatingDisorderTest() {
    return <SeverityTest disorderName="Eating Disorder" questions={eatingDisorderQuestions} />;
}
