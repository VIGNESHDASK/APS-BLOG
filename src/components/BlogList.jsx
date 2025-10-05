// // src/components/BlogList.jsx
// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import BlogCard from './BlogCard';

// export default function BlogList({ blogs }) {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const filterTag = params.get('tag');

//   // Filter blogs by hashtag (case-insensitive)
//   const filtered = filterTag
//     ? blogs.filter(b =>
//         (b.tags || []).some(tag => tag.toUpperCase() === filterTag.toUpperCase())
//       )
//     : blogs;

//   // Sort blogs by date (newest first)
//   const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

//   if (!sorted.length) return <p className="empty">No blogs found.</p>;

//   return (
//     <div className="blog-list">
//       {sorted.map(blog => (
//         <Link key={blog.id} to={`/blog/${blog.id}`} className="no-decoration">
//           <BlogCard blog={blog} />
//         </Link>
//       ))}
//     </div>
//   );
// }

