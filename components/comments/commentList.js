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
                        id="addComment"
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

export default CommentList;
