import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddForm from './pages/AddForm'; // Import the AddForm component

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AddForm />} />
        </Routes>
    </Router>
  );
}

export default App;
