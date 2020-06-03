import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Button = styled.a`
  color: white;
  background: var(--primary-purple);
  padding: .5rem var(--primary-spacing);
  text-decoration: none;
  border-radius: 3px;
  display: inline-block;
  text-transform: uppercase;
  font-size: .825rem;
  letter-spacing: .5px;
  font-weight: bold;
  &:hover {
    background: #ca5ce5;
    color: white;
  }
`