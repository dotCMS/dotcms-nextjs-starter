import ContentletContainer from './Container';
import Column from './Column';

const ColumnContainer = ({ width, offset, styleClass, containers }) => {
    return (
        <Column md={{ size: width, offset: offset }} className={styleClass}>
            {containers.map((container) => (
                <ContentletContainer container={container} key={container.identifier} />
            ))}
        </Column>
    );
};

export default ColumnContainer;
