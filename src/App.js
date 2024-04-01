import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/Pages/HomePage';
import Header from './components/Layout/Hearder';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;