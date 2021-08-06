// Dependencies
import styled from 'styled-components'

export const TagsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-top: 2rem;
`

export const Tags = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem;

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
`
