export default function Image(props) {
    return (
        <article className="thumbnail-classic mb-5">
            <a
                className="thumbnail-classic-figure"
                href={`/dA/${props.identifier}/1200x/50q/props.fileName`}
                data-lightgallery="item"
            >
                <picture>
                    <source
                        media="(min-width: 800px)"
                        srcSet={`/dA/${props.identifier}/1200w/50q/${props.fileName}/dA/${
                            props.identifier
                        }/2400w/50q/${props.fileName} 2x`}
                    />
                    <source
                        media="(min-width: 480px)"
                        srcSet={`/dA/${props.identifier}/600w/50q/${props.fileName}/dA/${
                            props.identifier
                        }/1200w/50q/${props.fileName} 2x`}
                    />
                    <img
                        src={`/dA/${props.identifier}/480w/50w/50q/${props.fileName}`}
                        alt={props.description}
                        className="img-fluid"
                    />
                </picture>
            </a>
            <div className="thumbnail-classic-caption">
                <h4 className="thumbnail-classic-title">{props.title}</h4>
                <p className="thumbnail-classic-text">{props.description}</p>
                <a
                    className="thumbnail-classic-link mdi mdi-plus-circle-outline"
                    href={`/dA/${props.identifier}/1200w/50q/${props.fileName}`}
                    data-lightgallery="item"
                />
            </div>
        </article>
    );
}
