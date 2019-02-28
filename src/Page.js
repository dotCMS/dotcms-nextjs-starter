import React from 'react';
import RowContainer from './Components/RowContainer';
import CantRender from './Components/CantRender';
import { Spinner } from 'reactstrap';

const Page = ({ body, loading }) => {
    return body && body.rows ? (
        body.rows.map((row, i) => {
            return <RowContainer row={row} key={i} />;
        })
    ) : (
        !loading ? <CantRender title="Page can not be rendered">
            <p>
                You might not have enterprise license or the page is not created with our layout
                editor.
            </p>
        </CantRender> : <Spinner color="primary" />
    );
};

export default Page;
