// src/pages/ForumPage.js
import React, { useEffect, useState, useMemo } from 'react';
import { fetchPosts } from '../services/api';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import NewPostForm from '../components/NewPostForm';

// Helper function (copied from PostItem.js) to safely get post data
function pickFirst(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) return obj[k];
  }
  return undefined;
}

export default function ForumPage({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  // State for new features
  const [searchTerm, setSearchTerm] = useState('');
  const [showMyPosts, setShowMyPosts] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    setError(null);
    fetchPosts(page)
      .then((data) => {
        setPosts(data);
        setHasMore(Array.isArray(data) && data.length > 0);
      })
      .catch((err) => {
        setError(err.message || String(err));
        setPosts([]);
        setHasMore(false);
      })
      .finally(() => setLoading(false));
  };
  
  useEffect(loadPosts, [page]);

  const refreshPosts = () => {
    if (page === 1) {
      loadPosts(); // If already on page 1, just reload
    } else {
      setPage(1); // Go to page 1 (which will trigger useEffect to reload)
    }
  };

  // Filtering Logic (Features 2 & 3)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Feature 3: "My Posts" Toggle
      if (showMyPosts) {
        // Use pickFirst to safely get the post's author ID
        const postAuthorId = pickFirst(post, ['user_id', 'author_id', 'uid']);
        if (String(postAuthorId) !== String(currentUser?.id)) {
          return false;
        }
      }

      // Feature 2: Search Filter
      if (searchTerm.trim() !== '') {
        const lowerSearch = searchTerm.toLowerCase();
        
        // Safely get post content and author
        const postContent = pickFirst(post, ['post', 'body', 'content', 'text']) || '';
        const postAuthor = pickFirst(post, ['author', 'username', 'name']) || '';

        const contentMatch = postContent.toLowerCase().includes(lowerSearch);
        const authorMatch = postAuthor.toLowerCase().includes(lowerSearch);

        if (!contentMatch && !authorMatch) {
          return false;
        }
      }
      
      return true; // Keep the post if it passes all filters
    });
  }, [posts, searchTerm, showMyPosts, currentUser]);

  return (
    <>
      <NewPostForm currentUser={currentUser} onSuccess={refreshPosts} />

      {/* --- UI for Features 2, 3, & 5 --- */}
      <div className="forum-controls form-section">
        {/* Row 1: Search + Refresh */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={refreshPosts} disabled={loading} className="refresh-button">
            {loading ? '...' : 'Refresh'}
          </button>
        </div>
        
        {/* Row 2: Toggle */}
        <div className="toggle-row">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showMyPosts}
              onChange={e => setShowMyPosts(e.target.checked)}
            />
            Show only my posts
          </label>
        </div>
      </div>
      {/* --- End of UI --- */}
      
      <div className="posts-section">
        {loading && <div>Loading posts…</div>}
        {error && (
          <div className="status-message error-message">Error loading posts: {error}</div>
        )}

        {!loading && !error && (
          // Use the new filteredPosts array
          <PostList posts={filteredPosts} currentUser={currentUser} onRefresh={refreshPosts} />
        )}
        
        {!loading && !error && filteredPosts.length === 0 && (
          <div style={{textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '8px'}}>
            No posts found.
          </div>
        )}

        <Pagination page={page} onChange={setPage} hasMore={hasMore} />
      </div>
    </>
  );
}