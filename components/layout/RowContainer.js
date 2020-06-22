import ColumnContainer from './ColumnContainer';

const calcColumnOffset = (prev, col) => {
    return prev ? col.left - (prev.width + prev.left) : col.left > 0 ? col.left : null;
};

const getColumnsWithOffset = (row) => {
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
    const cols = getColumnsWithOffset(row);

    return (
        <div className="container">
            <div className="row">
                {cols.map((col, k) => (
                    <ColumnContainer {...col} key={k} />
                ))}
            </div>
        </div>
    );
};

export default RowContainer;
