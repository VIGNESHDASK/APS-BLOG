import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogForm({ onSubmit }) {
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [tags,setTags]=useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = tags.split(',').map(t=>t.trim().toUpperCase()).filter(Boolean);
    if(!title.trim() || !content.trim()){ alert('Please fill title and content'); return; }
    if(tagArray.length<2){ alert('Enter at least 2 hashtags'); return; }
    const newBlog={id:Date.now().toString(),title:title.trim(),content:content.trim(),tags:tagArray,date:new Date().toLocaleString()};
    onSubmit(newBlog);
    setTitle(''); setContent(''); setTags('');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Post a Story</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Blog Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder="Write your blog content..." rows={8} value={content} onChange={(e)=>setContent(e.target.value)} />
        <input placeholder="Comma separated hashtags" value={tags} onChange={(e)=>setTags(e.target.value)} />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
