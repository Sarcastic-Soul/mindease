
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, token) => {
  try {
    // Create a transporter object using Mailtrap (or any SMTP service)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Use your SMTP server
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Your Mailtrap user
        pass: process.env.MAILTRAP_PASS,  // Your Mailtrap password
      },
    });

    // Construct the verification URL
    const verificationUrl = `${process.env.DOMAIN}/auth/verifyEmail?token=${token}`;

    // Email options
    const mailOptions = {
      from: '"MindEase" <noreply@mindease.com>',
      to: email,
      subject: "Verify your email address",
      html: `
        <h3>Hello,</h3>
        <p>Thank you for registering at MindEase! Please verify your email by clicking the button below:</p>
        <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p>If the button doesn't work, please copy and paste the following URL into your browser:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

export default sendVerificationEmail;
