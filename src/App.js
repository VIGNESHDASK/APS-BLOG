// src/App.js
import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Header from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SAMPLE_BLOGS } from './constants';
import './styles.css';

export default function App() {
  const [blogs, setBlogs] = useLocalStorage('blogs', SAMPLE_BLOGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addBlog = useCallback((newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  }, [setBlogs]);

  const deleteBlog = useCallback((id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  }, [setBlogs]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <Header onToggle={toggleSidebar} isMobile={isMobile} />
        
        {/* For mobile: overlay sidebar, For desktop: permanent sidebar */}
        {isMobile ? (
          sidebarOpen && <Sidebar onClose={closeSidebar} isMobile={true} />
        ) : (
          <Sidebar onClose={closeSidebar} isMobile={false} />
        )}

        <div className={`app-container ${!isMobile ? 'with-sidebar' : ''}`}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BlogList blogs={blogs} />} />
              <Route path="/create" element={<BlogForm onSubmit={addBlog} />} />
              <Route 
                path="/blog/:id" 
                element={<BlogDetail blogs={blogs} onDelete={deleteBlog} />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>

  );
}




