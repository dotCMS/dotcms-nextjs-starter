import React from 'react';
import RouterLink from '../../../RouterLink';
import { useRouter } from 'next/router';
 
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
                    <RouterLink key={item.href} href={item.href}>
                        {item.title}
                    </RouterLink>
                    {item.children && (
                        <ul className="submenu">
                            {item.children[0].children.map((child, idx) => {
                                return (
                                    <li key={idx}>
                                        <RouterLink href={child.href}>{child.title}</RouterLink>
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
