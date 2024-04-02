import HomePage from './components/Pages/HomePage';
import ArticleDetail from './components/Pages/ArticleDetail';
import Headers from './components/Layout/Headers';
import Footer from './components/Layout/Footer';
import Login from './components/Authentication/Login'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Authentication/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
