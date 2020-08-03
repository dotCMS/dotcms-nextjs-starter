import DotCMSImage from '../components/DotCMSImage';
import RouterLink from '../components/RouterLink';
import ReactHtmlParser, { processNodes } from 'react-html-parser';

const defaultTransform = (node, index) => {
    if (node.type === 'tag') {
        // TODO: WIP
        // if (node.name === 'img') {
        //     return <DotCMSImage key={index} {...node.attribs} />;
        // }

        if (node.name === 'a') {
            return (
                <RouterLink key={index} {...node.attribs}>
                    {processNodes(node.children, defaultTransform)}
                </RouterLink>
            );
        }
    }
}

/**
 * Some data from DotCMS comes as a string HTML, for example from WYSIYG fields. So we parse this
 * html, turn them into react component and replace <a> for <RouterLink> to use NextJS routing.
 *
 */
export default function htmlParser({ content, transform = defaultTransform }) {
    return ReactHtmlParser(content, { transform });
}
