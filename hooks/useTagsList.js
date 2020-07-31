import { useState, useEffect } from 'react';

const getTagsListForCategory = async (category) => {
    const data = {
        query: {
            query_string: {
                query: `+contentType:product +categories:${category}`
            }
        },
        aggs: {
            tag: {
                terms: {
                    field: 'tags',
                    size: 100
                }
            }
        },
        size: 0
    };

    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const results = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/es/search`, options);

    const {
        esresponse: [
            {
                aggregations: {
                    'sterms#tag': { buckets }
                }
            }
        ]
    } = await results.json();

    return buckets;
};


function useTagsList(category) {
    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        (async function getTags() {
            const tags = await getTagsListForCategory(category);
            setTagsList(tags);
        })();
    }, []);

    return tagsList;
}

export default useTagsList;
