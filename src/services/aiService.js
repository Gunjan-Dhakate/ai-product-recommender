// Using Google Gemini API — FREE tier (no credit card required)
// Free limits: 15 requests/min, 1500 requests/day
// Get your free API key at: https://aistudio.google.com/apikey

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY || "YOUR_GEMINI_API_KEY_HERE";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are a helpful product recommendation assistant for an Indian electronics store.
All product prices are in Indian Rupees (INR).
You will receive a user's preferences and a list of products with their IDs.
Your job is to:
1. Understand what the user is looking for (budget in INR, category, use case, brand preferences, etc.)
2. If the user mentions a budget in INR (e.g. "under 50000" or "below 50k"), filter accordingly
3. Select the most relevant products from the catalog
4. Return ONLY a JSON object (no markdown, no explanation text outside JSON) in this exact format:
{
  "message": "A helpful 1-2 sentence explanation mentioning prices in rupees",
  "productIds": ["id1", "id2", "id3"]
}

Rules:
- Return 1 to 5 product IDs maximum
- If no products match, return an empty array for productIds
- Always be concise and friendly in the message
- Only include products that genuinely match the user's request
- Treat "k" as thousands (e.g. 50k = 50000 rupees)`;

export async function getRecommendations(userQuery, products) {
  const productCatalog = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    currency: "INR",
    tags: p.tags,
    description: p.description,
  }));

  const fullPrompt = `${SYSTEM_PROMPT}

User request: "${userQuery}"

Available products:
${JSON.stringify(productCatalog, null, 2)}

Return ONLY the JSON object.`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: fullPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const msg =
      errData.error?.message || `Gemini API error: ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();

  // Extract text from Gemini's response structure
  const rawText =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Strip any accidental markdown fences
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    message: parsed.message || "Here are some recommendations for you.",
    productIds: Array.isArray(parsed.productIds) ? parsed.productIds : [],
  };
}
