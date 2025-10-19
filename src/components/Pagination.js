// src/components/Pagination.js
import React from 'react';

export default function Pagination({ page, onChange, hasMore }) {
  return (
    <div className="pagination">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page <= 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => onChange(page + 1)} disabled={!hasMore}>
        Next
      </button>
    </div>
  );
}