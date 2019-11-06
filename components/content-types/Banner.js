import { Col as BootstrapCol } from 'reactstrap';

export default function Banner(props) {
    return (
        <div
            className="banner bg-image-full bg-overlay-30 context-dark"
            style={{
                color: 'blue',
                backgroundImage: `url("/dA/${props.identifier}/image/1200w/50q/banner")`
            }}
        >
            <div className="container">
                <div className="row justify-content-lg-center">
                    <BootstrapCol lg={9} className="text-center">
                        <p className="banner-title">{props.title}</p>
                        <h2 className="text-decoration-lines-2">
                            <span>
                                {props.caption}
                                <span className="text-decoration-line text-decoration-line-left"></span>
                                <span className="text-decoration-line text-decoration-line-right"></span>
                            </span>
                        </h2>

                        {props.buttonText && props.link && (
                            <div className="group-lg">
                                <a className="button button-primary button-leaf" href={props.link}>
                                    {props.buttonText}
                                </a>
                            </div>
                        )}
                    </BootstrapCol>
                </div>
            </div>
        </div>
    );
}
