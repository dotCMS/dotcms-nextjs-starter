import htmlParser from '../../../utilities/htmlParser';

export default function SimpleWidget({ rendered, identifier, ...rest }) {
    return htmlParser({ content: rendered });
}
