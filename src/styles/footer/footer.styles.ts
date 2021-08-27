// Dependencies
import styled from 'styled-components'

export const FooterContainer = styled.div`
  margin-top: var(--primary-spacing);
  background: white;
  width: 100%;
  padding: var(--primary-spacing);

  & > div > * + * {
    padding: 1rem 0;
    margin-top: 5rem;
    p {
      margin: 0;
    }
  }
`

export const FooterSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  &:first-child {
    justify-content: space-between;
    nav {
      margin-right: 1.69rem;
    }
    span {
      font-size: 0.8rem;
      color: grey;
    }
  }

  &:last-child {
    flex-direction: column;
    text-align: center;
    nav {
      padding-bottom: 1rem;
      a {
        font-weight: normal;
        font-size: 0.8rem;
      }
    }
    p {
      font-size: 0.8rem;
      color: grey;
    }
  }

  &:not(:first-child) {
    justify-content: center;
  }

  nav > a {
    margin: 0 0.5rem;
  }

  nav > a:hover > img {
    filter: contrast(50%);
  }
`
