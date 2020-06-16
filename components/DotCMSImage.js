import { LazyLoadImage } from 'react-lazy-load-image-component';
const DotCMSImage = ({ width, height, alt, data: { path, identifier, name }, className, loading }) => {
    let src = `${process.env.DOTCMS_HOST}`;
    let filter = `/filter/resize_w/${width}/20q`;

    if (path) {
        src += `/${path}`;
    }

    if (identifier && name) {
        src += `/dA/${identifier}/${name}`;
    }

    return (
        <LazyLoadImage
            className={className}
            src={`${src}${filter}`}
            alt={alt}
            effect="blur"
            width={width}
            height={height}
            loading={loading}
        />
    );
};

export default DotCMSImage;
