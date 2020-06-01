import Header from '../Header';
import Footer from '../Footer';
import LayoutWithSidebar from './LayoutWithSidebar';

export default function Layout({ sidebar, body, children }) {
    const includeHeader = body.header !== false;
    const includeFooter = body.footer !== false;

    return (
        <>
            {includeHeader ? <Header /> : null}
            {sidebar && !!sidebar.location ? (
                <LayoutWithSidebar sidebar={sidebar}>{children}</LayoutWithSidebar>
            ) : (
                children
            )}
            {includeFooter ? <Footer /> : null}
        </>
    );
}
