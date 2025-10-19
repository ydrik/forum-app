// src/components/CreateUserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // --- New State for Feature 4 ---
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null); // For client-side errors
  // ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For API errors
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setFormError(null); // Reset client error

    // --- New Validation Logic (Feature 4) ---
    if (!username || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return; // Stop before calling API
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return; // Stop before calling API
    }
    // ---

    setLoading(true);
    try {
      const data = await createUser(username, password);
      setResult(data);
      setUsername('');
      setPassword('');
      setConfirmPassword(''); // Clear confirm field
      alert('User created successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message || String(err)); // API error
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-section">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="First name (username)" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-row">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* New Confirm Password Field */}
          <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form-row" style={{justifyContent: 'flex-end'}}>
          <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create'}</button>
        </div>
      </form>
      
      {/* Show client-side error OR API error */}
      {formError && <div className="status-message error-message">Error: {formError}</div>}
      {error && <div className="status-message error-message">Error: {error}</div>}

      {result && (
        <div className="status-message success-message">
          <strong>User created:</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}