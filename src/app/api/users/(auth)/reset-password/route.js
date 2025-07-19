import { NextResponse } from 'next/server';
import { generateToken } from '@/utils/generateToken';
import User from '@/models/user.model';
import { connect } from '@/dbConfig/dbConfig';

export async function POST(req) {
    await connect();
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ success: false, message: 'Email does not exist' }, { status: 404 });
    }

    const token = await generateToken(email);

    return NextResponse.json({ success: true, token });
}
