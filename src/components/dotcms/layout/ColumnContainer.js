import ContentletContainer from './Container';
import Column from './Column';

const ColumnContainer = ({ width, offset, styleClass, containers }) => {
    return (
        <Column className={styleClass} md={{ size: width, offset: offset }}>
            {containers.map((container) => (
                <ContentletContainer container={container} key={container.identifier} />
            ))}
        </Column>
    );
};

export default ColumnContainer;
