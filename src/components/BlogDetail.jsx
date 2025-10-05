

// // src/components/BlogDetail.jsx
// import React from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';

// export default function BlogDetail({ blogs, onDelete }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const blog = (blogs || []).find(b => b.id === id);

//   if (!blog) return <p className="empty">Blog not found.</p>;

//   const handleTagClick = (tag) => {
//     // Navigate to listing page filtered by hashtag
//     navigate(`/?tag=${encodeURIComponent(tag)}`);
//   };

//   const handleDelete = () => {
//     if (window.confirm('Delete this blog?')) {
//       onDelete(blog.id);
//       navigate('/');
//     }
//   };

//   return (
//     <div className="blog-detail">
//       <Link to="/" className="back-link">⬅ Back</Link>
//       <h2>{blog.title}</h2>
//       <p className="date">{blog.date}</p>
//       <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>

//       {/* Clickable hashtags */}
//       <div className="tags" style={{ marginTop: 12 }}>
//         {(blog.tags || []).map((t, i) => (
//           <span key={i} className="tag" onClick={() => handleTagClick(t)}>
//             #{t}
//           </span>
//         ))}
//       </div>

//       <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
//     </div>
//   );
// }
