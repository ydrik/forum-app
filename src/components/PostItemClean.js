import React, { useState } from 'react';
import { deletePost, replyPost, deleteReply } from '../services/api';

function pickFirst(obj, keys) {
  for (const k of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) return obj[k];
  }
  return undefined;
}

export default function PostItemClean({ post, currentUser, onRefresh }) {
  const [showRaw, setShowRaw] = useState(false);
  const [replyText, setReplyText] = useState('');

  const title = pickFirst(post, ['title', 'subject', 'heading']) ||
    (pickFirst(post, ['post', 'body', 'content', 'message', 'text']) || '').slice(0, 80) || 'Untitled';
  const author = pickFirst(post, ['author', 'username', 'name', 'user']) || 'Anonymous';

  return (
    <article className="post-item">
      <h3>{title}</h3>
      <div className="post-meta">{author}</div>
      <div className="post-body">{pickFirst(post, ['body', 'content', 'post', 'message', 'text'])}</div>
      <div style={{marginTop:8}}>
        <button onClick={() => setShowRaw(s => !s)}>{showRaw ? 'Hide raw' : 'Show raw'}</button>
      </div>
      {showRaw && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(post, null, 2)}</pre>}
    </article>
  );
}
