import { useContext } from 'react';
import RowContainer from './RowContainer';
import PageContext from '../../../contexts/PageContext';

const LayoutGrid = () => {
    const {
        pageRender: {
            layout: { body }
        }
    } = useContext(PageContext);

    return body && body.rows ? (
        body.rows.map((row, i) => (
            <section key={i} id={`section-${i + 1}`} className={`section ${row.styleClass || ''}`}>
                <RowContainer row={row} />
            </section>
        ))
    ) : (
        <h1> Layout not found </h1>
    );
};

export default LayoutGrid;
