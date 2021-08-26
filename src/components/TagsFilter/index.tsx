// Dependencies
import * as React from 'react'

// Internals
import { capitalize } from '@/utils'
import { Tags, TagsListContainer } from './styles'

export type TagsFilterProps = {
  list: { key: string; doc_count: number }[]
  onChange: (tags: string[]) => void
  selected: string[]
}

export const TagsFilter = ({
  list,
  onChange,
  selected,
}: TagsFilterProps): JSX.Element | null => {
  // We use an arrow function to avoid performance issues
  const [currentTags, setCurrentTags] = React.useState(() => selected || [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    let result = e.target.checked
      ? [...currentTags, value]
      : currentTags.filter((item) => item !== value)

    setCurrentTags(result)
    onChange(result)
  }

  // Avoid render the tags if the list is empty
  if (!list.length) return null

  return (
    <TagsListContainer>
      {list.map(({ key, doc_count }) => {
        const checked = currentTags.includes(key)

        return (
          <Tags key={key}>
            <input
              checked={checked}
              id={key}
              name={key}
              onChange={handleChange}
              type="checkbox"
              value={key}
            />
            <label htmlFor={key}>
              {capitalize(key)} <span>{doc_count}</span>
            </label>
          </Tags>
        )
      })}
    </TagsListContainer>
  )
}

export default TagsFilter
