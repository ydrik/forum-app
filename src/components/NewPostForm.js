// src/components/NewPostForm.js
import React, { useState } from 'react';
import { createPost } from '../services/api';

export default function NewPostForm({ currentUser, onSuccess }) {
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    
    // Client validation
    if (postText.trim() === '') {
      setError('Post cannot be empty.');
      return;
    }
    
    const userId = currentUser?.id;
    if (!userId) {
      setError('Could not find user ID. Please log in again.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await createPost(Number(userId), postText);
      setResult(res);
      setPostText('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-section">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="What's on your mind?" 
            value={postText} 
            onChange={e => setPostText(e.target.value)} 
            style={{flex: '1 1 300px'}} 
          />
          {/* --- Updated disabled check (Feature 4) --- */}
          <button 
            type="submit" 
            disabled={loading || postText.trim() === ''}
          >
            {loading ? 'Posting…' : 'Post'}
          </button>
        </div>
      </form>

      {error && <div className="status-message error-message">Error: {error}</div>}
    </section>
  );
}