const dotCMSApi = require('../../../config/dotcms/dotcmsApi');

import Loader from '../../shared/Loader';
import useDotCMSApi from '../../../hooks/useDotCMSApi';
import RouterLink from '../../RouterLink';
import DotCMSImage from '../../../components/DotCMSImage';

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
                <RouterLink href={`/blog/post/${urlTitle}`}>
                    <DotCMSImage alt={title} width="70" data={{ identifier }} />
                </RouterLink>
            </div>
            <div className="unit-body">
                <h6>
                    <RouterLink href={`/blog/post/${urlTitle}`}>{title}</RouterLink>
                </h6>
                {postingDate ? <dateTimeFormat value={postingDate} /> : ''}
            </div>
        </div>
    ));
};

export default BlogListing;
