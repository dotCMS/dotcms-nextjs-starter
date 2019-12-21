/**
 * The idea behind this components is to encapsulate all the functions of the
 * DotCMS rest images API: https://dotcms.com/docs/latest/image-resizing-and-processing
 */
const DotcmsImage = ({ alt, height, width, identifier }) => (
    <img src={`/dA/${identifier}/image/${width}w/${height}h`} alt={alt} height={height} width={width} />
);

export default DotcmsImage;
