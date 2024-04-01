import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assuming Bootstrap is already added
import './ArticleDetail.css'; 
const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { slug: articleSlug } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://api.realworld.io/api/articles/${articleSlug}`);
        setArticle(response.data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleSlug]); 

  if (!article) {
    return <div className="container mt-5">Loading...</div>;
  }

  // Convert createdAt date format to "Thu Jan 04 2024" format
  const formattedDate = new Date(article.createdAt).toDateString();

  return (
    <>
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article">
            <Link to={`/profile/${article.author.username}`}>
              <img src={article.author.image || "https://api.realworld.io/images/demo-avatar.png"} alt="author-profile-image" className="lazyload"/>
            </Link>
            <div className="info">
              <Link className="author" to={`/profile/${article.author.username}`}>
                {article.author.username}
              </Link>
              <span className="date">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail View */}
      <div className="container mt-5">
        <p>{article.body}</p>
            <ul className="d-flex flex-wrap">
              {article.tagList.map((tag, index) => (
                <li key={index} className="badge badge-pill border">
                  {tag}
                </li>
              ))}
            </ul>
      </div>
    </>
  );
};

export default ArticleDetail;
