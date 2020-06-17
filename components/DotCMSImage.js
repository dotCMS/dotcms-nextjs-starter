const DotCMSImage = ({ size, alt, data: { path, identifier, name }, className, loading }) => {
    let src = `${process.env.DOTCMS_HOST}`;
    let filter = `/filter/resize_w/${size?.width}/20q`;

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
            effect="blur"
            width={size?.width ? size.width : '250px'}
            height={size?.height ? size.height : '250px'}
        />
    );
};

export default DotCMSImage;
