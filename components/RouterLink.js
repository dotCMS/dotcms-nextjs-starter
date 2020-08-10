import { useContext, useEffect } from 'react';
import Link from 'next/link';
import PageContext from '../contexts/PageContext';
import { emitEMANavEvent } from '../utilities/dotcms';
import { getLocaleHref } from './../utilities/dotcms/locale';

const isAbsolutePath = (href) => {
    const regex = /^https?:\/\/|^\/\//i;
    return regex.test(href);
};

const RouterLink = ({ href, children, className, ariaLabel }) => {
    const { isEditMode, languageProps: { defaultLanguage } = {} } = useContext(PageContext);

    if (isEditMode) {
        return (
            <a
                style={{ cursor: 'pointer' }}
                aria-label={ariaLabel}
                onClick={() => {
                    emitEMANavEvent(href);
                }}
                className={className}
            >
                {children}
            </a>
        );
    }

    if (isAbsolutePath(href)) {
        return (
            <a
                aria-label={ariaLabel}
                className={className}
                rel="noopener noreferrer"
                style={{ cursor: 'pointer' }}
                target="_blank"
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={'/[[...slug]]'}
            as={getLocaleHref({
                as: href,
                defaultLang: defaultLanguage
            })}
        >
            <a aria-label={ariaLabel} className={className}>
                {children}
            </a>
        </Link>
    );
};

export default RouterLink;
