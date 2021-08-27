// Dependencies
import styled from 'styled-components'

export const SidebarContainer = styled.div`
  padding-right: var(--primary-spacing);
  margin-top: var(--primary-spacing);
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      a {
        padding: 0.5rem 0;
        display: inline-block;
        text-decoration: none;
        font-style: italic;
        font-kerning: auto;
      }
    }
  }
  .sidebar-title {
    text-transform: uppercase;
  }
`
