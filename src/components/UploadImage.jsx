import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UploadImage.css';

const UploadImage = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      setText('');
      setSaved(false);
      extractText(imgUrl);
    }
  };

  const extractText = async (imgUrl) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(imgUrl, 'eng');
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
        'http://localhost:5000/api/notes/create',
        {
          title: 'Extracted from Image',
          content: text, // Use the potentially edited text
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
      <h2>📤 Upload Image</h2>
      
      <div className="upload-section">
        <label htmlFor="file-upload" className="custom-file-upload">
          {image ? 'Change Image' : 'Choose Image to Upload'}
        </label>
        <input 
          id="file-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="file-input"
        />
      </div>

      <div className="content-section">
        {loading && <p>Processing image...</p>}
        
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded" className="responsive-image" />
          </div>
        )}
        
        {text && (
          <div className="text-section">
            <h3>Extracted Text:</h3>
            <textarea 
              value={text} 
              onChange={handleTextChange} // Add onChange handler
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

export default UploadImage;