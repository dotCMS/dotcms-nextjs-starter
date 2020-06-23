import { useState, useEffect } from 'react';
import getTagsListForCategory from '../utilities/dotcms/getTagsListForCategory';

function useTagsList(category) {
    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        (async function getTags() {
            const tags = await getTagsListForCategory(category);
            setTagsList(tags);
        })()
    }, []);

  return tagsList;
}

export default useTagsList;