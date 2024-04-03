import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import Headers from './components/Layout/Headers';
import Footer from './components/Layout/Footer';
import LoginForm from './components/Authentication/LoginForm';
import Article from './components/article/Article';


function App() {
  return (
    <Router>
      <div>
        <Headers />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<Article/>} />
          <Route path="/login" element={<LoginForm/>} /> {/* Thêm route này */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
