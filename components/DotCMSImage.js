const getSize = (size) => {
    let result = {
        width: 250,
        height: 250,
        filterResize: 250
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
    const { filterResize, width, height } = getSize(size);

    const filterUrl = `/filter/resize_w/${filterResize}/20q`;
    let srcUrl = '';

    if (path) {
        srcUrl += `${path}`;
    }

    if (identifier && name) {
        srcUrl += `/dA/${identifier}/${name}`;
    }

    return (
        <img
            className={className}
            src={`${srcUrl}${filterUrl}`}
            alt={alt}
            width={width || 250}
            height={height || 250}
            loading="lazy"
        />
    );
};

export default DotCMSImage;
