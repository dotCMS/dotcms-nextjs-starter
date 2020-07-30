import DotCMSImage from '../DotCMSImage';
import parseContent from './parseContent';

function webPageContent(props) {
    return parseContent({ content: props.body });
}

export default webPageContent;
