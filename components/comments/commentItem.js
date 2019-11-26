import DateTimeFormat from '../../components/Shared/DateTimeFormat';

const CommentItem = ({ comment }) => {
    return (
        <div className="box-comment">
            <div className="unit flex-column flex-md-row">
                <div className="unit-left">
                    <img
                        className="img-circles"
                        src={`${comment.commentAuthor.profilePhoto}/80w80h`}
                        alt=""
                        width="80"
                        height="80"
                    />
                </div>
                <div className="unit-body">
                    <div className="group-xl">
                        <h4 className="box-comment-author">
                            <a href="#">
                                {comment.commentAuthor.firstName} {comment.commentAuthor.lastName}
                            </a>
                        </h4>
                        <span className="box-comment-time">
                            {<DateTimeFormat value={comment.postDate} format="DateTime" />}
                        </span>
                    </div>
                    <div className="box-comment-text">{comment.body}</div>
                    <div className="box-comment-reply">
                        <span className="icon mdi mdi-reply"></span>
                        <a href="#">Reply</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
