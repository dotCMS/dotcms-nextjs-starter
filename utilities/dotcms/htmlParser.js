import DotCMSImage from '../../components/DotCMSImage';
import RouterLink from '../../components/RouterLink';
import ReactHtmlParser, { processNodes } from 'react-html-parser';

const transform = (node, _index) => {
    if (node.type === 'tag') {
        if (node.name === 'img') {
            return <DotCMSImage {...node.attribs} />;
        }

        if (node.name === 'a') {
            return (
                <RouterLink {...node.attribs}>{processNodes(node.children, transform)}</RouterLink>
            );
        }
    }
};

export default function htmlParser({ content }) {
    return ReactHtmlParser(content, { transform });
}
