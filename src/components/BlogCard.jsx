
// src/components/BlogCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleTagClick = (e, tag) => {
    // prevent the parent <Link> from receiving this click
    e.stopPropagation();
    e.preventDefault();
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const handleTagKeyDown = (e, tag) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTagClick(e, tag);
    }
  };

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p className="date">{blog.date}</p>
      <p>
        {(blog.content || '').slice(0, 200)}
        {(blog.content || '').length > 200 ? '...' : ''}
      </p>

      <div className="tags">
        {(blog.tags || []).map((t, i) => (
          <span
            key={i}
            className="tag"
            role="button"
            tabIndex={0}
            onClick={(e) => handleTagClick(e, t)}
            onKeyDown={(e) => handleTagKeyDown(e, t)}
            aria-label={`Filter by ${t}`}
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}

