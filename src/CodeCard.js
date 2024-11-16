import React, { useState, useEffect } from 'react';
import './CodeCard.css';

const CodeCard = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [explanation, setExplanation] = useState('');
  const [submittedCodes, setSubmittedCodes] = useState([]);

  // Load codes from localStorage when the component mounts
  useEffect(() => {
    const savedCodes = JSON.parse(localStorage.getItem('codes')) || [];
    setSubmittedCodes(savedCodes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!title || !code || !difficulty || !explanation) {
      alert('Please fill in all fields');
      return;
    }

    // Create new code object
    const newCode = { title, code, difficulty, explanation };

    // Update submitted codes in the state
    const updatedCodes = [...submittedCodes, newCode];

    // Save the updated codes to localStorage
    localStorage.setItem('codes', JSON.stringify(updatedCodes));

    // Update state with the new codes
    setSubmittedCodes(updatedCodes);

    // Reset the form fields
    setTitle('');
    setCode('');
    setDifficulty('');
    setExplanation('');
  };

  const handleDelete = (index) => {
    // Remove the code at the given index
    const updatedCodes = submittedCodes.filter((_, i) => i !== index);

    // Update the state and localStorage with the new list
    setSubmittedCodes(updatedCodes);
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
  };

  return (
    <div className="leetbank-container">
      <div className="content-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <h3>Add LeetCode Code</h3>

            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Code:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <label>Difficulty:</label>
            <div className="difficulty-options">
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="Easy"
                checked={difficulty === 'Easy'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="easy">Easy</label>

              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="Medium"
                checked={difficulty === 'Medium'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="medium">Medium</label>

              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="Hard"
                checked={difficulty === 'Hard'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              <label htmlFor="hard">Hard</label>
            </div>

            <label>Explanation:</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Submitted Codes Section */}
        <div className="submitted-section">
          <h3>Submitted Codes</h3>
          {submittedCodes.map((codeData, index) => (
            <div key={index} className="submitted-item">
              <h4>{codeData.title}</h4>
              <p><strong>Difficulty:</strong> {codeData.difficulty}</p>
              <p><strong>Explanation:</strong> {codeData.explanation}</p>
              <pre>{codeData.code}</pre>

              {/* Delete Button */}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
