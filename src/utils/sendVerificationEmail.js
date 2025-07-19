import emailjs from 'emailjs-com';

export const sendVerificationEmail = async (email, username, verifyCode) => {
    try {
        const templateParams = {
            email,
            username,
            code: verifyCode,
        };

        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_VERIFICATION_TEMPLATE_ID,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('EmailJS error:', error);
        return { success: false, message: 'Failed to send verification email' };
    }
};
