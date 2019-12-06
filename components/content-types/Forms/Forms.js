import React from 'react';
import reactifyWc from 'reactify-wc';

const DotFormWC = reactifyWc('dot-form');

const Forms = ({ layout }) => {
    return <DotFormWC variable="Contact" layout={layout}></DotFormWC>;
};

export default Forms;
