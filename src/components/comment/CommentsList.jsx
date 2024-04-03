import React from 'react';
import Comment from './Comment';

const CommentsList = ({ comments = [], slug, onCommentDelete }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          slug={slug}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </div>
  );
};

export default CommentsList;