const BlogDetail = (props) => {
    console.log('----props', props);
    return (
        <>
            <div className="section-blog-post">
                <div className="section-blog-post-header">
                    <h1>{props.title}</h1>
                    <div className="post-bottom-panel">
                        <div>
                            <div className="group-xl">
                                {/* #if( ${URLMapContent.author.size()} > 0) #set
                                ($author= ${URLMapContent.author.get(0)})
                                <div className="post-modern-author">
                                    <span className="post-icon icon mdi mdi-account"></span>
                                    <span>
                                        by $!{author.firstName} $!
                                        {author.lastName}
                                    </span>
                                </div>
                                #end */}
                                <div className="post-modern-time">
                                    <span className="post-icon icon mdi mdi-calendar-clock"></span>
                                    <time dateTime={props.postingDate}>{props.postingDate}</time>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-none d-md-block">
                            <div className="group-xl">
                                <div className="post-modern-views">
                                    <span className="post-icon icon mdi mdi-eye"></span>
                                    <span>193</span>
                                </div>
                                <div className="post-modern-comment">
                                    <span className="post-icon icon mdi mdi-comment"></span>
                                    <a href="#comments">3</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* <!-- BLOG IMAGE --> */}
                <div className="section-blog-post-figure">
                    <img src={props.image} alt="" />
                    <span className="badge badge-primary">{props.tags}</span>
                </div>

                {/* <!-- BLOG BODY --> */}
                <div
                    className="section-blog-post-content"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                >
                    {/* $!markdown.parse(${URLMapContent.getRaw('body')}) */}
                </div>

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
                {/* #dotParse("/application/vtl/blog/comments/comments.vtl") */}
            </div>
        </>
    );
};

export default BlogDetail;