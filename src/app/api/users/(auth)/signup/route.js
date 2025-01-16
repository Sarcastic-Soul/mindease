import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.model';
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendVerificationEmail } from '@/utils/sendVerificationEmail';

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;
        // console.log(username, email, password);

        const existingUserByUsername = await User.findOne({ username });
        const existingUserByEmail = await User.findOne({ email });

        console.log(existingUserByEmail);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) { // current mail is already registered
            if (existingUserByEmail.isVerified) { // email is already verified
                return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
            } else { // email is not verified
                existingUserByEmail.username = username;
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
                console.log('User updated');
            }
        } else if (existingUserByUsername) { // someone else have the username but did not verify
            if (existingUserByUsername.isVerified) {
                return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
            } else {
                existingUserByUsername.email = email;
                existingUserByUsername.password = hashedPassword;
                existingUserByUsername.verifyCode = verifyCode;
                existingUserByUsername.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByUsername.save();
                console.log('User updated');
            }

        } else { // new user
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
            });
            await newUser.save();
            console.log('User created');
        }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        console.log(emailResponse)
        if (emailResponse.success) {
            return NextResponse.json({ success: true, message: 'Verification email sent' }, { status: 201 });
        } else {
            return NextResponse.json({ error: emailResponse.message }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}