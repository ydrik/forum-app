// src/pages/PostDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostById } from '../services/api';
import PostItem from '../components/PostItem';

export default function PostDetailPage({ currentUser }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams(); // Gets the 'postId' from the URL

  const loadPost = () => {
    setLoading(true);
    setError(null);
    fetchPostById(postId)
      .then(setPost)
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  };
  
  useEffect(loadPost, [postId]);

  return (
    <div>
      <Link to="/">&larr; Back to all posts</Link>
      
      {loading && <div>Loading post...</div>}
      
      {error && (
        <div className="status-message error-message">
          Error loading post: {error}
        </div>
      )}
      
      {post && (
        <PostItem 
          post={post} 
          currentUser={currentUser} 
          onRefresh={loadPost} 
        />
      )}
    </div>
  );
}