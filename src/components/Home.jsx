import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">
          Welcome to <span className="appName">NottePreziosa</span>
        </h1>
        <p className="subtitle">
          Your private notes. Write, save, and access anywhere — write
          with intention. Keep it safe. Keep it timeless.
        </p>
        <p className="tagline">
          <span className="appName">NottePreziosa</span> — because in a noisy world, privacy is power.
        </p>

        <div className="button-container">
          <button className="button" onClick={() => navigate('/create')}>
            ✍️ Create Note
          </button>
          <button className="button" onClick={() => navigate('/notes')}>
            📖 View Notes
          </button>
          <button className="button" onClick={() => navigate('/click-image')}>
            📸 Click Image
          </button>
          <button className="button" onClick={() => navigate('/upload-image')}>
            📂 Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;