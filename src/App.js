import "./App.css";
import Header from "./components/HeFoot/Header/Header";
import Footer from "./components/HeFoot/Foot/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from "./components/common/Articles";
import ArticleDetail from "./components/common/ArticleDetail";
import Settings from "./components/profile/Settings";
import Profile from "./components/profile/Profile";
import Favorite from "./components/profile/Favorite";
import { AuthProvider } from "./components/application/Authen";
import { FavoriteProvider } from "./components/application/favor";
import EditArticle from "./components/common/EditArticle";
import ProfileAuthor from "./components/profile/ProfileAuthor";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CreateArticles from "./components/common/CreateArticles";

function App() {
  return (
    <FavoriteProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route
              path="/profileAuthor/:username"
              element={<ProfileAuthor />}
            />

            <Route path="/profile/:username/favorites" element={<Favorite />} />

            <Route path="/CreateArticles" element={<CreateArticles />} />
            <Route path="/edit/:slug" element={<EditArticle />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </FavoriteProvider>
  );
}

export default App;
