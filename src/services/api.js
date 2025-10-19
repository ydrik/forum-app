const BASE = 'http://hyeumine.com/forumGetPosts.php';

// Fetch posts (GET) with page parameter
export async function fetchPosts(page = 1) {
  const url = new URL(BASE);
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  // Expecting JSON array of posts
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('API returned unexpected data format; expected JSON array');
  }

  return data;
}


// Create a new user (POST)
const CREATE_USER_URL = 'http://hyeumine.com/forumCreateUser.php';

export async function createUser(username, password) {
  if (!username || !password) {
    throw new Error('username and password are required');
  }

  // Use form-encoded body since PHP backend often expects form params
  const body = new URLSearchParams();
  body.set('username', username);
  body.set('password', password);

  const res = await fetch(CREATE_USER_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create user failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const data = await res.json();
  if (!data || typeof data !== 'object') {
    throw new Error('API returned unexpected data format for createUser; expected JSON object');
  }

  return data;
}

// Login user (POST)
const LOGIN_URL = 'http://hyeumine.com/forumLogin.php';

export async function loginUser(username, password) {
  if (!username || !password) {
    throw new Error('username and password are required');
  }

  const body = new URLSearchParams();
  body.set('username', username);
  body.set('password', password);

  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed: ${res.status} ${res.statusText} - ${text}`);
  }

  // API returns either a JSON object with user details or the boolean false
  const data = await res.json();
  // return whatever the API gives (object or false)
  return data;
}

// Create a new post (POST)
const NEW_POST_URL = 'http://hyeumine.com/forumNewPost.php';

export async function createPost(userId, postText) {
  if (!userId || !postText) {
    throw new Error('userId and postText are required');
  }

  const body = new URLSearchParams();
  body.set('id', String(userId));
  body.set('post', postText);

  const res = await fetch(NEW_POST_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create post failed: ${res.status} ${res.statusText} - ${text}`);
  }

  // Expecting a boolean-like JSON response - true or false
  const data = await res.json();
  return data;
}

// Delete a post (GET)
const DELETE_POST_URL = 'http://hyeumine.com/forumDeletePost.php';

export async function deletePost(postId) {
  if (!postId) throw new Error('postId is required');
  const url = new URL(DELETE_POST_URL);
  url.searchParams.set('id', String(postId));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete post failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const data = await res.json();
  return data;
}

// Reply to a post (POST)
const REPLY_POST_URL = 'http://hyeumine.com/forumReplyPost.php';

export async function replyPost(user_id, post_id, reply) {
  if (!user_id || !post_id || !reply) {
    throw new Error('user_id, post_id and reply are required');
  }

  const body = new URLSearchParams();
  body.set('user_id', String(user_id));
  body.set('post_id', String(post_id));
  body.set('reply', reply);

  const res = await fetch(REPLY_POST_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Reply post failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const data = await res.json();
  return data;
}

// Delete a reply (GET)
const DELETE_REPLY_URL = 'http://hyeumine.com/forumDeleteReply.php';

export async function deleteReply(replyId) {
  if (!replyId) throw new Error('replyId is required');
  const url = new URL(DELETE_REPLY_URL);
  url.searchParams.set('id', String(replyId));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete reply failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const data = await res.json();
  return data;
}

const GET_POST_URL = 'http://hyeumine.com/forumGetPost.php';

export async function fetchPostById(postId) {
  if (!postId) throw new Error('postId is required');
  const url = new URL(GET_POST_URL);
  url.searchParams.set('id', String(postId));

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch post failed: ${res.status} ${res.statusText} - ${text}`);
  }
  
  // Expecting a single JSON object for the post, which includes a 'replies' array
  const data = await res.json();
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('API returned unexpected data format for fetchPostById; expected JSON object');
  }
  
  return data;
}

const api = { fetchPosts, createUser, loginUser, createPost, deletePost, replyPost, deleteReply, fetchPostById };
export default api;
