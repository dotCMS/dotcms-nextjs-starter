import PropTypes from 'prop-types';

const CommentForm = ({ title, identifier, urlTitle }) => {
    return (
        <div className="row mt-5 pt-5">
            <div className="col-lg-12">
                <h2 id="comments" className="mb-2">
                    Leave a Comment
                </h2>

                <form id="webup">
                    <input type="hidden" id="blogTitle" name="blogTitle" value={title} />
                    <input type="hidden" id="blogId" name="blogId" value={identifier} />
                    <input
                        type="hidden"
                        id="commenterId"
                        name="commenterId"
                        // value="$!{commenterIdentifier}"
                    />
                    <input type="hidden" id="todayDateTime" name="today" value="$today" />
                    <input
                        type="hidden"
                        id="returnUrl"
                        name="returnUrl"
                        value={`/blog/post/${urlTitle}#comments`}
                    />
                    <div className="form-wrap">
                        <label className="form-label rd-input-label sr-only">Message</label>
                        <textarea
                            className="form-input form-control-has-validation form-control-last-child"
                            id="commentBody"
                            name="commentBody"
                            placeholder="Type a comment about this blog. Your feedback is appreciated"
                        ></textarea>
                    </div>
                    <input type="submit" className="button button-primary" value="Submit" />
                </form>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    title: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    urlTitle: PropTypes.string.isRequired
};

export default CommentForm;
