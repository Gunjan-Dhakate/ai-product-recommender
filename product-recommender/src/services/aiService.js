const SYSTEM_PROMPT = `You are a helpful product recommendation assistant for an online electronics store.
You will receive a user's preferences and a list of products with their IDs.
Your job is to:
1. Understand what the user is looking for (budget, category, use case, brand preferences, etc.)
2. Select the most relevant products from the catalog
3. Return ONLY a JSON object (no markdown, no explanation text outside JSON) in this exact format:
{
  "message": "A helpful 1-2 sentence explanation of why you chose these products",
  "productIds": ["id1", "id2", "id3"]
}

Rules:
- Return 1 to 5 product IDs maximum
- If no products match, return an empty array for productIds
- Always be concise and friendly in the message
- Only include products that genuinely match the user's request`;

export async function getRecommendations(userQuery, products) {
  const productCatalog = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    tags: p.tags,
    description: p.description,
  }));

  const userMessage = `User request: "${userQuery}"

Available products:
${JSON.stringify(productCatalog, null, 2)}

Return ONLY the JSON object.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Strip any accidental markdown fences
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    message: parsed.message || "Here are some recommendations for you.",
    productIds: Array.isArray(parsed.productIds) ? parsed.productIds : [],
  };
}
