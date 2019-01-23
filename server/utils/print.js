const DOTCMS = 'DotCMS';

const fakeEnv = {
    REACT_APP_DOTCMS_HOST: 'http://localhost:8080',
    PUBLIC_URL: 'http://localhost:5000'
};

const getResetColors = () => `\x1b[0m`;
const printBright = text => console.log('\x1b[1m', text, getResetColors());
const getDim = text => `\x1b[2m${text}${getResetColors()}`;
const printDim = text => console.log(getDim(text));

const printHeading = title => {
    const line = new Array(title.length + 4).fill('-').join('');
    console.log('\n');
    printBright(title);
    console.log(line);
};

const getQuestionHint = (text, label) => getDim(`(${label || 'default'}: ${text})`) + getResetColors();

module.exports = {
    DOTCMS,
    fakeEnv,
    getQuestionHint,
    printHeading,
    printDim
};
