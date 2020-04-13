import React from 'react';

const Form = ({ rendered }) => {
    return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
};

export default Form;
