import styled from 'styled-components';
import DotCMSImage from '../DotCMSImage';

const Wrapper = styled.div`
    display: block;
    margin: 0 0 1rem;
    overflow: hidden;
    position: relative;
    text-decoration: none;

    img {
        display: block;
        width: 100%;
    }

    &:hover {
        .body {
            opacity: 1;

            p,
            h4 {
                transform: translateX(0);
            }
        }

        .overlay {
            opacity: 0.5;
        }
    }

    .overlay {
        background-color: var(--dotcms-purple);
        bottom: 0;
        top: 0;
        position: absolute;
        opacity: 0;
        transition: opacity 200ms;
        width: 100%;
    }

    .body {
        color: white;
        bottom: 0;
        opacity: 0;
        padding: 3rem;
        position: absolute;
        top: 0;
        transition: opacity 300ms;
        width: 50%;
        z-index: 1;

        p,
        h4 {
            transform: translateX(3rem);
        }

        p {
            color: white;
            transition: transform 200ms ease-in;
        }

        h4 {
            text-transform: uppercase;
            transition: transform 100ms ease-in;
        }
    }
`;

export default function Image(props) {
    const description =
        props.description.length > 120 ? props.description.substring(0, 120) : props.description;

    return (
        <Wrapper>
            <DotCMSImage
                path={props.fileAsset}
                alt={props.title}
                size={{
                    width: 800,
                    height: 'auto'
                }}
            />
            <div className="body">
                <h4>{props.title}</h4>
                <p>{description}</p>
            </div>
            <div className="overlay" />
        </Wrapper>
    );
}
