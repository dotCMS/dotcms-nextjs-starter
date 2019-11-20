import { useState, useEffect } from 'react';
import Link from 'next/link';

import DotcmsImage from './DotcmsImage';
const dotCMSApi = require('../../utils/dotcms/dotcmsApi');

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
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { contentlets } = await dotCMSApi.esSearch.search({
                    contentType: 'Blog',
                    queryParams: {
                        numberOfResults: '3',
                        sortResultsBy: 'modDate',
                        sortOrder1: 'desc'
                    }
                });
                setPosts(contentlets);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return posts.map(({ title, postingDate, identifier, urlTitle }) => {
        return (
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
        );
    });
};

export default BlogListing;
