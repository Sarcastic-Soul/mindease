import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendResetPasswordEmail(email, resetLink) {
    try {
        await sgMail.send({
            to: email,
            from: 'anishisbusy@gmail.com',
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending email' }, { status: 500 };
    }
}



