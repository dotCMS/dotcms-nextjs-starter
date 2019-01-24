const getDim = text => `\x1b[2m${text}${getResetColors()}`;
const getResetColors = () => `\x1b[0m`;

export const DOTCMS = 'DotCMS';
export const printBright = text => console.log('\x1b[1m', text, getResetColors());
export const printDim = text => console.log(getDim(text));

export const printHeading = title => {
    const line = new Array(title.length + 4).fill('-').join('');
    console.log('\n');
    printBright(title);
    console.log(line);
};

export const getQuestionHint = (text, label) => getDim(`(${label || 'default'}: ${text})`) + getResetColors();
