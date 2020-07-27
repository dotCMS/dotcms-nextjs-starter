const getSize = (size) => {
    let result = {
        width: 250,
        height: 250,
        filter: 250
    };

    if (size) {
        if (typeof size === 'number') {
            result = {
                width: size,
                filter: size
            };
        }

        if (typeof size === 'object') {
            result = {
                width: size.width,
                height: size.height,
                filterResize: size.width
            };
        }
    }

    return result;
};

const DotCMSImage = ({ size, alt, path, identifier, name, className }) => {
    let { filterResize, width, height } = getSize(size);
    let src = `${process.env.NEXT_PUBLIC_DOTCMS_HOST}`;
    let filterUrl = `/filter/resize_w/${filterResize}/20q`;

    if (path) {
        src += `/${path}`;
    }

    if (identifier && name) {
        src += `/dA/${identifier}/${name}`;
    }

    return (
        <img
            className={className}
            src={`${src}${filterUrl}`}
            alt={alt}
            width={width || 250}
            height={height || 250}
            loading="lazy"
        />
    );
};

export default DotCMSImage;
