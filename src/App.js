// src/App.js
import React from 'react';
import Navbar from './Navbar';
import CodeForm from './CodeCard';
import './App.css';  // For styling
import CodeCard from './CodeCard';

const App = () => {
  return (
    <div>
      <Navbar />
      <CodeCard />
    </div>
  );
};

export default App;
