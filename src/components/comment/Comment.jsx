import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { getComments } from '../lib/api'; // Giả sử bạn đã có API này

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(slug);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [slug]); // Dependency array ensures this only runs once upon mount or when `slug` changes

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <CommentForm slug={slug} onCommentSubmit={handleCommentSubmit} />
      <CommentsList
        comments={comments}
        slug={slug}
        onCommentDelete={handleCommentDelete}
      />
    </div>
  );
};

export default Comments;
