import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { formatDate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import style from "./Profile.module.css";

const Profile = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { username } = useParams();
  const [image, setImage] = useState("");
  const [usernameState, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [articles, setArticles] = useState([]);
  const [myArticles, setMyArticles] = useState([]);
  const [following, setFollowing] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchUserData(storedToken);
    }
    fetchUserYourArticles(username, storedToken);
  }, [username, currentPage]);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `https://api.realworld.io/api/profiles/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data.profile;
      setImage(userData.image);
      setUsername(userData.username);
      setEmail(userData.email);
      setBio(userData.bio);
      setFollowing(userData.following);
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };

  const fetchUserYourArticles = async (username, token) => {
    try {
      const response = await axios.get(
        `https://api.realworld.io/api/articles?limit=${itemsPerPage}&offset=${
          (currentPage - 1) * itemsPerPage
        }&author=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.articlesCount / itemsPerPage));
    } catch (error) {
      console.error("Fetching my articles failed:", error);
    }
  };

  const handleToArticleDetails = (slug) => {
    nav(`/article/${slug}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFollowClick = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/users/login");
    } else {
      const apiUrl = following
        ? `https://api.realworld.io/api/profiles/${username}/follow`
        : `https://api.realworld.io/api/profiles/${username}/follow`;

      const method = following ? "DELETE" : "POST";

      axios({
        method: method,
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => {
          setFollowing(!following);
        })
        .catch((error) => {
          console.error("Error occurred while toggling follow:", error);
        });
    }
  };

  return (
    <div className="profile">
      <div className="banner-profile">
        <div className="image-profile">
          <img src={image} alt="User"></img>
        </div>
        <div className="username">{usernameState}</div>
        <div>{bio}</div>
        <div className="button-banner">
          <button onClick={handleFollowClick}>
            {following ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="body-profile">
        <div className={style.navList}>
          <div className={style.navItemArticles}>
            <a>My Articles</a>
          </div>
          <div className={style.navItemFarvorite}>
            <Link to="favorites">
              <a>Favorited Articles</a>
            </Link>
          </div>
        </div>

        <div className={style.favoriteContainer}>
          {myArticles.map((article) => (
            <div className="article-item" key={article.slug}>
              <div className={style.article}>
                <div className={style.articleInfo}>
                  <div className={style.info}>
                    <img src={article.author.image} alt="" />
                    <div className={style.infoDetails}>
                      <a href="">{article.author.username}</a>
                      <p>{formatDate(article.createdAt)}</p>
                    </div>
                  </div>
                  <div className={style.favorite}>
                    <button>
                      <i className="fa-solid fa-heart"></i>{" "}
                      {article.favoritesCount}
                    </button>
                  </div>
                </div>
                <div className={style.articlePreview}>
                  <div
                    className={style.content}
                    onClick={() => handleToArticleDetails(article.slug)}
                  >
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>
                  </div>
                  <div className={style.more}>
                    <div
                      className={style.readmore}
                      onClick={() => handleToArticleDetails(article.slug)}
                    >
                      Read more...
                    </div>
                    <div className={style.articleTag}>
                      {article.tagList.map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={style.page}>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? style.activePage : null}
              >
                {index + 1}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
