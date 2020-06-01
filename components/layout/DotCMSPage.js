import RowContainer from './RowContainer';

const DotCMSPage = ({ body, products }) => {
    return body && body.rows ? (
        body.rows.map((row, i) => (
            <section key={i} id={`section-${i + 1}`} className={`section ${row.styleClass || ''}`}>
                <RowContainer row={row} />
            </section>
        ))
    ) : (
        <h1>Can't Render</h1>
    );
};

export default DotCMSPage;
