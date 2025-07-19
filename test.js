import dotenv from 'dotenv';
dotenv.config();

import { sendResetPasswordEmail } from './path-to-your-service-file.js';

const test = async () => {
    const email = 'recipient@example.com'; // Replace with your email for testing
    const resetLink = 'https://yourapp.com/reset-password?token=test-token';

    const result = await sendResetPasswordEmail(email, resetLink);
    console.log(result);
};

test();
