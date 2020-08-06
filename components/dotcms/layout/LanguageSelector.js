import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PageContext from '../../../contexts/PageContext';
import {
    setCurrentLanguage,
    getCurrentLanguage,
    removeCurrentLanguage
} from '../../../utilities/dotcms/locale';

const LanguageSelect = styled.select`
    margin-left: 1rem;
`;

const LanguageSelector = () => {
    const router = useRouter();
    const [language, setLanguage] = useState('');
    const { languageProps } = useContext(PageContext);


    // Predicate to determine whether we should set the new language or not
    const shouldSetLanguage = (lang) => {
        const languageFound = () => {
            return (
                Object.values(languageProps.languages.find((val) => val.languageCode === lang) || [])
                    .length > 0
            );
        };

        return !router.query.slug?.includes(getCurrentLanguage()) && languageFound();
    };

    useEffect(() => {
        // Set out selectedLanguage state on initial render
        setLanguage(languageProps.selectedLanguage);

        const { slug = [] } = router.query;
        // If the user manually removes the language and one is found in the available languages then store in localStorage
        if (shouldSetLanguage(slug[0])) {
            setCurrentLanguage(slug[0]);
        } else if (shouldSetLanguage(languageProps.defaultLanguage)) {
            setCurrentLanguage(languageProps.defaultLanguage);
        }

        return () => removeCurrentLanguage();
    }, []);

    const getRoute = (value, slug) => {
        if (value === languageProps.defaultLanguage) {
            return slug ? slug.filter((route) => route !== language) : [];
        }
        return slug ? [value, ...slug.filter((route) => route !== value)] : [`${value}`];
    };

    const handleLanguageChange = (value) => {
        setCurrentLanguage(value)
        setLanguage(value);

        const {
            query: { slug }
        } = router;

        const route = getRoute(value, slug);
        router.replace('/[[...slug]]', `/${route.join('/')}`);
    };

    return (
        <div className="form-wrap-select">
            <LanguageSelect
                className="form-input"
                value={language}
                onChange={({ target }) => {
                    handleLanguageChange(target.value);
                }}
            >
                {Object.keys(languageProps).length > 0 &&
                    languageProps.languages.map((lang) => (
                        <option key={lang.id} value={lang.languageCode}>
                            {lang.language}
                        </option>
                    ))}
            </LanguageSelect>
        </div>
    );
};

export default LanguageSelector;
