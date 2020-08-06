import React, { useContext } from 'react';
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
        <nav className="menu menu__list">
            {navigation.map((item) => (
                <RouterLink
                    key={item.href}
                    className={routerLinkClassName(item).join(' ')}
                    href={item.href}
                >
                    {item.title}
                    {item.children && (
                        <ul className="submenu">
                            {item.children[0].children.map((child, idx) => {
                                return (
                                    <li key={idx}>
                                        <RouterLink href={child.href}>
                                            {child.title}
                                        </RouterLink>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </RouterLink>
            ))}
        </nav>
    );
}

export default MenuList;
