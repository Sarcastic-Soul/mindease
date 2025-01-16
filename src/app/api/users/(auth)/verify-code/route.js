import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

await connect();
export async function POST(req) {
    try {
        const { username, verifyCode } = await req.json();
        const decodedUsername = decodeURIComponent(username);
        console.log(decodedUsername, verifyCode);
        const user = await User.findOne({ username: decodedUsername });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        if (user.verifyCode !== verifyCode) {
            return NextResponse.json({ success: false, message: 'Invalid code' }, { status: 400 });
        }
        if (new Date(user.verifyCodeExpiry) < new Date()) {
            return NextResponse.json({ success: false, message: 'Code expired' }, { status: 400 });
        }

        user.isVerified = true;
        await user.save();
        return NextResponse.json({ success: true, message: 'User verified' }, { status: 200 });
    } catch (error) {
        console.log('Error verifying code:', error);
        return NextResponse.json({ success: false, message: 'Error verifying code' }, { status: 500 });
    }
}
