// D:\Web Dev\mindease\src\app\api\users\sendVerificationEmail\route.js

import sendVerificationEmail from '@/utils/mailer';
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connect();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    // Generate a verification token if it doesn't already exist
    const token = user.verifyToken || crypto.randomBytes(32).toString("hex");
    user.verifyToken = token; // Assign the token to the user
    user.verifyTokenExpiry = Date.now() + 3600000; // Set token expiry to 1 hour
    await user.save(); // Save user with the new token

    // Send the verification email
    await sendVerificationEmail(user.email, token);

    // Return success response
    return new Response(JSON.stringify({ message: 'Verification email sent' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
