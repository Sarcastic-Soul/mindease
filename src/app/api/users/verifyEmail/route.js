// D:\Web Dev\mindease\src\app\api\users\verifyEmail\route.js

import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req) {
  try {
    // Get the token from the request body
    const { token } = await req.json(); // Use req.json() to parse the body

    await connect();

    // Find the user associated with the verification token
    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), {
        status: 400,
      });
    }

    // Verify the user and remove the token
    user.isVerified = true;
    user.verifyToken = null; // Clear the token
    await user.save();

    return new Response(JSON.stringify({ message: 'Email successfully verified' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
