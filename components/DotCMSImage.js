const DotCMSImage = ({ width, height, alt, data: { path, identifier, name }, className }) => {
    let src = `${process.env.DOTCMS_HOST}`;
    let filter = `/filter/resize_w/${width}/20q`;

    if (path) {
        src += `/${path}`;
    }

    if (identifier && name) {
        src += `/dA/${identifier}/${name}`;
    }

    return (
        <img
            className={className}
            src={`${src}${filter}`}
            alt={alt}
            width={width}
            height={height}
        />
    );
};

export default DotCMSImage;
