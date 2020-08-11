import htmlParser from '../../../utilities/htmlParser';

const EXCLUDED_CONTENT = [
    '197a20a9-0675-4b59-803b-9cf1624e0ffc',
    'fb6a06da-8c0f-4828-99c5-91b03b17eaf7'
];

export default function SimpleWidget({ rendered, identifier }) {
    if (EXCLUDED_CONTENT.includes(identifier)) {
        return null;
    }

    return htmlParser({ content: rendered });
}
