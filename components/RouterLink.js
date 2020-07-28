import { useContext } from 'react';
import Link from 'next/link';
import PageContext from '../contexts/PageContext';
import { emitRemoteRenderEdit } from '../utilities/dotcms';

const RouterLink = ({ href, children, className, ariaLabel }) => {
    const { isEditMode } = useContext(PageContext);

    return isEditMode ? (
        <a
            style={{ cursor: 'pointer' }}
            aria-label={ariaLabel}
            onClick={() => {
                emitRemoteRenderEdit(href);
            }}
            className={className}
        >
            {children}
        </a>
    ) : (
        <Link
            href={'/[[...slug]]'}
            as={`${href}`}
        >
            <a aria-label={ariaLabel} className={className}>
                {children}
            </a>
        </Link>
    );
};

export default RouterLink;
