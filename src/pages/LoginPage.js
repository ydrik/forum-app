// src/pages/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }) {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        Don't have an account? <Link to="/register">Create one</Link>
      </div>
    </div>
  );
}