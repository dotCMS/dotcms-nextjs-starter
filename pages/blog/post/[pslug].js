import PropTypes from 'prop-types';
import BlogDetail from '../BlogDetail';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer/Footer';
import { blogDetailType } from '../../../components/types';
import { getCookie, LANG_COOKIE_NAME } from '../../../utils/dotcms/utilities';
import { getPage } from '../../../utils/dotcms';

function BlogDetailPage(contentlet) {
    return contentlet ? (
        <>
            <Header />
            <div className="body-wrapper">
                <section id="section-1" className="section section-xxl">
                    <div className="container">
                        <div className="row">
                            <div className=" col-lg-10 offset-lg-1 ">
                                <BlogDetail {...contentlet} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    ) : (
        ''
    );
}

BlogDetailPage.getInitialProps = async ({ req, asPath }) => {
    const cookie = req ? req.headers.cookie : document.cookie;
    const lang = getCookie(cookie, LANG_COOKIE_NAME);

    try {
        const pageRender = await getPage(asPath, lang);
        return pageRender.urlContentMap;
    } catch (error) {
        return {
            error: {
                statusCode: 404
            }
        };
    }
};

BlogDetailPage.propTypes = {
    props: PropTypes.shape(blogDetailType)
};

export default BlogDetailPage;
