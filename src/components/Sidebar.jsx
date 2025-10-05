
// // src/components/Sidebar.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Sidebar({ onClose, isMobile }) {
//   const [searchTag, setSearchTag] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const tag = searchTag.trim();
//     if (tag) navigate(`/?tag=${encodeURIComponent(tag)}`);
//     else navigate('/');
    
//     // Only close sidebar on mobile after search
//     if (isMobile) onClose();
//   };

//   const handleNavClick = () => {
//     // Only close sidebar on mobile after navigation
//     if (isMobile) onClose();
//   };

//   return (
//     <aside className={`sidebar ${isMobile ? 'mobile' : 'desktop'}`}>
//       {/* Only show close button on mobile */}
//       {isMobile && (
//         <button className="close-btn" onClick={onClose} aria-label="Close menu">
//           ✖
//         </button>
//       )}
      
//       <h2>📘 APS DAILY</h2>
      
//       <nav>
//         <Link to="/" className="nav-btn" onClick={handleNavClick}>
//           🏠 Home
//         </Link>
//         <Link to="/create" className="nav-btn" onClick={handleNavClick}>
//           ✏️ Post
//         </Link>
//       </nav>
      
//       <form onSubmit={handleSearch} className="search-box">
//         <input
//           type="text"
//           placeholder="#Search hashtag"
//           value={searchTag}
//           onChange={(e) => setSearchTag(e.target.value)}
//         />
//         <button type="submit">🔍</button>
//       </form>
//     </aside>
//   );
// }
