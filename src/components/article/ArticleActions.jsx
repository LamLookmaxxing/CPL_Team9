import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const ArticleActions = ({ slug, onArticleDelete }) => {
  const navigate = useNavigate(); 

  const handleEdit = () => {
    navigate(`/editor/${slug}`); 
  };

  return (
    <div>
      <button onClick={handleEdit}>Edit Article</button>
      <button onClick={onArticleDelete}>Delete Article</button>
    </div>
  );
};

export default ArticleActions;