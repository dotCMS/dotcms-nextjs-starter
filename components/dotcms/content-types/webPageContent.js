import htmlParser from '../../../utilities/dotcms/htmlParser';

export default function webPageContent({ body }) {
    return htmlParser({ content: body });
}
