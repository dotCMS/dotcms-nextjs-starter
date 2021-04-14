export function withEditable(Component) {
    return function ({ name, lang, mode, inode }) {
        return (
            <Component
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                data-mode={mode || 'minimal'}
                data-field-name={name}
                data-language={lang || '1'}
                data-inode={inode}
            />
        );
    };
}