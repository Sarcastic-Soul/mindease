"use client";
import React from "react";
import SeverityTest from "@/app/(Dashboard)/severity-tests/SeverityTest.jsx";

const ptsdQuestions = [
    "I frequently have flashbacks or intrusive memories of a traumatic event.",
    "I avoid places or people that remind me of something traumatic.",
    "I often have nightmares related to a traumatic experience.",
    "I feel hyper-alert, as though I am constantly on guard.",
    "I experience sudden outbursts of anger or irritation.",
    "I have difficulty trusting others since the traumatic event.",
    "I have trouble remembering important parts of the traumatic experience.",
    "I feel emotionally numb or detached from those around me.",
    "I experience overwhelming fear or panic when reminded of the traumatic event.",
    "I avoid talking about what happened because it is too painful.",
    "I feel jumpy or easily startled by loud noises or sudden movements.",
    "I have trouble sleeping because of distressing memories.",
    "I feel guilty or ashamed about what happened to me.",
    "I feel disconnected from reality when reminded of the event.",
    "I sometimes feel like I’m re-living the traumatic experience.",
    "I avoid situations that could remind me of the event.",
    "I experience feelings of hopelessness or despair about the future.",
    "I find it hard to experience positive emotions, such as happiness or love.",
    "I often feel unsafe, even in situations where I know I’m not in danger.",
    "I experience physical symptoms like sweating or trembling when reminded of the trauma."
];

export default function PTSDTest() {
    return <SeverityTest disorderName="PTSD" questions={ptsdQuestions} />;
}
