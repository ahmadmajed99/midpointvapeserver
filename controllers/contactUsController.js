import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const contactUs = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, email, message } = req.body;
  console.log("Received data:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log("SMTP Configuration Error:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const mailOptions = {
      from: "info@midpointvape.co",
      to: "info@midpointvape.co",
      subject: "Contact Form Submission MidPointVape",
      text: `Name: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send("email sent");
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export { contactUs };
