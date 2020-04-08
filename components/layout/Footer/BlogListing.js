const dotCMSApi = require('../../../utils/dotcms/dotcmsApi');

import DateTimeFormat from '../../Shared/DateTimeFormat';
import Loader from '../../Shared/Loader';
import DotcmsImage from '../../Shared/DotcmsImage';
import useDotCMSApi from '../../../hooks/useDotCMSApi';
import ItemLink from '../Nav/ItemLink';

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
                <ItemLink pathname={`/blog/post/${urlTitle}`}>
                    <a>
                        <DotcmsImage alt={title} width="70" identifier={identifier} />
                    </a>
                </ItemLink>
            </div>
            <div className="unit-body">
                <h6>
                    <ItemLink pathname={`/blog/post/${urlTitle}`}>
                        <a>{title}</a>
                    </ItemLink>
                </h6>
                {postingDate ? <DateTimeFormat value={postingDate} /> : ''}
            </div>
        </div>
    ));
};

export default BlogListing;
