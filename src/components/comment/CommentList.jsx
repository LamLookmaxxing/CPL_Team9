const CommentList = ({comments}) => {


    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <h3>{comment.author.username}</h3>
                    <p>{comment.body}</p>
                </div>
            ))
            }


        </div>
    )
}
export default CommentList;
