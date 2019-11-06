export default function Product(props) {
    return (
        <div className="box-product box-product-modern">
            {props.salePrice != null && <span className="badge badge-primary">Sale</span>}
            <div className="box-product-body">
                <div className="box-product-button">
                    <a className="button button-sm button-primary" href="/store/cart">
                        Add to cart
                    </a>
                    <a className="button button-sm button-gray-400" href="/store/products/{props.urlTitle}">
                        View details
                    </a>
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
                <a href={'/store/products/' + props.urlTitle}>{props.title}</a>
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
