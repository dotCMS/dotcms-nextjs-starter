import ProductLine from '../../components/store/ProductLine';
import StoreWrapper from '../../components/store/StoreWrapper';
import Link from 'next/link';
import DotcmsImage from '../../components/Shared/DotcmsImage';

const dotCMSApi = require('../../utils/dotcms/dotcmsApi');

const StorePage = ({ productLines }) => {
    const mainTitle = { value: 'Shop' };
    return productLines ? (
        <StoreWrapper mainTitle={mainTitle}>
            {productLines.map((productLine) => {
                return (
                    <ProductLine key={productLine.identifier} productLine={productLine}>
                        <div className="row mt-5 product-line">
                            {productLine.childProductLines.map((childProduct) => {
                                return (
                                    <div
                                        key={childProduct.identifier}
                                        className="col-6 col-lg-4 col-xl-3 height-fill"
                                    >
                                        <div className="box-product box-product-modern p-3 text-center">
                                            <Link href={childProduct.url}>
                                                <a>
                                                    <DotcmsImage
                                                        alt={childProduct.title}
                                                        height="200"
                                                        identifier={childProduct.identifier}
                                                    />

                                                    <h4 className="pb-4">{childProduct.title}</h4>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ProductLine>
                );
            })}
        </StoreWrapper>
    ) : (
        ''
    );
};

StorePage.getInitialProps = async () => {
    const params = {
        contentType: 'ProductLineLandingPage',
        queryParams: {
            languageId: '1'
        },
        options: { depth: 1, limit: '0', orderBy: 'title asc' }
    };
    const response = await dotCMSApi.content.query(params);
    const { contentlets } = await response.json();
    return { productLines: contentlets.filter((item) => item.childProductLines.length) };
};

export default StorePage;
