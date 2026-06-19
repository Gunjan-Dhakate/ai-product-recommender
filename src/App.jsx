import React, { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import AIResponse from "./components/AIResponse";
import { PRODUCTS } from "./data/products";
import { getRecommendations } from "./services/aiService";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState(null);
  const [recommendedIds, setRecommendedIds] = useState(null);
  const [error, setError] = useState(null);

  const displayedProducts =
    recommendedIds === null
      ? PRODUCTS
      : PRODUCTS.filter((p) => recommendedIds.includes(p.id));

  async function handleSearch(userQuery) {
    setLoading(true);
    setError(null);
    setAiMessage(null);
    setRecommendedIds(null);

    try {
      const result = await getRecommendations(userQuery, PRODUCTS);
      setAiMessage(result.message);
      setRecommendedIds(result.productIds);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setQuery("");
    setAiMessage(null);
    setRecommendedIds(null);
    setError(null);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-dot" />
            <span className="logo-text">ShopMind</span>
          </div>
          <p className="tagline">AI-powered product discovery</p>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">
            Tell us what you're<br />
            <span className="hero-accent">looking for</span>
          </h1>
          <p className="hero-sub">
            Describe your needs in plain English — our AI finds the perfect match.
          </p>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            loading={loading}
          />
          <div className="example-chips">
            {[
              "Phone under $500",
              "Wireless headphones for gym",
              "Laptop for video editing",
              "Budget smartwatch",
            ].map((ex) => (
              <button
                key={ex}
                className="chip"
                onClick={() => {
                  setQuery(ex);
                  handleSearch(ex);
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </section>

        {(aiMessage || error) && (
          <AIResponse
            message={aiMessage}
            error={error}
            onReset={handleReset}
            count={displayedProducts.length}
          />
        )}

        <section className="products-section">
          <div className="products-header">
            <h2 className="section-title">
              {recommendedIds === null
                ? "All Products"
                : `${displayedProducts.length} Recommendation${displayedProducts.length !== 1 ? "s" : ""}`}
            </h2>
            {recommendedIds !== null && (
              <button className="btn-ghost" onClick={handleReset}>
                ← Show all
              </button>
            )}
          </div>

          {loading ? (
            <div className="skeleton-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <p>No products matched your request. Try different keywords.</p>
              <button className="btn-ghost" onClick={handleReset}>
                Browse all products
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Built with React + Claude AI · ShopMind © 2026</p>
      </footer>
    </div>
  );
}
