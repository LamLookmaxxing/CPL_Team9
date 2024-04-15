import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../comments/Comments";
import axios from "axios";
import './ArticleDetail.css';
const ArticleDetail = () => {
  const { slug } = useParams();

  // ------------------------------------------------------------------
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [usernameState, setUsername] = useState("");

  const token = localStorage.getItem("token");

  const nav = useNavigate();

  useEffect(() => {
    fetchUserData(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`https://api.realworld.io/api/articles/${slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch article");
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data.article);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      fetch(`https://api.realworld.io/api/articles/${slug}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch article");
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data.article);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://api.realworld.io/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setUsername(userData.username);
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };

  useEffect(() => {
    if (token && !loading) {
      fetch(
        `https://api.realworld.io/api/profiles/${article.author.username}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch article");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data.profile);
          console.log(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [loading]);

  // --------------------------------------------------------------
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
  // -------------------------------------------------------------------------

  const handleFollowClick = () => {
    if (token == null) {
      nav("/users/login");
    } else {
      if (user.following) {
        fetch(
          `https://api.realworld.io/api/profiles/${article.author.username}/follow`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch article");
            }
            return response.json();
          })
          .then((data) => {
            setUser(data.profile);
            console.log(data);
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        const profileData = {
          profile: {
            following: true,
          },
        };

        fetch(
          `https://api.realworld.io/api/profiles/${article.author.username}/follow`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(profileData),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch article");
            }
            return response.json();
          })
          .then((data) => {
            setUser(data.profile);
            console.log(data);
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    }
  };

  const handleFavoriteClick = (slug) => {
    const apiUrl = `https://api.realworld.io/api/articles/${slug}/favorite`;
    if (article.favorited) {
      fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data.article);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error occurred while updating favorite:", error);
        });
    } else {
      const newData = {
        article: {
          favoritesCount: article.favoritesCount + 1,
        },
      };
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data.article);
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi cập nhật:", error);
        });
    }
  };

  //---------------------
  const handleEditClick = () => {
    nav(`/edit/${article.slug}`);
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (isConfirmed) {
      fetch(`https://api.realworld.io/api/articles/${article.slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete article");
          }
          nav("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  // ----------------------------------------------------------------------------------------------
  return (
    <div className="aricle-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="aricle-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>
              <div className="article-meta d-flex gap-2">
                <img  src={article.author.image} alt="Image" />
                <div className="d-flex flex-column">
                <Link className="author" to={`/profileAuthor/${article.author.username}`}>
                  {article.author.username}
                </Link>
                
                <span className="date ">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                </div>
             
                {token && article.author.username === usernameState ? (
                  <>
                    <button onClick={handleEditClick} className="btn btn-outline-secondary btn-sm">
                      <i className="fa-solid fa-edit"></i> Edit Article
                    </button>
                    <button onClick={handleDeleteClick} className="btn btn-outline-danger btn-sm">
                      <i className="fa-solid fa-trash"></i> Delete Article
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`buttonFollow ${user.following ? "followActive" : ""}`}
                      onClick={handleFollowClick}
                    >
                      <i className="fa-solid fa-plus"></i>{" "}
                      {user.following ? "Unfollow" : "Follow"}{" "}
                      {article.author.username}
                    </button>
                    <button
                      className={`buttonFavorite ${article.favorited ? "faActive" : ""}`}
                      onClick={() => handleFavoriteClick(article.slug)}
                    >
                      <i className="fa-solid fa-heart"></i>{" "}
                      {article.favorited ? "Unfavorite" : "Favorite"} Article (
                      {article.favoritesCount})
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.description}</p>
                <p>{article.body}</p>
                <ul className="tag-list">
                  {article.tagList.map((tag) => (
                    <li key={tag} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />
            <div>
              {token ? (
                <div
                  className={`d-flex justify-content-center align-items-center`}
                >
                  <Comment></Comment>
                </div>
              ) : (
                <div className={'linkSign'}>
                  <p>
                    <b>
                      <i>login to comment</i>
                    </b>
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )
      }
    </div>
  )



};

export default ArticleDetail;
