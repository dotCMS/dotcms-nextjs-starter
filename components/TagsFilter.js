import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PageContext from '../contexts/PageContext';
import styled from 'styled-components';
import {capitalize} from '../utilities/shared';

const TagsListContainer = styled.div`
    display: flex;
`;

const Tags = styled.div`
    input[type='checkbox'] {
        vertical-align: middle;
    }

    border: 1px solid #d5d5d5;
    border-radius: 3px;
    padding: .5rem;
    margin-right: 1rem;
`;

function TagsFilter({ setSelectedTags, selectedTags }) {
      const { tagsList, setPath } = useContext(PageContext);
      const router = useRouter();

      const getFilteredTag = (value) => {
          const currentTags = router.asPath.split('/').pop().split('-');
          const newPath = selectedTags.filter((item) => item !== value).join('-');
          return `/store/category/${newPath}`;
      };

      const handleCheckbox = (e) => {
          let path;
          if (e.target.checked) {
              setSelectedTags([...selectedTags, e.target.value]);
              path = `${router.asPath}-${e.target.value}`;
          } else {
              setSelectedTags(selectedTags.filter((tag) => tag !== e.target.value));
              path = getFilteredTag(e.target.value);
          }
          setPath(path);
      };

    return (
      <TagsListContainer>
          {tagsList?.map(({ key, doc_count }) => {
              const checked = selectedTags.includes(key);
              return (
                  <Tags>
                      <input
                          type="checkbox"
                          name={key}
                          id={key}
                          value={key}
                          checked={checked}
                          onChange={handleCheckbox}
                      />
                      <label htmlFor={key}>
                          {capitalize(key)} ({doc_count})
                      </label>
                  </Tags>
              );
          })}
      </TagsListContainer>
    );
}

export default TagsFilter;
