import React from 'react';
import DotCMSImage from '../DotCMSImage';
import RouterLink from '../RouterLink';
import ReactHtmlParser, {
    processNodes
} from 'react-html-parser';
 
const transform = (node, index) => {
    if (node.type === 'tag') {
        if (node.name === 'img') {
            return <DotCMSImage {...node.attribs} />;
        }

        if (node.name === 'a') {
        return <RouterLink {...node.attribs}>{processNodes(node.children, transform)}</RouterLink>;
        }
    }
};

export default function webPageContent(props) {
    return ReactHtmlParser(props.body, { transform });
}
