import BlogDetail from '../blogDetail';
import fetch from 'isomorphic-unfetch';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

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
    const slug = props.req.originalUrl
        .split('/')
        .filter((e) => e)
        .slice(-1)[0];
    /*
    const { contentlets } = await dotCMSApi.esSearch.search({
        contentType: 'Blog',
        queryParams: {
            detailedSearchQuery: `+Blog.title:${slug.replace('-', ' ')}`,
            depth: 1,
            languageId: 1
        }
    });
*/

    const response = await fetch(
        `https://starter.dotcms.com/api/content/render/false/type/json/query/-contentType:blogs%20+contentType:Blog%20+title:'${slug.replace(
            '-',
            ' '
        )}'%5E15%20+languageId:1/depth/1`
    );
    const { contentlets } = await response.json();
    return { ...contentlets[0] };
};

export default BlogDetailPage;
