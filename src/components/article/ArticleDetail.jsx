import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleDetail.css';
// Import CommentsSection component
import CommentList from '../comment/CommentsList'; // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn
import CommentForm from '../comment/CommentForm'; // Điều chỉnh đường dẫn theo cấu trúc thư mục của bạn

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { slug: articleSlug } = useParams();
  const [refreshComments, setRefreshComments] = useState(false);


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
  const triggerCommentsRefresh = () => {
    setRefreshComments((prev) => !prev); // Toggle the state to trigger effect
  };
  return (
    <>
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <Link to={`/profile/${article.author.username}`}>
              <img src={article.author.image || "https://api.realworld.io/images/demo-avatar.png"} alt={`${article.author.username}`} className="author-image" />
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
        <p className="script">{article.body}</p>
        <ul className="tag-list d-flex flex-wrap">
          {article.tagList.map((tag, index) => (
            <li key={index} className="tag-default tag-pill">
              {tag}
            </li>
          ))}
        </ul>
        {/* Comments Section */}
        <CommentForm slug={articleSlug} onCommentPosted={triggerCommentsRefresh} />
        <CommentList slug={articleSlug} refreshComments={refreshComments} />

      </div>
    </>
  );
};

export default ArticleDetail;
