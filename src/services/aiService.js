// Using Groq API — FREE, no credit card, very fast
// Get your free API key at: https://console.groq.com

const GROQ_API_KEY = process.env.REACT_APP_GROQ_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a helpful product recommendation assistant for an Indian electronics store.
All product prices are in Indian Rupees (INR).
Your job is to:
1. Understand what the user is looking for (budget in INR, category, use case, brand preferences)
2. If the user mentions a budget (e.g. "under 50000" or "below 50k"), filter accordingly
3. Return ONLY a JSON object, no markdown, no extra text, in this exact format:
{
  "message": "A helpful 1-2 sentence explanation mentioning prices in rupees",
  "productIds": ["id1", "id2", "id3"]
}
Rules:
- Return 1 to 5 product IDs maximum
- If no products match, return empty array for productIds
- Treat "k" as thousands (50k = 50000 rupees)`;

export async function getRecommendations(userQuery, products) {
  if (!GROQ_API_KEY) {
    throw new Error("API key missing. Add REACT_APP_GROQ_KEY in Vercel environment variables and redeploy.");
  }

  const productCatalog = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    currency: "INR",
    tags: p.tags,
    description: p.description,
  }));

  const userMessage = `User request: "${userQuery}"

Available products:
${JSON.stringify(productCatalog, null, 2)}

Return ONLY the JSON object.`;

  console.log("Calling Groq API...");

  let response;
  try {
    response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });
  } catch (networkErr) {
    console.error("Network error:", networkErr);
    throw new Error("Network error — could not reach API.");
  }

  const data = await response.json();
  console.log("Groq response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || `API error ${response.status}`);
  }

  const rawText = data.choices?.[0]?.message?.content || "";
  console.log("Raw AI text:", rawText);

  const cleaned = rawText.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error("Parse error, raw:", rawText);
    throw new Error("AI returned unexpected format. Please try again.");
  }

  return {
    message: parsed.message || "Here are some recommendations for you.",
    productIds: Array.isArray(parsed.productIds) ? parsed.productIds : [],
  };
}
