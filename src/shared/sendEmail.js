import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  try {
    console.log("Sending email to:", EmailTo);

    let transporter = nodemailer.createTransport({
      host: "mail.ownfood.com.bd",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@ownfood.com.bd",
        pass: "HD@OWNFOOD4321",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOption = {
      from: "Cluster Antivirus <noreply@ownfood.com.bd>",
      to: EmailTo,
      subject: EmailSubject,
      html: EmailText,
    };

    const response = await transporter.sendMail(mailOption);
    console.log("Email sent successfully:", response);
    if (!response) {
      throw new Error("Email could not be sent.");
    }

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent.");
  }
};

module.exports = SendEmailUtility;
