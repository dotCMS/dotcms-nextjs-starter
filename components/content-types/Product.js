import ItemLink from '../layout/Nav/ItemLink';

export default function Product(props) {
    return (
        <div className="box-product box-product-modern">
            {props.salePrice != null && <span className="badge badge-primary">Sale</span>}
            <div className="box-product-body">
                <div className="box-product-button">
                    <ItemLink className="button button-sm button-primary" pathname="/store/cart">
                        Add to cart
                    </ItemLink>
                    <ItemLink
                        className="button button-sm button-gray-400"
                        pathname="/store/products/{props.urlTitle}"
                    >
                        View details
                    </ItemLink>
                </div>
                <div className="img-wrapper">
                    <img
                        className="box-product-img"
                        src={'/dA/' + props.identifier + '/image1/189h/50q/' + props.title}
                        alt={props.title}
                    />
                </div>
            </div>
            <p className="box-product-name">
                <ItemLink pathname={'/store/products/' + props.urlTitle}>{props.title}</ItemLink>
            </p>
            <div className="box-product-prices">
                {props.salePrice != null ? (
                    <>
                        <span className="current-price sale-price">{props.salePrice}</span>
                        <span className="original-price">{props.retailPrice}</span>
                    </>
                ) : (
                    <span className="current-price">{props.retailPrice}</span>
                )}
            </div>
        </div>
    );
}
