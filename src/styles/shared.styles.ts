// Dependencies
import styled from 'styled-components'

export const Button = styled.a`
  color: var(--dotcms-purple-20);
  background: var(--dotcms-purple-80);
  text-decoration: none;
  border-radius: 50px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  font-weight: bold;
  transition: margin cubic-bezier(0.215, 0.61, 0.355, 1) 250ms,
    padding cubic-bezier(0.215, 0.61, 0.355, 1) 250ms;
  margin: 0 3px;
  padding: 0.75rem 1.5rem;

  &:hover {
    color: var(--dotcms-purple-20);
    transform: translate(0px, 0px);
    margin: 0 0px;
    padding: 0.75rem 2rem;
  }
`
