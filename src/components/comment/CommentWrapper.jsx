import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { getComments } from "../lib/api";
import CommentForm from "./CommentForm";

const CommentWrapper = ({ slug }) => {

    // state: comments (array)
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        getComments(slug).then(data => {
            setComments(data.comments);
        })
    }

    // call api -> set comments from api -> comments
    useEffect(() => {
        fetchComments();
    }, []);
    // pass comment -> CommentList

    return (
        <div className="comment-wrapper">
            <CommentForm slug={slug} refetchComments={fetchComments} />
            <h2>Comment list:</h2>
            <CommentList comments={comments} />

        </div>
    );
};
export default CommentWrapper;