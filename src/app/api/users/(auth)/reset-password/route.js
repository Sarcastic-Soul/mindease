import { NextResponse } from 'next/server';
import { sendResetPasswordEmail } from '@/utils/sendResetPasswordEmail';
import { generateToken } from '@/utils/generateToken';
import User from '@/models/user.model';
import { connect } from '@/dbConfig/dbConfig';

export async function POST(req) {
    await connect();
    const { email, baseURL } = await req.json();
    console.log()

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ success: false, message: 'Email does not exist' }, { status: 404 });
    }

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }
    const token = await generateToken(email);
    const resetLink = `${baseURL}/auth/reset-password?token=${token}`;
    console.log(baseURL, email)
    try {
        await sendResetPasswordEmail(email, resetLink);
        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error sending email' }, { status: 500 });
    }
}


