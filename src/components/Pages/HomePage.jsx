import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Sử dụng để điều hướng giữa các trang

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.realworld.io/api/articles?limit=20');
        console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div>
      <h1>Featured Articles</h1>
      {articles.length > 0 ? (
        <div>
          {articles.map((article) => (
            <div key={article.id}>
              <h2><Link to={`/article/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default HomePage;
