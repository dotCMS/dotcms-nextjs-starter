import Link from 'next/link';
import StoreWrapper from '../../components/store/StoreWrapper';
import ProductItemList from '../../components/store/ProductItemList';

const dotCMSApi = require('../../utils/dotcms/dotcmsApi');

const ProductLinePage = ({ childProductLines, productLine }) => {
    const mainTitle = { className: 'mb-3', value: productLine };
    return childProductLines ? (
        <StoreWrapper mainTitle={mainTitle}>
            {childProductLines.map((childProductLine) => {
                const moreButton = { url: childProductLine.url, value: 'More' };
                return (
                    <div key={childProductLine.title}>
                        <h3>
                            <Link href={childProductLine.url}>
                                <a>{childProductLine.title}</a>
                            </Link>
                        </h3>
                        <ProductItemList
                            productItems={childProductLine.childItems}
                            moreButton={moreButton}
                            showAddToCart={true}
                        />
                    </div>
                );
            })}
        </StoreWrapper>
    ) : (
        ''
    );
};

ProductLinePage.getInitialProps = async ({ req }) => {
    const slug = req.originalUrl
        .split('/')
        .filter((e) => e)
        .slice(-1)[0];

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
        (item) => item.title.toLowerCase() === slug.toLowerCase()
    );

    //get productlinechildren items
    let items = [];

    await Promise.all(
        productLines[0].childProductLines.map(async (childProductLine) => {
            params = {
                contentType: 'Product',
                queryParams: {
                    languageId: '1',
                    'Product.productLine': childProductLine.identifier
                },
                options: { limit: '3', orderBy: 'modDate' }
            };
            response = await dotCMSApi.content.query(params);
            const result = await response.json();
            items.push({
                title: childProductLine.title,
                url: childProductLine.url,
                childItems: result.contentlets
            });
        })
    );

    return { productLine: slug, childProductLines: items };
};

export default ProductLinePage;
