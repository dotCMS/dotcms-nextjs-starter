import ContentletContainer from './Container';
import Column from './Column';
import SimpleWidget from '../content-types/SimpleWidget';

const ColumnContainer = ({ width, offset, styleClass, containers }) => {
    return (
        <Column md={{ size: width, offset: offset }} className={styleClass}>
            {containers.map((container) => {
                return container.maxContentlets ? (
                    <ContentletContainer container={container} key={container.identifier} />
                ) : (
                    <SimpleWidget
                        key={container.identifier}
                        {...{ rendered: container.rendered }}
                    />
                );
            })}
        </Column>
    );
};

export default ColumnContainer;
