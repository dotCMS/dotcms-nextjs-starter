import NavDropDown from './NavDropDown';
import NavBarSearch from './NavBarSearch';

import PageContext from '../../../context/PageContext';
import RouterLink from '../../shared/RouterLink';

export default function Nav() {
    return (
        <div className="rd-navbar-main-element">
            <PageContext.Consumer>
                {({ nav }) => (
                    <>
                        <div className="rd-navbar-nav-wrap">
                            <ul className="rd-navbar-nav">
                                {nav.map((item) => {
                                    if (item.type === 'folder' && item?.children?.length) {
                                        return <NavDropDown key={item.hash} options={item} />;
                                    } else {
                                        return (
                                            <li className="rd-nav-item" key={item.hash}>
                                                <RouterLink
                                                    className="rd-nav-link"
                                                    href={item.href}
                                                >
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
                )}
            </PageContext.Consumer>
        </div>
    );
}
