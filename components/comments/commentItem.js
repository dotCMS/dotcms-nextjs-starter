import PropTypes from 'prop-types';
import DateTimeFormat from '../Shared/DateTimeFormat';

const CommentItem = ({ commentAuthor, postDate, body }) => {
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
    commentAuthor: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profilePhoto: PropTypes.string.isRequired
    }).isRequired,
    postDate: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};

export default CommentItem;
