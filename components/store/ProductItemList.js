import Link from 'next/link';
import DotcmsImage from '../../components/Shared/DotcmsImage';

export default function ProductItemList({ productItems, moreButton, showAddToCart }) {
    return (
        <div className="row mb-5">
            {productItems.map((childProduct) => {
                return (
                    <div key={childProduct.identifier} className="col-6 col-lg-3 col-md-4">
                        <div className="box-product box-product-modern">
                            <div className="box-product-body">
                                <div className="box-product-button">
                                    {showAddToCart ? (
                                        <a
                                            className="button button-sm button-primary"
                                            href="/store/cart"
                                        >
                                            Add to cart
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                    <a
                                        className="button button-sm button-gray-400"
                                        href={childProduct.urlMap}
                                    >
                                        View details
                                    </a>
                                </div>
                                <div className="img-wrapper">
                                    <DotcmsImage
                                        className="box-product-img"
                                        alt={childProduct.title}
                                        height="189"
                                        identifier={childProduct.identifier}
                                    />
                                </div>
                            </div>
                            <p className="box-product-name">
                                <a href={childProduct.urlMap}>{childProduct.title}</a>
                            </p>
                            <div className="box-product-prices">
                                {childProduct.salePrice ? (
                                    <span className="current-price sale-price">
                                        {childProduct.salePrice}
                                    </span>
                                ) : (
                                    ''
                                )}

                                <span
                                    className={
                                        childProduct.salePrice ? 'original-price' : 'current-price'
                                    }
                                >
                                    {childProduct.retailPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
            {moreButton ? (
                <div className="col-6 col-md-4 col-lg-3">
                    <a className="btn btn-primary" href={moreButton.url}>
                        {moreButton.value}
                    </a>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
