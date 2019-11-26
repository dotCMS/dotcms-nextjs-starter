const getDateLocale = (date, locale = 'en-us') =>
    date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

const getTimeLocale = (date, locale = 'en-us') =>
    date.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric'
    });

const DateTimeFormat = ({ value, format = 'Date', locale = 'en-us' }) => {
    const d = new Date(value);
    let formatString = '';

    switch (format) {
        case 'Date':
            formatString = getDateLocale(d, locale);
            break;
        case 'Time':
            formatString = getTimeLocale(d, locale);
            break;
        case 'DateTime':
            formatString = `${getDateLocale(d, locale)} at ${getTimeLocale(d, locale)}`;
            break;
    }

    return <time dateTime={value}>{formatString}</time>;
};

export default DateTimeFormat;
