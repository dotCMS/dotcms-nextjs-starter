import styled from 'styled-components';
import RouterLink from '../../RouterLink';
import DotCMSImage from '../../DotCMSImage';
import { withEditable } from '../../../utilities/dotcms/widthEditable';

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

    const TitleEditable = withEditable((props) => <h4 {...props}>{title}</h4>);
    const DescriptionEditable = withEditable((props) => <p {...props}>{desc}</p>);

    return (
        <WapperLink href={myHref}>
            <DotCMSImage
                path={imageUrl}
                alt={title}
                size={{
                    width: 370,
                    height: 370
                }}
            />
            <div className="body">
                <TitleEditable name="title" lang="1" mode="minimal" inode={inode} />
                <DescriptionEditable name="description" lang="1" mode="minimal" inode={inode} />
            </div>
        </WapperLink>
    );
}
