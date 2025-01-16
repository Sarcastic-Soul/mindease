import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import { connect } from '@/dbConfig/dbConfig';

export async function POST(req) {
    await connect();
    const { token, password } = await req.json();

    if (!token || !password) {
        return NextResponse.json({ success: false, message: 'Token and password are required' }, { status: 400 });
    }

    try {
        // Verify the token and extract the email
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { email } = decodedToken;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        return NextResponse.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }
}
