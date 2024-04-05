import { useState } from "react";
import { createComment } from "../lib/api";

const CommentForm = ({ slug, refetchComments }) => {
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createComment(slug, body);
            if (response && response.comment) {
                setBody('');
                refetchComments()
            } else {
                console.error('Unexpected response structure:', response);
            }
        } catch (error) {
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