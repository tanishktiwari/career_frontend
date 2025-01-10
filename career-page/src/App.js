import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPages from './Components/AuthPages'; // Assuming you have AuthPages.js in Components folder
import List from './Components/list'; // Assuming you have List.js in Components folder
import JobsPortal from './Components/JobsPortal'; // Assuming you have JobsPortal.js in Components folder
import CreateJob from './Components/CreateJob';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define the routes for each component */}
        <Routes>
          <Route path="/auth" element={<AuthPages />} /> {/* Login/Signup */}
          <Route path="/list" element={<List />} /> {/* Job list */}
          <Route path='/createjob' element={<CreateJob/>} /> {/* Create job */}
          <Route path="/" element={<JobsPortal />} /> {/* Main Jobs Portal page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
