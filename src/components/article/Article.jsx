import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../lib/api';
import CommentWrapper from '../comment/CommentWrapper';

const Article = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Article slug is undefined.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const articleData = await getArticle(slug);
        if (articleData && articleData.article) {
          setArticle(articleData.article); 
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        setError('Failed to fetch article.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {article ? (
        <>
        <div className="article-page"></div>
          <h1>{article.author.username}</h1> 
          <p>{article.body}</p>
          <CommentWrapper slug={slug} />
        </>
      ) : (
        <div>Article not found.</div>
      )}

    </div>
  );
};
export default Article;