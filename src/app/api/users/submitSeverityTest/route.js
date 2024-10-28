import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/utils/getTokenData";

export const POST = async (req) => {
    await connect();

    try {
        const userId = await getTokenData(req);
        const { disorderName, severity } = await req.json();

        if (!userId || !disorderName || severity == null) {
            return new Response(JSON.stringify({ error: "User ID, disorder name, and severity are required." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Find and update the disorder's severity in the mentalDisorders array
        const disorder = user.mentalDisorders.find(d => d.disorderName === disorderName);
        if (!disorder) {
            return new Response(JSON.stringify({ error: `Disorder ${disorderName} not found for user.` }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        disorder.severity = severity;
        await user.save(); // Save updated user data

        return new Response(JSON.stringify({ message: "Disorder severity updated successfully." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating disorder severity:", error);
        return new Response(JSON.stringify({ error: "An error occurred while updating severity." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
