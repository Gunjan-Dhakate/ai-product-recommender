import React from "react";

export default function SearchBar({ value, onChange, onSearch, loading }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" && value.trim()) {
      onSearch(value.trim());
    }
  }

  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="text"
        placeholder='e.g. "wireless headphones for gym under $150"'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        aria-label="Product preference input"
      />
      <button
        className="btn-primary"
        onClick={() => value.trim() && onSearch(value.trim())}
        disabled={loading || !value.trim()}
      >
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Thinking…
          </>
        ) : (
          "Find for me"
        )}
      </button>
    </div>
  );
}
