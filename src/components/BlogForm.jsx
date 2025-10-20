// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function BlogForm({ onSubmit }) {
//   const [title,setTitle]=useState('');
//   const [content,setContent]=useState('');
//   const [tags,setTags]=useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const tagArray = tags.split(',').map(t=>t.trim().toUpperCase()).filter(Boolean);
//     if(!title.trim() || !content.trim()){ alert('Please fill title and content'); return; }
//     if(tagArray.length<2){ alert('Enter at least 2 hashtags'); return; }
//     const newBlog={id:Date.now().toString(),title:title.trim(),content:content.trim(),tags:tagArray,date:new Date().toLocaleString()};
//     onSubmit(newBlog);
//     setTitle(''); setContent(''); setTags('');
//     navigate('/');
//   };

//   return (
//     <div className="form-container">
//       <h2>Post a Story</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Blog Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
//         <textarea placeholder="Write your blog content..." rows={8} value={content} onChange={(e)=>setContent(e.target.value)} />
//         <input placeholder="Comma separated hashtags" value={tags} onChange={(e)=>setTags(e.target.value)} />
//         <button type="submit">Publish</button>
//       </form>
//     </div>
//   );
// }



// src/components/BlogForm.jsx
import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseTags, generateId } from '../utils';
import { MIN_TAGS_REQUIRED } from '../constants';

export default function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const validateForm = useCallback((title, content, tagArray) => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return false;
    }
    if (tagArray.length < MIN_TAGS_REQUIRED) {
      alert(`Please enter at least ${MIN_TAGS_REQUIRED} hashtags`);
      return false;
    }
    return true;
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const tagArray = parseTags(tags);
    
    if (!validateForm(title, content, tagArray)) {
      return;
    }

    const newBlog = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      tags: tagArray,
      date: new Date().toLocaleString(),
    };

    onSubmit(newBlog);
    
    // Reset form
    setTitle('');
    setContent('');
    setTags('');
    
    navigate('/');
  }, [title, content, tags, onSubmit, navigate, validateForm]);

  // Rich text formatting functions
  const applyFormat = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  }, []);

  const handleBold = () => applyFormat('bold');
  const handleItalic = () => applyFormat('italic');
  const handleUnderline = () => applyFormat('underline');
  const handleStrikethrough = () => applyFormat('strikeThrough');
  const handleOrderedList = () => applyFormat('insertOrderedList');
  const handleUnorderedList = () => applyFormat('insertUnorderedList');
  const handleAlignLeft = () => applyFormat('justifyLeft');
  const handleAlignCenter = () => applyFormat('justifyCenter');
  const handleAlignRight = () => applyFormat('justifyRight');
  
  const handleHeading = (level) => {
    applyFormat('formatBlock', `h${level}`);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      applyFormat('createLink', url);
    }
  };

  const handleColor = (e) => {
    applyFormat('foreColor', e.target.value);
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  return (
    <div className="form-container">
      <h2>Post a Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Rich Text Editor Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button type="button" onClick={handleBold} title="Bold" className="toolbar-btn">
              <strong>B</strong>
            </button>
            <button type="button" onClick={handleItalic} title="Italic" className="toolbar-btn">
              <em>I</em>
            </button>
            <button type="button" onClick={handleUnderline} title="Underline" className="toolbar-btn">
              <u>U</u>
            </button>
            <button type="button" onClick={handleStrikethrough} title="Strikethrough" className="toolbar-btn">
              <s>S</s>
            </button>
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-group">
            <button type="button" onClick={() => handleHeading(1)} title="Heading 1" className="toolbar-btn">
              H1
            </button>
            <button type="button" onClick={() => handleHeading(2)} title="Heading 2" className="toolbar-btn">
              H2
            </button>
            <button type="button" onClick={() => handleHeading(3)} title="Heading 3" className="toolbar-btn">
              H3
            </button>
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-group">
            <button type="button" onClick={handleAlignLeft} title="Align Left" className="toolbar-btn">
              ⬅
            </button>
            <button type="button" onClick={handleAlignCenter} title="Align Center" className="toolbar-btn">
              ⬌
            </button>
            <button type="button" onClick={handleAlignRight} title="Align Right" className="toolbar-btn">
              ➡
            </button>
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-group">
            <button type="button" onClick={handleOrderedList} title="Numbered List" className="toolbar-btn">
              1. 2. 3.
            </button>
            <button type="button" onClick={handleUnorderedList} title="Bullet List" className="toolbar-btn">
              • • •
            </button>
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-group">
            <button type="button" onClick={handleLink} title="Insert Link" className="toolbar-btn">
              🔗
            </button>
            <label className="toolbar-btn color-picker-label" title="Text Color">
              🎨
              <input
                type="color"
                onChange={handleColor}
                className="color-picker"
              />
            </label>
          </div>
        </div>

        {/* Rich Text Content Area */}
        <div
          ref={contentRef}
          className="rich-text-editor"
          contentEditable
          onInput={handleContentChange}
          data-placeholder="Write your blog content..."
          suppressContentEditableWarning
        />

        <input
          type="text"
          placeholder="Comma separated hashtags (e.g., react, frontend)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}