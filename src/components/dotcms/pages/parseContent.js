import DotCMSImage from '../DotCMSImage';
import RouterLink from '../RouterLink';
import ReactHtmlParser, { processNodes } from 'react-html-parser';

const transform = (node, _index) => {
    if (node.type === 'tag' && node.name === 'a') {
        return <RouterLink {...node.attribs}>{processNodes(node.children, transform)}</RouterLink>;
    }
};

export default function withRawContent({ content }) {
    return ReactHtmlParser(content, { transform });
}
