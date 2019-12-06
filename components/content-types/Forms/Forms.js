import React from 'react';
import reactifyWc from 'reactify-wc';

const DotFormWC = reactifyWc('dot-form');

const Forms = ({ layout, variable }) => {
    return <DotFormWC variable={variable} layout={layout}></DotFormWC>;
};

export default Forms;
