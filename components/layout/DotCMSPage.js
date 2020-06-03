import RowContainer from './RowContainer';
import { getComponent } from '../content-types/mapContentTypes'
const DotCMSPage = ({ pageRender }) => {
    const body = pageRender?.layout?.body;
    const contentMap = pageRender?.urlContentMap;

let SinglePage;
if(contentMap) {
    SinglePage = getComponent(`${contentMap.contentType}Single`);
    return <SinglePage {...contentMap} />;
} else {
    return body && body.rows ? (
        body.rows.map((row, i) => (
            <section
                key={i}
                id={`section-${i + 1}`}
                className={`section ${row.styleClass || ''}`}
            >
                <RowContainer row={row} />
            </section>
        ))
    ) : (
        <h1>Can't Render</h1>
    );
}


};

export default DotCMSPage;
