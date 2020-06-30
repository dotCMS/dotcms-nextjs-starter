import RowContainer from './RowContainer';
const LayoutGrid = ({ body }) => {
    return body && body.rows ? (
        body.rows.map((row, i) => (
            <section key={i} id={`section-${i + 1}`} className={`section ${row.styleClass || ''}`}>
                <RowContainer row={row} />
            </section>
        ))
    ) : (
        <h1> bbhj </h1>
    );
};

export default LayoutGrid;