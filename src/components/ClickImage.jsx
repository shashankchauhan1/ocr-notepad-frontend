import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UploadImage.css'; // Reusing the same CSS file

const ClickImage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const captureImage = () => {
    // Take a screenshot from the webcam feed
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
    setText(''); // Clear previous text
    setSaved(false); // Reset saved status
    extractText(screenshot);
  };

  const extractText = async (img) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(img, 'eng');
      setText(result.data.text);
    } catch (err) {
      console.error('OCR error:', err);
      setText('Error extracting text');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!text.trim()) {
      alert('Cannot save an empty note.');
      return;
    }
    try {
      await axios.post(
        'https://ocr-notepad-backend.onrender.com/api/notes/create',
        {
          title: 'Extracted from Webcam', // Changed title to be more specific
          content: text,
        },
        { withCredentials: true }
      );
      setSaved(true);
      alert('Note saved successfully!');
      navigate('/notes');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving note');
    }
  };

  const handleGoBack = () => {
    if (!saved && text.trim() !== '') {
      const confirmDiscard = window.confirm('You have unsaved text. Discard and go back?');
      if (!confirmDiscard) return;
    }
    navigate('/home');
  };
  
  const handleTextChange = (e) => {
    setText(e.target.value);
    setSaved(false); // Mark as not saved if text is edited
  };

  return (
    <div className="upload-container">
      <h2>📷 Capture Image</h2>
      
      <div className="content-section">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="responsive-image" // Use the same image class for responsiveness
        />
        <div className="button-group">
            <button onClick={captureImage} className="button save-button">Capture Image</button>
        </div>
        
        {loading && <p>Processing image...</p>}
        
        {image && (
          <div className="image-preview">
            <img src={image} alt="Captured" className="responsive-image" />
          </div>
        )}
        
        {text && (
          <div className="text-section">
            <h3>Extracted Text:</h3>
            <textarea
              value={text}
              onChange={handleTextChange}
              rows={10}
              className="responsive-textarea"
            />
          </div>
        )}
      </div>

      <div className="button-group">
        {text && (
          <button onClick={handleSaveNote} className="button save-button">
            Save as Note
          </button>
        )}
        <button onClick={handleGoBack} className="button go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ClickImage;