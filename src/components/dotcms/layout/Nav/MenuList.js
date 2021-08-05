import React from 'react';
import RouterLink from '../../../RouterLink';
import { useRouter } from 'next/router';

const getHref = href => {
    const ref = href.split('/').filter(part => part !== 'index').join('/');

    return ref || '/'
}
 
function MenuList({ navigation }) {
    const router = useRouter();

    const routerLinkClassName = (item) => {
        return [
            router.asPath.split('/').filter(Boolean)[0] === item.href.split('/')[1] ? 'active' : '',
            item.children ? 'hasChildren' : ''
        ];
    };

    return (
        <ul className="menu menu__list">
            {navigation.map((item, index) => (
                <li key={index} className={routerLinkClassName(item).join(' ')}>
                    <RouterLink key={item.href} href={getHref(item.href)}>
                        {item.title}
                    </RouterLink>
                    {item.children && (
                        <ul className="submenu">
                            {item.children[0].children.map((child, idx) => {
                                return (
                                    <li key={idx}>
                                        <RouterLink href={getHref(child.href)}>{child.title}</RouterLink>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}



export default MenuList;
