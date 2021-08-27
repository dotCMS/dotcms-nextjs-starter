// Dependencies
import styled from 'styled-components'

// Internals
import Link from '../../../Link'

export const WapperLink = styled(Link)`
  display: block;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
  text-decoration: none;

  img {
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    .body {
      color: white;
      background-color: var(--dotcms-purple);
      transform: translateY(0);

      p {
        color: white;
        opacity: 1;
      }
    }
  }

  .body {
    background-color: #fff;
    bottom: 0;
    height: 200px;
    padding: 1rem;
    position: absolute;
    transform: translateY(135px);
    transition: transform 200ms, background-color 200ms;
    width: 100%;

    h4 {
      text-transform: uppercase;
      transition: color 200ms;
    }

    p {
      opacity: 0;
      transition: opacity 200ms;
    }
  }
`
