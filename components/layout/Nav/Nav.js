import { useContext } from 'react';
import NavDropDown from './NavDropDown';
import NavBarSearch from './NavBarSearch';

import PageContext from '../../../contexts/PageContext';
import RouterLink from '../../RouterLink';

export default function Nav() {
    const { nav } = useContext(PageContext);
    return (
        <>
            <div className="rd-navbar-nav-wrap">
                <ul className="rd-navbar-nav">
                    {nav.map((item) => {
                        if (item.type === 'folder' && item?.children?.length) {
                            return <NavDropDown key={item.hash} options={item} />;
                        } else {
                            return (
                                <li className="rd-nav-item" key={item.hash}>
                                    <RouterLink className="rd-nav-link" href={item.href}>
                                        {item.title}
                                    </RouterLink>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <NavBarSearch />
        </>
    );
}
