/**
 * The idea behind this components is to encapsulate all the functions of the
 * DotCMS rest images API: https://dotcms.com/docs/latest/image-resizing-and-processing
 */
const DotcmsImage = ({ alt, width, identifier }) => (
    <img src={`${`https://starter.dotcms.com`}/dA/${identifier}/image/${width}w`} alt={alt} width={width} />
);

export default DotcmsImage;
