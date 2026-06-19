import React from "react";

export default function AIResponse({ message, error, onReset, count }) {
  if (error) {
    return (
      <div className="ai-response error" role="alert">
        <div className="ai-icon">⚠️</div>
        <div className="ai-body">
          <div className="ai-label">Error</div>
          <p className="ai-message ai-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-response" role="status">
      <div className="ai-icon">✦</div>
      <div className="ai-body">
        <div className="ai-label">AI Recommendation</div>
        <p className="ai-message">{message}</p>
        {count === 0 && (
          <button className="btn-ghost" style={{ marginTop: 10 }} onClick={onReset}>
            Browse all products
          </button>
        )}
      </div>
    </div>
  );
}
