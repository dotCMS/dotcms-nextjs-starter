import React from 'react';

const format = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const DateFormat = ({dateString}) => {
    return <time dateTime={dateString}>{format(dateString)}</time>;
};

export default DateFormat;
