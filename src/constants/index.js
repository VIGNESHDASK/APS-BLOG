// src/constants/index.js

export const SAMPLE_BLOGS = [
    {
      id: '1',
      title: 'Getting started with React',
      content: 'React is a powerful library for building UIs. This post introduces components, state, and props.',
      tags: ['react', 'frontend'],
      date: new Date().toLocaleString(),
    },
    {
      id: '2',
      title: 'How to use LocalStorage',
      content: 'LocalStorage is a simple way to persist small amounts of data on the client.',
      tags: ['webdev', 'localstorage'],
      date: new Date().toLocaleString(),
    },
  ];
  
  export const MIN_TAGS_REQUIRED = 2;
  
  export const PREVIEW_CONTENT_LENGTH = 200;