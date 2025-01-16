import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendVerificationEmail(email, username, verifyCode) {
    try {
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h1>Welcome to MindEase, ${username}!</h1>
                <p>Your verification code is:</p>
                <h2 style="color: #4CAF50;">${verifyCode}</h2>
                <p>Please use this code to verify your account. If you did not request this, please ignore this email.</p>
            </div>
        `;

        await sgMail.send({
            to: email,
            from: 'anishisbusy@gmail.com',
            subject: 'MindEase | Verification Code',
            html: emailHtml,
        });

        return { success: true, message: 'Email sent successfully' };
    } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        return { success: false, message: 'Error sending verification email' };
    }
}
