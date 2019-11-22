const DateFormat = ({ value }) => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const d = new Date(value);

    return <time dateTime={value}>{`${monthNames[d.getMonth()]} ${d.getUTCDate()}, ${d.getFullYear()}`}</time>;
};

export default DateFormat;
