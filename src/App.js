// src/App.js
import React, { useState } from 'react';
// Import useNavigate
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import './App.css';

// Import your pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForumPage from './pages/ForumPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Initialize the hook

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  // Add this logout function
  const handleLogout = () => {
    setCurrentUser(null); // Clear the user
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forum</h1>
        
        {/* Add this button. It will only show if currentUser exists */}
        {currentUser && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      
      <main className="main-container">
        <Routes>
          {/* ... all your routes ... */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Main Forum Page */}
          <Route 
            path="/"
            element={
              currentUser ? (
                <ForumPage currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace /> 
              )
            } 
          />
          
          {/* New Post Detail Page */}
          <Route 
            path="/post/:postId"
            element={
              currentUser ? (
                <PostDetailPage currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;