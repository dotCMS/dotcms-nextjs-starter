import styled from 'styled-components';
import RouterLink from '../RouterLink';
import DotCMSImage from '../DotCMSImage';

const WapperLink = styled(RouterLink)`
    display: block;
    margin: 1rem 0;
    overflow: hidden;
    position: relative;
    text-decoration: none;

    img {
        width: 100%;
    }

    &:hover {
        .body {
            color: white;
            /* transform: translateY(0); */
            opacity: 1;

            p {
                color: white;
            }
        }
    }

    .body {
        background-color: var(--dotcms-purple);
        bottom: 0;
        top: 0;
        padding: 1rem;
        position: absolute;
        transition: opacity 200ms;
        width: 100%;
        opacity: 0;


        h4 {
            text-transform: uppercase;
            transition: color 200ms;
        }
    }
`;

export default function Image(props) {
    const description =
        props.description.length > 120 ? props.description.substring(0, 120) : props.description;

    const imageUrl = `/dA/${props.identifier}/image/270w/50q`;
    const myHref = '/activities/' + props.urlTitle;

    return (
        <WapperLink href={myHref}>
            <DotCMSImage
                data={{
                    path: props.fileAsset
                }}
                alt={props.title}
                size={{
                    width: 370,
                    height: 'auto'
                }}
            />
            <div className="body">
                <h4>{props.title}</h4>
                <p>{description}</p>
            </div>
        </WapperLink>
    );
}
