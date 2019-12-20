import NavOption from './NavOption';
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
                                    return <NavOption key={item.hash} item={item} />;
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
