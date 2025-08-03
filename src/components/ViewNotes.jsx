import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('https://ocr-notepad-backend.onrender.com/api/notes', {
        withCredentials: true,
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`https://ocr-notepad-backend.onrender.com/api/notes/${id}`, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      setMessage('Error deleting note');
    }
  };

  // Effect to fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Effect to handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Conditionally apply styles based on screen size
  const notesGridStyle = isMobile ? { ...styles.notesGrid, ...mobileStyles.notesGrid } : styles.notesGrid;
  const noteCardStyle = isMobile ? { ...styles.noteCard, ...mobileStyles.noteCard } : styles.noteCard;
  const headingStyle = isMobile ? { ...styles.heading, ...mobileStyles.heading } : styles.heading;
  const titleStyle = isMobile ? { ...styles.title, ...mobileStyles.title } : styles.title;
  const contentStyle = isMobile ? { ...styles.content, ...mobileStyles.content } : styles.content;
  const buttonStyle = isMobile ? { ...styles.button, ...mobileStyles.button } : styles.button;

  return (
    <div style={styles.page}>



<button
  onClick={() => navigate('/home')}
  style={{
    marginBottom: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2b2b2b',
    color: '#a66bff',
    border: '1px solid #444',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  }}
>
  ← Go Back
</button>




      <div style={styles.container}>
        <h2 style={headingStyle}>📖 Your Notes</h2>
        {message && <p style={styles.message}>{message}</p>}
        {notes.length > 0 ? (
          <div style={notesGridStyle}>
            {notes.map((note) => (
              <div key={note._id} style={noteCardStyle}>
                <h3 style={titleStyle}>{note.title}</h3>
                <p style={contentStyle}>{note.content}</p>
                <button onClick={() => handleDelete(note._id)} style={buttonStyle}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.message}>No notes found.</p>
        )}
      </div>
    </div>
  );
};

// Base styles (for larger screens)
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#121212', // Darkest grey
    padding: '2rem',
    color: '#f2f2f2', // Off-white
    fontFamily: 'serif',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: '#a66bff', // Violet
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  notesGrid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  },
  noteCard: {
    backgroundColor: '#1e1e1e', // Dark grey
    border: '1px solid #333',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
  },
  title: {
    color: '#9F67F9', // Purple
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
  },
  content: {
    color: '#cccccc', // Light grey
    lineHeight: 1.5,
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginTop: '1rem',
    backgroundColor: '#7F56D9', // Purple
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    marginTop: '2rem',
    fontStyle: 'italic',
    color: '#999',
  },
};

// Mobile-specific styles (applied when isMobile is true)
const mobileStyles = {
  container: {
    padding: '1rem',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  notesGrid: {
    gridTemplateColumns: '1fr', // Stack notes on top of each other
  },
  noteCard: {
    padding: '1rem',
  },
  title: {
    fontSize: '1.1rem',
  },
  content: {
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.6rem 0.8rem',
    fontSize: '0.9rem',
  },
};

export default ViewNotes;