import styled from 'styled-components';
import RouterLink from '../../RouterLink';
import DotCMSImage from '../../DotCMSImage';

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
            background-color: var(--dotcms-purple);
            transform: translateY(0);

            p {
                color: white;
                opacity: 1;
            }
        }
    }

    .body {
        background-color: #fff;
        bottom: 0;
        height: 200px;
        padding: 1rem;
        position: absolute;
        transform: translateY(135px);
        transition: transform 200ms, background-color 200ms;
        width: 100%;

        h4 {
            text-transform: uppercase;
            transition: color 200ms;
        }

        p {
            opacity: 0;
            transition: opacity 200ms;
        }
    }
`;

export default function Activity(props) {
    const description =
        props.description.length > 120 ? props.description.substring(0, 120) : props.description;

    const imageUrl = `/dA/${props.identifier}/image/270w/50q`;
    const myHref = '/activities/' + props.urlTitle;

    return (
        <WapperLink href={myHref}>
            <DotCMSImage
                path={imageUrl}
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
