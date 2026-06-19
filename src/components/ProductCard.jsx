import React, { useState } from "react";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function formatINR(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const isHighRated = product.rating >= 4.7;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="product-emoji">🛍️</span>
        )}
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formatINR(product.price)}</span>
          <div className="product-rating">
            <StarRating rating={product.rating} />
            <span>({product.reviews.toLocaleString("en-IN")})</span>
          </div>
        </div>
        {isHighRated && <span className="badge">⭐ Top Rated</span>}
      </div>
    </article>
  );
}
