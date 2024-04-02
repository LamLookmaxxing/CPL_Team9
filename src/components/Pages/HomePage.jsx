import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticlePreview from '../Articles/ArticlePreview';
const HomePage = () => {
  const [article, setArticle] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios.get(`https://api.realworld.io/api/articles`)
      .then((res) => {
        setStatus(true);
        setArticle(res.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);
  console.log(article);
  return (
    <div className="home-page">
      <div class="home-page">
        <div className="banner bg-success py-5">
          <div className="container text-center">
            <h1 className="logo-font text-white fs-1">conduit</h1>
            <p className="text-white  fs-4">A place to share your knowledge.</p>
          </div>
        </div>
        <div class="container page">
          <div className='row'>
            <div className='col-8'>
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a href="#" className={`nav-link `}>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                {status ? (
                  <ArticlePreview article={article} />
                ) : (
                  <span >Load More</span>
                )}
              </div>
            </div>
            <div className='col-4'>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;