import ItemLink from '../layout/Nav/ItemLink';

export default function Activity(props) {
    const description =
        props.description.length > 120 ? props.description.substring(0, 120) : props.description;
    const imageUrl = `${process.env.DOTCMS_HOST}/dA/${props.identifier}/image/270w/50q`;
    const myHref = '/activities/' + props.urlTitle;
    return (
        <ItemLink className="box-info" pathname={myHref}>
            <img
                className="box-info-img"
                src={imageUrl}
                alt={props.title}
                width="270"
                height="270"
            />
            <div className="box-info-body">
                <h4 className="box-info-title">{props.title}</h4>
                <p className="box-info-text">{description}</p>
            </div>
        </ItemLink>
    );
}
