// src/components/PostItem.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import { deletePost, replyPost, deleteReply } from '../services/api';

function pickFirst(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) return obj[k];
  }
  return undefined;
}

export default function PostItem({ post, currentUser, onRefresh }) {
  const [showRaw, setShowRaw] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  
  // Get current page location
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/post/');

  const title = pickFirst(post, ['title', 'subject', 'heading']) ||
    (pickFirst(post, ['post', 'body', 'content', 'message', 'text']) || '').slice(0, 80) || 'Untitled';

  const author = pickFirst(post, ['author', 'username', 'name', 'user']) || 'Anonymous';
  const postId = pickFirst(post, ['id', 'post_id', 'ID']) || null;

  const dateVal = pickFirst(post, ['date', 'created_at', 'timestamp', 'time']);
  let dateStr = null;
  if (dateVal) {
    try { dateStr = new Date(dateVal).toLocaleString(); } catch (e) { dateStr = String(dateVal); }
  }

  const body = pickFirst(post, ['body', 'content', 'post', 'message', 'text']) || '';

  async function handleDelete() {
    // ... (rest of the function is the same, no changes needed)
    if (!postId) return alert('Post id not found');
    if (!window.confirm('Delete this post?')) return;
    setLoadingAction(true);
    try {
      await deletePost(postId);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Delete failed: ' + (err.message || err));
    } finally { setLoadingAction(false); }
  }

  async function handleReply() {
    // ... (rest of the function is the same, no changes needed)
    if (!replyText) return alert('Reply cannot be empty');
    const userId = currentUser?.id || currentUser?.user_id || currentUser?.ID;
    if (!userId) return alert('You must be logged in to reply');
    setLoadingAction(true);
    try {
      await replyPost(userId, postId, replyText);
      setReplyText('');
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Reply failed: ' + (err.message || err));
    } finally { setLoadingAction(false); }
  }

  async function handleDeleteReply(replyId) {
    // ... (rest of the function is the same, no changes needed)
    if (!replyId) return alert('Reply id not found');
    if (!window.confirm('Delete this reply?')) return;
    setLoadingAction(true); 
    try {
      await deleteReply(replyId);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Delete reply failed: ' + (err.message || err));
    } finally { setLoadingAction(false); }
  }

  const postContent = (
    <>
      <h3>{title}</h3>
      <div className="post-meta">
        <span>{author}</span>
        {dateStr ? <span> • {dateStr}</span> : null}
      </div>
      <div className="post-body">{body}</div>
    </>
  );

  return (
    <article className="post-item">
      {/* If we are on the main list, make content a link. If not, just show it. */}
      {!isDetailPage && postId ? (
        <Link to={`/post/${postId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {postContent}
        </Link>
      ) : (
        postContent
      )}

      <div style={{marginTop: 8}}>
        <button onClick={() => setShowRaw(s => !s)} style={{fontSize: 12}}>
          {showRaw ? 'Hide raw' : 'Show raw'}
        </button>
        <button onClick={handleDelete} disabled={loadingAction} style={{fontSize: 12, marginLeft: 8}}>Delete</button>
      </div>

      {showRaw && (
        <pre style={{whiteSpace: 'pre-wrap', background: '#fafafa', padding: 8, marginTop: 8}}>
          {JSON.stringify(post, null, 2)}
        </pre>
      )}
      
      <div style={{marginTop: 8, display: 'flex', gap: 8}}>
        <input placeholder="Write a reply" value={replyText} onChange={e => setReplyText(e.target.value)} style={{flex: 1}} />
        <button onClick={handleReply} disabled={loadingAction}>Reply</button>
      </div>
      
      {Array.isArray(post.replies) && post.replies.length > 0 && (
        <div style={{marginTop: 12}}>
          <strong>Replies</strong>
          {post.replies.map(r => (
            <div key={r.id || r.reply_id || Math.random()} style={{borderTop: '1px solid #eee', paddingTop: 8, marginTop: 8}}>
              <div style={{fontSize: 14}}>{r.reply || r.content || r.text}</div>
              <div style={{fontSize: 12, color: '#666'}}>By: {r.username || r.author || 'Anonymous'}</div>
              <div>
                <button onClick={() => handleDeleteReply(r.id || r.reply_id)} style={{fontSize: 12, marginTop: 6}}>
                  Delete reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}