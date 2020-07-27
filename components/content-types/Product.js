import ProductItem from '../ProductItem';

export default function Activity(props) {
    const [cat] = props.category.map((item) => {
        const [name] = Object.values(item);
        return name;
    });
    const { retailPrice, urlTitle, title, salePrice, image } = props;

    const data = {
        category: cat,
        retailPrice,
        urlTitle,
        title,
        salePrice,
        image: {
            path: image,
            size: 500,
            alt: title
        }
    };

    return <ProductItem product={data} show="all" />;
}
