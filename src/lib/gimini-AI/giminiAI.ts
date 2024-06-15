import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GIMINI_AI_API_KEY || "");

export async function getProductDescription(
  productKey: string,
  productName?: string
) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `act as a content writer who specializes in SEO

  I will just give you a product type like "Jeans for men" or "Pants" etc.
  You have to write some good content within 100 to 150 words, which will help me with SEO
  It should be in one paragraph without any heading or points and the paragraph should start with the Product name or category
  
  Don't give anything like "[your brand name]" or anything like I have to manually change, if I want then I will provide you the brand name

  For now, the product type is ${productKey} ${
    productName ? "and the product name is " + productName : ""
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log("gimini error");
    return undefined;
  }
}
