import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { getTokenData } from "@/utils/getTokenData";

export async function POST(req, res) {
  const { disorders } = await req.json(); // Parse JSON body

  try {
    await connect();

    // Retrieve user ID from token
    const userID = await getTokenData(req);
    const user = await User.findOne({ _id: userID }).select("-password");
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    disorders.forEach(({ name }) => {
      if (!user.mentalDisorders.some(d => d.disorderName === name)) {
        user.mentalDisorders.push({
          disorderName: name,
          severity: null, // Leave severity unassigned
        });
      }
    });

    await user.save();

    return new Response(JSON.stringify({ message: "Disorders updated successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
