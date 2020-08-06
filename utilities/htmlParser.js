import RouterLink from '../components/RouterLink';
import ReactHtmlParser, { processNodes } from 'react-html-parser';

const EXCLUDED_CONTENT = ['form-booking', 'breadcrumbs-custom'];

const isAbsolutePath = (href) => {
    const regex = /^https?:\/\/|^\/\//i
    return regex.test(href)
}

const defaultTransform = (node, index) => {
    if (node.type === 'tag') {
        if (EXCLUDED_CONTENT.includes(node.attribs.class)) {
            return null;
        }

        if (node.name === 'a' && !isAbsolutePath()) {
            return (
                <RouterLink key={index} {...node.attribs}>
                    {processNodes(node.children, defaultTransform)}
                </RouterLink>
            );
        }
    }
};

/**
 * Some data from DotCMS comes as a string HTML, for example from WYSIYG fields. So we parse this
 * html, turn them into react component and replace <a> for <RouterLink> to use NextJS routing.
 *
 */
export default function htmlParser({ content, transform = defaultTransform }) {
    return ReactHtmlParser(content, { transform });
}
