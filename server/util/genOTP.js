// util/genOTP.js
import nodemailer from 'nodemailer';

const genOTP = async (email, verificationToken) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,     // true for 465, false for other ports
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Email content
  const mailOptions = {
    from: process.env.TEST_EMAIL,
    to: email,
    subject: 'Email Verification',
    text: `Your verification token is: ${verificationToken}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, message: 'Failed to send OTP' };
  }
};

export default genOTP;