import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PageContext from '../contexts/PageContext';
import styled from 'styled-components';

const Tags = styled.div`
  display: flex;
`

function TagsFilter({ setSelectedTags, selectedTags }) {
    const { category, tags, tagsList } = useContext(PageContext);

    const router = useRouter();
    const tagsMap = selectedTags && selectedTags.map((tag) => `+Product.tags:"${tag}"`);
    const query = `+contentType:product +categories:${category} ${tagsMap.join(' ')}`;

    const getFilteredTag = (value) => {
        const currentTags = router.asPath.split('/').pop().split('-');
        const newPath = currentTags.filter((item) => item !== value).join('-');
        return `/store/category/${newPath}`;
    };

    const handleCheckbox = (e) => {
        let url;
        if (e.target.checked) {
            setSelectedTags([...selectedTags, e.target.value]);
            url = `${router.asPath}-${e.target.value}`;
        } else {
            setSelectedTags(selectedTags.filter((tag) => tag !== e.target.value));
            url = getFilteredTag(e.target.value);
        }
        router.push('/store/category/[slug]', url, { shallow: true });
    };

    // Fetch data on initial render and when `selectedTags` change
    useEffect(() => {
        setSelectedTags(selectedTags);
    }, [selectedTags]);

    typeof window !== 'undefined' &&
        router?.beforePopState(({ as }) => {
            const previous = as
                .split('/')
                .slice(-1)[0]
                .split('-')
                .filter((cat) => cat !== category);
            setSelectedTags(previous);
            return true;
        });

    return (
        <>
            <h3>Category: {category}</h3>
            <h4>Tags: </h4>
            <Tags>
                {tagsList?.map(({ key, doc_count }) => {
                    const checked = selectedTags.includes(key);
                    return (
                        <>
                            <input
                                type="checkbox"
                                name={key}
                                value={key}
                                checked={checked}
                                onChange={handleCheckbox}
                            />
                            <label htmlFor={key}>
                                {key} ({doc_count})
                            </label>
                        </>
                    );
                })}
            </Tags>
        </>
    );
}

export default TagsFilter;
