import { Row as BootstrapRow } from 'reactstrap';
import ColumnContainer from './ColumnContainer';
import { Container as BootstrapContainer } from 'reactstrap';

const calcColumnOffset = (prev, col) => {
    return prev ? col.left - (prev.width + prev.left) : col.left > 0 ? col.left : null;
};

const getColumnsWithOffset = row => {
    return row.columns.reduce((acc, col) => {
        const prev = acc[acc.length - 1] || null;

        return acc.concat([
            {
                ...col,
                offset: calcColumnOffset(prev, col)
            }
        ]);
    }, []);
};

const RowContainer = ({ row }) => {
    const cols = getColumnsWithOffset(row);``

    return (
        <BootstrapContainer>
            <BootstrapRow>
                {cols.map((col, k) => (
                    <ColumnContainer {...col} key={k} />
                ))}
            </BootstrapRow>
        </BootstrapContainer>
    );
};

export default RowContainer;
