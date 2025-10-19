// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../services/api';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser(username, password);
      if (res === false) {
        setError('Invalid credentials');
      } else {
        onLogin(res.user); // Pass just the user object
        navigate('/'); // Navigate to home page on success
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-section">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="First name (username)" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Last name (password)" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
        </div>
      </form>
      {error && <div className="status-message error-message">Error: {error}</div>}
    </section>
  );
}