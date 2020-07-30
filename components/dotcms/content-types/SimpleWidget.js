import htmlParser from '../../../utilities/dotcms/htmlParser';

export default function SimpleWidget({ rendered }) {
    return htmlParser({ content: rendered });
}

