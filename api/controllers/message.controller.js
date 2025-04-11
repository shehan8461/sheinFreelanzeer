import Message from "../models/message.model.js";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';

export const create_messsage = async (req, res) => {
  const data = new Message(req.body)
  await data.save()
  res.send({ success: true, message: "message send successfuly" })
}

export const send_email = async (req, res) => {
  try {
    const { email } = req.body;

   console.log(email+"==========================");

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shehanfreelanzer@gmail.com',
        pass: 'enxt pqxx egca prul'
      }
    });

    // Send a thank you email
    await transporter.sendMail({
      from: 'shehanfreelanzer@gmail.com',
      to: email,
      subject: "Thank You for Choosing Shehan's Freelancing Hub",
      text: `Thank you for choosing Shehan's Freelancing Hub. We have successfully received your message and will get back to you promptly.
  
Your interest in our services is greatly appreciated.
    
Best regards,  
Shehan's Freelancing Hub Team`,
    });
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};