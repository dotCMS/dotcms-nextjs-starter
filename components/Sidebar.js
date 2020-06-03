import React from 'react'
import styled from 'styled-components';

const SidebarContainer = styled.div`
    flex: 1 2 20%;
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
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <h4 className='sidebar-title'>Shop by category</h4>
      <ul>
        <li><a href="#">Snow</a></li>
        <li><a href="#">Fishing</a></li>
        <li><a href="#">Surf Gear</a></li>
        <li><a href="#">Women</a></li>
        <li><a href="#">Wetsuits</a></li>
        <li><a href="#">Snowboard</a></li>
        <li><a href="#">Outdoor</a></li>
        <li><a href="#">Ski Gear</a></li>
        <li><a href="#">Packs</a></li>
        <li><a href="#">Tents</a></li>
        <li><a href="#">Mens</a></li>
        <li><a href="#">Kids</a></li>
        <li><a href="#">Hiking Gear</a></li>
      </ul>
    </SidebarContainer>
  )
}

export default Sidebar
