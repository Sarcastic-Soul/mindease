import emailjs from 'emailjs-com';

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const templateParams = {
            email: email,
            reset_link: resetLink,
        };

        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_TEMPLATE_ID,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('EmailJS error:', error);
        return { success: false, message: 'Failed to send Password reset email' };
    }
};
