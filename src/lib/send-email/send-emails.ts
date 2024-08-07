"use server";

import User from "../model/usersSchema";
import { sendEmail } from "../server-side-actions/nodemailer";

export const sendEmailToCustomer = async (
  customer_id: string,
  allProductNames: string[]
) => {
  const user = await User.findById(customer_id).select("email");

  const { success, problem } = await sendEmail({
    subject: "Order Delivered",
    html: `
        <h1>Your given order on E-Card is delivered</h1> <br>
        <strong>Products:</strong>
        <ul>${allProductNames.join("")}</ul>
        `,
    to: user?.email,
  });
  if (!success) {
    console.error("Failed to send email to customer: ", problem);
  }
};

export const sendEmailToSeller = async (allProductsByBrandNames: any) => {
  try {
    //? getting all the brand names (which are object keys)
    const allBrandNames = Object.keys(allProductsByBrandNames);

    //? mapping the brand names and fetching the users and sending email on their contact email
    allBrandNames.forEach(async (brandName) => {
      const user = await User.findOne({ brandName }).select("contactEmail");
      const orders = allProductsByBrandNames[brandName]
        .map(
          (obj: any) => `
              <li>
                <div>Product: ${obj.product_name}</div>
                <div>Quantity: ${obj.quantity}</div>
              </li>
              `
        )
        .join("");

      user &&
        user.contactEmail &&
        (await sendEmail({
          to: user.contactEmail,
          subject: "Got a new order on E-Card",
          html: `
              <h1>Got a new order on E-Card</h1> <br>
              <strong>Products:</strong>
              <ul>${orders}</ul> <br>
              <a href="${process.env.DOMAIN}/seller/dashboard/orders" target="_blank">Check it out on E-Card</a>
          `,
        }));
    });
  } catch (error: any) {
    console.error(
      "failed to send email to seller, Error-Message: ",
      error.message
    );
  }
};

export const sendEmailVerificationCode = async (customer_id: string) => {
  //? Generate a random number between 100000 and 999999 (inclusive)
  const code = Math.floor(Math.random() * 900000) + 100000;

  const user = await User.findByIdAndUpdate(
    customer_id,
    {
      verificationCode: code,
    },
    { new: true }
  ).select("email");

  const { success, problem } = await sendEmail({
    subject: "Verify your email on E-Card",
    html: `
        <h1>Here is your verification code for verifying your email on E-Card</h1> <br>
        <strong>Code: ${code}</strong>
        <p>Please do not share this code with others.</p>
        `,
    to: user?.email,
  });
  if (!success) {
    console.error("Failed to send email to customer: ", problem);
  }
  return { success, problem };
};
