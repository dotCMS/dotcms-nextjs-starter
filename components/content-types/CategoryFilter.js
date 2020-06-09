import React from 'react';
import PageContext from '../../contexts/PageContext';
import RouterLink from '../RouterLink';
import { SidebarContainer } from '../../styles/category-filter/category.styles';

function CategoryFilter(props) {
    const { nav } = React.useContext(PageContext);
    const [storeNav] = nav.filter((nav) => nav.href === '/Store' || nav.href === '/store');

    console.log(nav)

    const data = storeNav.children.reduce(function(acc, curr) {
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
            <h4 className="sidebar-title">{props.title}</h4>
            <ul>
                {data.map((item, i) => (
                    <li key={item.href}>
                        <RouterLink href={item.href} prefetch>
                            {item.title}
                        </RouterLink>
                    </li>
                ))}
            </ul>
        </SidebarContainer>
    );
}

export default CategoryFilter;
