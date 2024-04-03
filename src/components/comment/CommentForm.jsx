import React, { useState } from 'react';
import { createComment } from '../lib/api';

const CommentForm = ({ slug, onCommentSubmit }) => {
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment(slug, body);
      // Assuming the API response's shape is { comment: { ...commentData } }
      if (response && response.comment) {
        onCommentSubmit(response.comment);
        setBody('');
      } else {
        // Handle the case where response does not have a `comment` property
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      // Handle any errors such as network errors or the API returning an error status
      console.error('Error submitting comment:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};
export default CommentForm;