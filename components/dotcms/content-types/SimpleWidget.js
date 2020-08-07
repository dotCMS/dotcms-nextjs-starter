import htmlParser from '../../../utilities/htmlParser';

export default function SimpleWidget({ rendered }) {
    return htmlParser({ content: rendered });
}
