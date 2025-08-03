import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleSaveNote = async () => {
    if (!title.trim()) {
      setMessage('Note title cannot be empty!');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes/create',
        { title, content },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setTitle('');
      setContent('');
      setTimeout(() => {
        navigate('/notes');
      }, 500);
    } catch (err) {
      console.error('Note save error:', err);
      setMessage('Error saving note');
    }
  };

  const handleGoBack = () => {
    if (title || content) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (!confirmLeave) return;
    }
    navigate('/home');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardStyle = isMobile ? { ...styles.card, ...mobileStyles.card } : styles.card;
  const headingStyle = isMobile ? { ...styles.heading, ...mobileStyles.heading } : styles.heading;
  const inputStyle = isMobile ? { ...styles.input, ...mobileStyles.input } : styles.input;
  const textareaStyle = isMobile ? { ...styles.textarea, ...mobileStyles.textarea } : styles.textarea;
  const buttonStyle = isMobile ? { ...styles.button, ...mobileStyles.button } : styles.button;

  return (
    <div style={styles.page}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>✍️ Write Your Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />
        <div style={styles.buttonRow}>
          <button onClick={handleSaveNote} style={buttonStyle}>Save Note</button>
          <button onClick={handleGoBack} style={{ ...buttonStyle, backgroundColor: '#555' }}>Go Back</button>
        </div>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Inline styles (just placeholders if you're using CSS)
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#f2f2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    color: '#ffffff',
    marginBottom: '1.5rem',
    fontSize: '2.5rem',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#f2f2f2',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#f2f2f2',
    fontSize: '1rem',
    minHeight: '150px',
    resize: 'vertical',
  },
  button: {
    padding: '1rem 2rem',
    borderRadius: '8px',
    backgroundColor: '#a66bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    marginRight: '0.5rem',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  message: {
    textAlign: 'center',
    color: '#00bfff',
    marginTop: '1rem',
  },
};

const mobileStyles = {
  card: { padding: '1.5rem' },
  heading: { fontSize: '2rem' },
  input: { padding: '0.75rem 1rem' },
  textarea: { padding: '0.75rem 1rem' },
  button: { padding: '0.75rem 1.5rem', width: '100%' },
};

export default CreateNote;
