import PropTypes from 'prop-types';
import CommentItem from './commentItem';

const CommentList = ({ value }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <h2>Comments</h2>
                </div>
                <div className="col text-right">
                    <a
                        href="#"
                        className="button button-md button-primary button-leaf"
                    >
                        <span className="mdi mdi-plus"></span> Comment
                    </a>
                </div>
            </div>
            {value.map((comment) => {
                return <CommentItem comment={comment} key={comment.identifier} />;
            })}
        </>
    );
};

CommentList.propTypes = {
    comment: PropTypes.shape({
        identifier: PropTypes.string.isRequired
    })
};

export default CommentList;
