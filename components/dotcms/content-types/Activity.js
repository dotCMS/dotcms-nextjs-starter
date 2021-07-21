import styled from 'styled-components';
import RouterLink from '../../RouterLink';
import DotCMSImage from '../../DotCMSImage';
import { Editable } from '../../Editable';

const WapperLink = styled(RouterLink)`
    display: block;
    margin: 1rem 0;
    overflow: hidden;
    position: relative;
    text-decoration: none;

    img {
        width: 100%;
        object-fit: cover;
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

export default function Activity({ description, identifier, urlTitle, title, inode }) {
    const desc = description.length > 120 ? description.substring(0, 120) : description;

    const imageUrl = `/dA/${identifier}/image/270w/50q`;
    const myHref = '/activities/' + urlTitle;

    return (
        <WapperLink href={myHref}>
            <DotCMSImage
                path={imageUrl}
                alt={title}
                width={370}
                height={370}
            />
            <div className="body">
                <Editable
                    element={<h4>{title}</h4>}
                    field="title"
                    lang="1"
                    mode="minimal"
                    inode={inode}
                />
                <Editable
                    element={<p>{desc}</p>}
                    field="description"
                    lang="1"
                    mode="minimal"
                    inode={inode}
                />
            </div>
        </WapperLink>
    );
}
