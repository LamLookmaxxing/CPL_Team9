import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/Pages/HomePage';
import Header from './components/Layout/Hearder';
import Footer from './components/Layout/Footer';
import UserInfo from './components/UserInfo'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Header />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;