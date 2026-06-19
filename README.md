# ShopMind — AI Product Recommender

A React app that uses AI to recommend products based on natural language queries. Users can type preferences like "wireless earbuds for gym under ₹10000" and get instant AI-filtered results.

---

## Deployment (Vercel)

🔗  https://ai-product-recommender-pqjjt1kv6-gunjan4.vercel.app/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| AI API | Groq (LLaMA 3.1 8B) — Free tier |
| Styling | Custom CSS with CSS variables |
| Deployment | Vercel |

---

## Features

- 🔍 Natural language product search ("phone under ₹40000")
- 🤖 AI-powered filtering using Groq's LLaMA model
- 💰 Prices displayed in Indian Rupees (INR)
- 📱 15 products across 6 categories (Smartphones, Laptops, Headphones, Earbuds, Smartwatches, Accessories)
- ⚡ Example query chips for quick interaction
- 🌙 Dark mode UI

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Input field + search button
│   ├── ProductCard.jsx     # Individual product tile with image + INR price
│   └── AIResponse.jsx      # AI message banner
├── data/
│   └── products.js         # 15-product catalog with INR prices
├── services/
│   └── aiService.js        # Groq API integration
├── App.jsx                 # Main layout and state management
└── App.css                 # All styles
```

---

## How the AI Works

1. User types a preference in the search bar
2. The full product catalog + user query is sent to Groq API
3. LLaMA 3.1 reads the request and returns a JSON object:
```json
{
  "message": "Here are 2 budget smartwatches under ₹20,000...",
  "productIds": ["p11", "p12"]
}
```
4. The frontend filters the product grid to show only matched items

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/Gunjan-Dhakate/ai-product-recommender.git
cd ai-product-recommender
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get a free Groq API key
- Go to https://console.groq.com
- Sign up with Google
- Click **API Keys → Create API Key**
- Copy the key

### 4. Create a `.env` file
```bash
cp .env.example .env
```
Open `.env` and add your key:
```
REACT_APP_GROQ_KEY=gsk_your_key_here
```

### 5. Run locally
```bash
npm start
```
Opens at http://localhost:3000

---

## Deployment (Vercel)

### 1. Push to GitHub
```bash
git add .
git commit -m "your message"
git push
```

### 2. Import on Vercel
- Go to https://vercel.com → New Project
- Import your GitHub repo
- Framework: **Create React App** (auto-detected)

### 3. Add environment variable
In Vercel project settings → **Environment Variables**:
- Key: `REACT_APP_GROQ_KEY`
- Value: your Groq API key

### 4. Deploy
Click Deploy — live in ~60 seconds.

> ⚠️ After adding/changing environment variables, always **Redeploy** for changes to take effect.

---

## API Details

| Property | Value |
|---|---|
| Provider | Groq |
| Model | llama-3.1-8b-instant |
| Free tier | 14,400 requests/day |
| Endpoint | https://api.groq.com/openai/v1/chat/completions |
| Auth | Bearer token via `REACT_APP_GROQ_KEY` |

---

## Product Catalog

| Category | Products |
|---|---|
| Smartphones | Samsung Galaxy A54, iPhone 15, Google Pixel 8a |
| Laptops | MacBook Air M3, Acer Aspire 5, ASUS ROG Zephyrus G14 |
| Headphones | Sony WH-1000XM5 |
| Earbuds | Jabra Elite 4 Active, Apple AirPods Pro 2 |
| Smartwatches | Apple Watch Series 9, Fitbit Versa 4, Samsung Galaxy Watch 6 |
| Accessories | iPad Air M2, Anker PowerCore 26800, Logitech MX Master 3S |

---

## Built By

Gunjan Dhakate
