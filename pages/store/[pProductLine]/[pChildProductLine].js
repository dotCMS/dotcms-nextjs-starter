import StoreWrapper from '../../../components/store/StoreWrapper';
import ProductItemList from '../../../components/store/ProductItemList';

const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

const ChildProductLinePage = ({ childProductLines, childProductLineSlug }) => {
    const mainTitle = { className: 'mb-3', value: childProductLineSlug };
    return childProductLines ? (
        <StoreWrapper mainTitle={mainTitle}>
            <ProductItemList productItems={childProductLines} />
        </StoreWrapper>
    ) : (
        ''
    );
};

ChildProductLinePage.getInitialProps = async ({ req }) => {
    const productLineSlug = req.originalUrl
        .split('/')
        .filter((e) => e)
        .slice(-2)[0];

    //get productline
    let params = {
        contentType: 'ProductLineLandingPage',
        queryParams: {
            languageId: '1'
        },
        options: { depth: 1, limit: '0', orderBy: 'title asc' }
    };
    let response = await dotCMSApi.content.query(params);
    const { contentlets } = await response.json();
    const productLines = contentlets.filter(
        (item) => item.title.toLowerCase() === productLineSlug.toLowerCase()
    )[0];

    //get productlinechildren items
    const childProductLineSlug = req.originalUrl
        .split('/')
        .filter((e) => e)
        .slice(-1)[0];

    const productLineChild = productLines.childProductLines.filter(
        (item) => item.title.replace(' ', '-').toLowerCase() === childProductLineSlug.toLowerCase()
    )[0];

    params = {
        contentType: 'Product',
        queryParams: {
            languageId: '1',
            'Product.productLine': productLineChild.identifier
        },
        options: { limit: '0', orderBy: 'modDate' }
    };
    response = await dotCMSApi.content.query(params);
    const result = await response.json();

    return { childProductLineSlug: childProductLineSlug, childProductLines: result.contentlets };
};

export default ChildProductLinePage;
