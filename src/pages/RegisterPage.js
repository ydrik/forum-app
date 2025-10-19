// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm';

export default function RegisterPage() {
  return (
    <div>
      <CreateUserForm />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}