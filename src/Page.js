import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';

import RowContainer from './Components/RowContainer';

import './Page.css';


const Page = ({data}) => {
    return (
        <BootstrapContainer>
            {data.body.rows.map((row, i) => {
                return <RowContainer row={row} key={i} />;
            })}
        </BootstrapContainer>
    );
};

export default Page;
