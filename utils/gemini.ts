import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export async function parseExpenseQuery(userQuery: string) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an AI Expense Parser. Convert the user's sentence into structured JSON.
    Fields:
    - amount (number, in INR)
    - mode_of_payment (upi, cash, online, card, bank, other)
    - category (e.g. Food, Travel, Bills, Shopping, Entertainment)
    - sub_category (e.g. Groceries, Restaurants, Fuel)
    - recurring (boolean)
    - recurring_type (daily, weekly, every_3_days, monthly, every_3_months or null)

    Rules:
    1. Extract all values from the query.
    2. If recurring is not mentioned, set it to false and recurring_type to null.
    3. Return ONLY valid JSON.

    Example Output:
    {
      "amount": 500,
      "mode_of_payment": "UPI",
      "date": "2025-08-07",
      "category": "Food",
      "sub_category": "Groceries",
      "recurring": true,
      "recurring_type": "weekly"
    }

    User query: "${userQuery}"
  `;

  const response = await model.generateContent(prompt);
  let text = response.response.text();
  text = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Gemini JSON Error:", e);
    throw new Error("Invalid JSON from Gemini");
  }
}
