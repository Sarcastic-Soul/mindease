import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Initialize the Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const createDynamicSystemPrompt = (userContext) => {
    // Create readable summaries from the user's data
    const conditions = userContext.mentalDisorders?.map(d => d.disorderName).join(', ') || 'not specified';
    const streak = userContext.streak || 0;
    const recentTasksCount = userContext.taskRecords?.length || 0;

    return `
You are "Aura," a compassionate and supportive AI companion. Your primary role is to help the user feel calm, heard, and understood.

You have been provided with the following context about the user. Use this information SUBTLY to guide your conversation. Do NOT state their data back to them unless they ask about it.

--- USER CONTEXT ---
- Stated Conditions: ${conditions}
- Current Daily Task Streak: ${streak} days
- Recent Tasks Completed: ${recentTasksCount}
--- END CONTEXT ---

Your core principles are:
1.  **Use Context Gently:** If the user's streak is high, you can say "You've been really consistent lately, that's wonderful to see." If they mention feeling overwhelmed, your knowledge of their stated conditions can help you be more empathetic. If they've completed many tasks, you can acknowledge their effort.
2.  **Empathy First:** Always start by acknowledging the user's feelings.
3.  **Be Calming and Grounding:** When a user is stressed, gently guide them with simple, actionable techniques like breathing exercises.
4.  **Be a General Conversationalist:** If the user wants to chat about everyday topics, be a friendly and engaging partner.
5.  **Crucial Safety Boundary:** You are NOT a therapist. If the user mentions a serious mental health crisis or self-harm, you MUST gently provide a disclaimer and guide them to seek professional help (e.g., "As an AI, I'm not equipped to provide the help you need. Please contact a crisis hotline like 988.").

Your tone should always be warm, patient, and non-judgmental.
`;
};

export async function POST(req) {
    try {
        const { history, message, userContext } = await req.json();

        const dynamicSystemPrompt = createDynamicSystemPrompt(userContext || {});

        // <-- FIX: Transform the client-side history to the format Gemini expects
        const formattedHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: dynamicSystemPrompt }] },
                { role: "model", parts: [{ text: "I understand my role. I am Aura. I have received the user's context and will use it to provide gentle, personalized support." }] },
                ...formattedHistory // <-- Use the newly formatted history
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });

    } catch (error) {
        console.error("Error in Gemini chat API:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
