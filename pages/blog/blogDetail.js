import PropTypes from 'prop-types';
import DateTimeFormat from '../../components/Shared/DateTimeFormat';
import CommentList from '../../components/comments/CommentList';
import CommentForm from '../../components/comments/CommentForm';

const BlogDetail = ({
    author,
    postingDate,
    blogComment,
    image,
    body,
    tags,
    title,
    identifier,
    urlTitle
}) => {
    return (
        <>
            <div className="section-blog-post">
                <div className="section-blog-post-header">
                    <h1>{title}</h1>
                    <div className="post-bottom-panel">
                        <div>
                            <div className="group-xl">
                                {author ? (
                                    <div className="post-modern-author">
                                        <span className="post-icon icon mdi mdi-account"></span>
                                        <span>
                                            {`by ${author[0].firstName} ${author[0].lastName}`}
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className="post-modern-time">
                                    <span className="post-icon icon mdi mdi-calendar-clock"></span>
                                    <DateTimeFormat value={postingDate} format="DateTime" />
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <div className="group-xl">
                                <div className="post-modern-views">
                                    <span className="post-icon icon mdi mdi-eye"></span>
                                    <span>193</span>
                                </div>
                                {blogComment ? (
                                    <div className="post-modern-comment">
                                        <span className="post-icon icon mdi mdi-comment"></span>
                                        <a href="#comments">{blogComment.length}</a>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- BLOG IMAGE --> */}
                <div className="section-blog-post-figure">
                    <img src={image} alt="" />
                    <span className="badge badge-primary">{tags.split(',')[0]}</span>
                </div>

                {/* <!-- BLOG BODY --> */}
                <div
                    className="section-blog-post-content"
                    dangerouslySetInnerHTML={{ __html: body }}
                ></div>

                {/* <!-- SOCIAL SHARES --> */}
                <div className="group-xl text-center">
                    <a
                        className="button button-md button-facebook button-icon button-icon-left button-leaf"
                        href="https://www.facebook.com/dotCMS/"
                    >
                        <span className="icon mdi mdi-facebook"></span>Facebook
                    </a>
                    <a
                        className="button button-md button-twitter button-icon button-icon-left button-leaf"
                        href="https://twitter.com/dotcms"
                    >
                        <span className="icon mdi mdi-twitter"></span>Twitter
                    </a>
                    <a
                        className="button button-md button-linkedin button-icon button-icon-left button-leaf"
                        href="https://www.linkedin.com/company/2307658/"
                    >
                        <span className="icon mdi mdi-linkedin"></span>LinkedIn
                    </a>
                </div>
            </div>

            {/* <!-- COMMENTS --> */}
            <div id="comments" className="pt-5 mt-5">
                <CommentList comments={blogComment} />
                <CommentForm title={title} identifier={identifier} urlTitle={urlTitle} />
            </div>
        </>
    );
};

BlogDetail.propTypes = {
    author: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        })
    ),
    blogComment: PropTypes.arrayOf(PropTypes.object),
    body: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    postingDate: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default BlogDetail;
