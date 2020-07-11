import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function useTagsFiltered() {
    // Find the category and tags from the URL
    const router = useRouter();
    let { asPath: path } = router;
    path = path.split('/').pop();

    const [routePath, setRoutePath] = useState('');

    useEffect(
        () => {
            routePath && router.push('/store/category/[slug]', routePath);
        },
        [routePath]
    );

    // Separate category from tags
    let [_, ...tagsFiltered] = path.split('-');

    tagsFiltered = tagsFiltered.map((tag) => {
        const regex = /%20/;
        return regex.test(tag) ? tag.replace(regex, ' ') : tag;
    });

    const tagsMap = tagsFiltered && tagsFiltered.map((tag) => `Product.tags:${tag}`);

    return [tagsFiltered, setRoutePath, tagsMap];
}

export default useTagsFiltered;
