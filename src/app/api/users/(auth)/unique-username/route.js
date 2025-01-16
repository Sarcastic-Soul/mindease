import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connect();
    try {
        const { searchParams } = new URL(req.url);
        const queryParams = { username: searchParams.get('username') }
        const existingVerifiedUser = await User.findOne({ username: queryParams.username, isVerified: true });
        if (existingVerifiedUser) {
            console.log(existingVerifiedUser);
            return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 201 });
        }

        return NextResponse.json({ success: true, message: 'Username is unique' }, { status: 200 });
    }
    catch (error) {
        console.log('Error checking username:', error);
        return NextResponse.json({ success: false, message: 'Error checking username' }, { status: 500 });
    }
}
