import React from 'react';

const DateFormat = ({dateString}) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateText =  new Date(dateString).toLocaleDateString('en-US', options);
    return <time dateTime={dateString}>{dateText}</time>;
};

export default DateFormat;
