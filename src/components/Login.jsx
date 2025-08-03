import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Use the useContext hook to get the setIsLoggedIn function
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://ocr-notepad-backend.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Call setIsLoggedIn to update the global state
        setIsLoggedIn(true);
        navigate('/home');
      }
    } catch (err) {
      setShowError(true);
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleLogin}>
          <h2 style={styles.heading}>Login</h2>

          {showError && (
            <p style={styles.error}> Incorrect email or password</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.redirectText}>
            Not registered?
            <Link to="/signup" style={styles.link}> Signup</Link>
          </p>
        </form>
      </div>
    );
  };

  // Your styles object (unchanged)
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1e1e1e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    form: {
      backgroundColor: '#2c2c2c',
      padding: '2rem',
      borderRadius: '15px',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontfamily: 'verdana',
      fontSize: '1.8rem',
      marginBottom: '1.5rem',
    },
    input: {
      padding: '1rem',
      marginBottom: '1.2rem',
      border: '1px solid #888',
      borderRadius: '8px',
      backgroundColor: '#3c3c3c',
      color: 'white',
      fontSize: '1rem',
      fontfamily: 'verdana',
      outline: 'none',
      transition: 'border 0.3s',
    },
    button: {
      padding: '1rem',
      backgroundColor: '#6a0dad',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1rem',
      fontfamily: 'verdana',
      transition: 'background 0.3s',
    },
    error: {
      color: '#ff4d4d',
      marginBottom: '1rem',
      fontSize: '0.95rem',
      textAlign: 'center',
      backgroundColor: '#3c0000',
      borderRadius: '5px',
      padding: '0.5rem',
    },
    redirectText: {
      color: '#cccccc',
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.95rem',
    },
    link: {
      color: '#b19cd9',
      textDecoration: 'underline',
      marginLeft: '6px',
      fontfamily: 'verdana',
    },
  };

  export default Login;
