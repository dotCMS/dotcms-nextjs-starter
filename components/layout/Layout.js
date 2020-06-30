import Header from '../Header';
import Footer from '../Footer';

export default function Layout({children, footer, header }) {
    return (
        <>
            {header ? <Header/> : null}
            {children}
            {footer ? <Footer/> : null}
        </>
    );
}
