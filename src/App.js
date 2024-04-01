import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import ArticleDetail from './components/Pages/ArticleDetail';
import Headers from './components/Layout/Headers';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <div>
        <Headers />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticleDetail/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
