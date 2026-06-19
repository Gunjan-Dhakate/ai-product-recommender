# ShopMind — AI Product Recommender

A React app that uses Claude AI to recommend products based on natural language queries.

## Tech Stack
- React 18
- Claude claude-sonnet-4-6 (via Anthropic API)
- Deployed on Vercel

## Local Setup

```bash
npm install
npm start
```

Open http://localhost:3000

## How the AI works

The app sends your product catalog + user query to the Anthropic API.
Claude reads the preferences and returns a JSON object with:
- A short explanation message
- An array of matching product IDs

The frontend then filters the product list to show only recommended items.

## Deployment (Vercel)

vercel Link : https://ai-product-recommender-pqjjt1kv6-gunjan4.vercel.app/
