import React from 'react'
import PageContext from '../../context/PageContext'; 
import styled from 'styled-components';
import Link from 'next/link';

const SidebarContainer = styled.div`
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

function CategoryFilter(props) {

  const { nav } = React.useContext(PageContext);

  const data = nav.reduce(function (acc, curr) {
      if (curr.children.length > 0) {
          acc = [
              ...acc,
              ...curr.children.map((children) => ({ title: children.title, href: children.href }))
          ];
      }
      return acc;
  }, []);
  
  return (
      <SidebarContainer>
        <h4 className='sidebar-title'>{props.title}</h4>
          <ul>
            {data.map(item => <li><Link href={item.href}><a>{item.title}</a></Link></li>)}
          </ul>
      </SidebarContainer>
  )
}

export default CategoryFilter
