const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

import Link from 'next/link';
import DateFormat from '../../Shared/DateFormat';
import Loader from '../../Shared/Loader';
import DotcmsImage from '../../Shared/DotcmsImage';
import useDotCMSApi from '../../../hooks/useDotCMSApi';

const BlogListing = () => {
    const [loading, posts] = useDotCMSApi(() => {
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
                <DateFormat value={postingDate} />
            </div>
        </div>
    ));
};

export default BlogListing;
