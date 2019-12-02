import CommentItem from './CommentItem';
import { commentListType } from '../types';

const CommentList = ({ comments }) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    <h2>Comments</h2>
                </div>
                <div className="col text-right">
                    <a href="#" className="button button-md button-primary button-leaf">
                        <span className="mdi mdi-plus"></span> Comment
                    </a>
                </div>
            </div>
            {comments.map((comment) => {
                return <CommentItem {...comment} key={comment.identifier} />;
            })}
        </>
    );
};

CommentList.propTypes = {
    comments: commentListType
};

export default CommentList;
