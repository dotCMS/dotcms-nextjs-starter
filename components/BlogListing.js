const dotCMSApi = require('../utils/dotcms/dotcmsApi');

import Link from 'next/link';
import DotcmsImage from './DotcmsImage';
import Loader from './Loader';
import useDotCMSApi from '../hooks/useDotCMSApi';

const DateText = ({ value }) => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const d = new Date(value);

    return <time dateTime={value}>{`${monthNames[d.getMonth()]} ${d.getUTCDate()}, ${d.getFullYear()}`}</time>;
};

const BlogListing = () => {
    const [loading, posts] = useDotCMSApi(async () => {
        return dotCMSApi.esSearch
            .search({
                contentType: 'Blog',
                queryParams: {
                    numberOfResults: '3',
                    sortResultsBy: 'modDate',
                    sortOrder1: 'desc'
                }
            })
            .then(({ contentlets }) => contentlets);
    });

    if (loading) {
        return <Loader />;
    }

    return posts.map(({ title, postingDate, identifier, urlTitle }) => (
        <div className="unit unit-spacing-lg" key={identifier}>
            <div className="unit-left">
                <Link href={`/blog/post/${urlTitle}`}>
                    <a>
                        <DotcmsImage alt={title} width="70" identifier={identifier} />
                    </a>
                </Link>
            </div>
            <div className="unit-body">
                <h6>
                    <Link href={`/blog/post/${urlTitle}`}>
                        <a>{title}</a>
                    </Link>
                </h6>
                <DateText value={postingDate} />
            </div>
        </div>
    ));
};

export default BlogListing;
