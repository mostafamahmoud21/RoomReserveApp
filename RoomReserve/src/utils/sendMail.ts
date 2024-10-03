import nodemailer from 'nodemailer';

export const sendMail = async (to:string, subject:string, text:string) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    });

    console.log('Message sent:', info.messageId);
};

