import { Col as BootstrapCol } from 'reactstrap';

import Container from './Container';

const ColumnContainer = ({ width, offset, styleClass, containers }) => {
    return (
        <BootstrapCol md={{ size: width, offset: offset }} className={styleClass || ''}>
            {containers.map((container) => {
                return <Container container={container} key={container.identifier} />;
            })}
        </BootstrapCol>
    );
};

export default ColumnContainer;
