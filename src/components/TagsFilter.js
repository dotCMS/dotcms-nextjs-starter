import React, { useState } from 'react'
import styled from 'styled-components'
import { capitalize } from '../utilities'

const TagsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-top: 2rem;
`

const Tags = styled.div`
  input[type='checkbox'],
  label {
    vertical-align: middle;
    margin-left: 0.3rem;
    span {
      background-color: var(--dotcms-purple-80);
      padding: 0rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 20px;
      display: inline-block;
      text-align: center;
      line-height: 16px;
      color: var(--dotcms-purple-20);
      font-weight: bold;
      vertical-align: middle;
    }
  }

  border: 1px solid #d5d5d5;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem;
`

function TagsFilter({ onFilterChange, list, selected }) {
  const [currentTags, setCurrentTags] = useState(selected || [])
  const handleCheckbox = (e) => {
    const { value } = e.target
    let result = e.target.checked
      ? [...currentTags, value]
      : currentTags.filter((item) => item !== value)

    setCurrentTags(result)
    onFilterChange(result)
  }

  return (
    <TagsListContainer>
      {list.length > 0 ? (
        list.map(({ key, doc_count }) => {
          const checked = currentTags.includes(key)
          return (
            <Tags key={key}>
              <input
                checked={checked}
                id={key}
                name={key}
                onChange={handleCheckbox}
                type="checkbox"
                value={key}
              />
              <label htmlFor={key}>
                {capitalize(key)} <span>{doc_count}</span>
              </label>
            </Tags>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </TagsListContainer>
  )
}

export default TagsFilter
