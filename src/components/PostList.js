import React from 'react';
// 1. CHANGE THIS LINE:
import PostItem from './PostItem'; 

export default function PostList({ posts, currentUser, onRefresh }) {
  if (!posts || posts.length === 0) {
      return <div>No posts found.</div>;
  }

  return (
    <div className="post-list">
        {posts.map((p) => (
          // 2. AND CHANGE THIS LINE:
          <PostItem key={p.id || p.post_id || Math.random()} post={p} currentUser={currentUser} onRefresh={onRefresh} />
        ))}
    </div>
  );
}