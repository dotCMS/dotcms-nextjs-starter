import PropTypes from 'prop-types';
import BlogDetail from '../blogDetail';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer/Footer';
import { blogDetailType } from '../../../components/types';
import { getCookie, LANG_COOKIE_NAME } from '../../../utils/dotcms/utilities';

const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const BlogDetailPage = (props) => {
    return props && props.body ? (
        <>
            <Header />
            <div className="body-wrapper">
                <section id="section-1" className="section section-xxl">
                    <div className="container">
                        <div className="row">
                            <div className=" col-lg-10 offset-lg-1 ">
                                <BlogDetail {...props} />
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
};

BlogDetailPage.getInitialProps = async (props) => {
    const languageId = getCookie(props.req.headers.cookie, LANG_COOKIE_NAME) || '1';
    const slug = props.req.originalUrl
        .split('/')
        .filter((e) => e)
        .slice(-1)[0];
    const params = {
        contentType: 'Blog',
        queryParams: {
            title: `'${slug.replace('-', ' ')}'%5E15`,
            languageId: languageId
        },
        options: { depth: 3 }
    };
    const response = await dotCMSApi.content.query(params);
    const { contentlets } = await response.json();
    return { ...contentlets[0] };
};

BlogDetailPage.propTypes = {
    props: PropTypes.shape(blogDetailType)
};

export default BlogDetailPage;
