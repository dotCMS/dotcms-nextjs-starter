import ItemLink from './ItemLink';
import NavDropDown from './NavDropDown';
import NavBarSearch from './NavBarSearch';

import { PageContext } from '../../../pages/_app';

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
                                                <ItemLink
                                                    className="rd-nav-link"
                                                    pathname={item.href}
                                                >
                                                    {item.title}
                                                </ItemLink>
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
