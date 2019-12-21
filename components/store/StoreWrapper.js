import Header from '../layout/Header';
import Footer from '../layout/Footer/Footer';

export default function StoreWrapper({ mainTitle, children }) {
    return (
        <>
            <Header />
            <div className="body-wrapper">
                <section id="section-1" className="section section-md">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {mainTitle ? (
                                    <h1 className={mainTitle.className ? mainTitle.className : ''}>
                                        {mainTitle.value}
                                    </h1>
                                ) : (
                                    ''
                                )}
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
