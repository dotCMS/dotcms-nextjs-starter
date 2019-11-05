import NavOption from './NavOption';
import NavDropDown from './NavDropDown';
import NavBarSearch from './NavBarSearch';

import { PageContext } from '../../../pages/dotcms';

export default function Nav() {
    return (
        <div className="rd-navbar-main-element">
            <PageContext.Consumer>
                {({ nav }) => (
                    <>
                        <div className="rd-navbar-nav-wrap">
                            <ul className="rd-navbar-nav">
                                {nav.map(item => {
                                    if (item.children.length && item.type === 'folder') {
                                        return <NavDropDown key={item.hash} options={item} />;
                                    } else {
                                        return <NavOption key={item.hash} item={item} />;
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
