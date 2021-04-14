import { useContext } from 'react';
import PageContext from '../../contexts/PageContext';

export function withEditable(Component) {
    const { isEditMode } = useContext(PageContext);

    return function ({ name, lang, mode, inode }) {
        return (
            <Component
                onClick={(e) => {
                    if (isEditMode) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }}
                data-mode={mode || 'minimal'}
                data-field-name={name}
                data-language={lang || '1'}
                data-inode={inode}
            />
        );
    };
}
