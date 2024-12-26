import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddForm from './pages/AddForm'; // Import the AddForm component
import Home from './pages/Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<AddForm />} />
        </Routes>
    </Router>
  );
}

export default App;
