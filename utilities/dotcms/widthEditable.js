export function withEditable(Component) {
    return function ({ name, lang, mode, inode }) {
        return (
            <Component
                data-mode={mode || minimal}
                data-field-name={name}
                data-language={lang}
                data-inode={inode}
            />
        );
    };
}