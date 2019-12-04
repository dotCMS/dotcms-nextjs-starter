import DateTimeFormat from '../Shared/DateTimeFormat';
import { commentItemType } from '../types';

const CommentItem = ({ body, commentAuthor, postDate }) => {
    return (
        <div className="box-comment">
            <div className="unit flex-column flex-md-row">
                <div className="unit-left">
                    <img
                        className="img-circles"
                        src={`${commentAuthor.profilePhoto}/80w80h`}
                        alt=""
                        width="80"
                        height="80"
                    />
                </div>
                <div className="unit-body">
                    <div className="group-xl">
                        <h4 className="box-comment-author">
                            <a href="#">
                                {commentAuthor.firstName} {commentAuthor.lastName}
                            </a>
                        </h4>
                        <span className="box-comment-time">
                            {<DateTimeFormat value={postDate} format="DateTime" />}
                        </span>
                    </div>
                    <div className="box-comment-text">{body}</div>
                    <div className="box-comment-reply">
                        <span className="icon mdi mdi-reply"></span>
                        <a href="#">Reply</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    body: commentItemType.body,
    commentAuthor: commentItemType.commentAuthor,
    postDate: commentItemType.postDate
};

export default CommentItem;
