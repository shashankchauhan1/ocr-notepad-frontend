// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateNote from './components/CreateNote';
import ViewNotes from './components/ViewNotes';
import ClickImage from './components/ClickImage';
import UploadImage from './components/UploadImage';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes (no login required) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes (login required) */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />

          {/* click and upload */}
          <Route path="/click-image" element={<ProtectedRoute><ClickImage /> </ProtectedRoute> } />
          <Route path="/upload-image" element={<ProtectedRoute><UploadImage /></ProtectedRoute>} />

          <Route path="/notes" element={<ProtectedRoute><ViewNotes /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;