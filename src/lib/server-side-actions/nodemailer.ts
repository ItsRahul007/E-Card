"use server";

import nodemailer from "nodemailer";
import { T_SendEmail } from "../types/nodemailer";
import {
  emailSentSuccessFully,
  failedToSendEmail,
} from "../util/toastMessages";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  port: 465,
});

export const sendEmail = async ({ subject, text, html, to }: T_SendEmail) => {
  try {
    const emailOptions = {
      from: process.env.EMAIL!,
      to: to || process.env.EMAIL!,
      subject,
      text,
      html,
    };

    await mailTransporter.sendMail(emailOptions);

    return {
      success: true,
      message: emailSentSuccessFully,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: failedToSendEmail,
      problem: error.message,
    };
  }
};
