import React from "react";

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

export default function ProductCard({ product }) {
  const isHighRated = product.rating >= 4.7;

  return (
    <article className="product-card">
      <div className="product-image-wrap" aria-hidden="true">
        {product.emoji}
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <div className="product-rating">
            <StarRating rating={product.rating} />
            <span>({product.reviews.toLocaleString()})</span>
          </div>
        </div>
        {isHighRated && <span className="badge">⭐ Top Rated</span>}
      </div>
    </article>
  );
}
