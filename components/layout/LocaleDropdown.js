import {PageContext} from "../../pages/dotcms";
import React from "react";
import { setCookie } from "../../utils/dotcms/utilities";

const Options = ({languages}) => {
    return  Object.keys(languages).map(key => <option key={key} value={key}>{languages[key].name}</option>)
}

const LocaleDropdown = () => {

    const updateLanguage = (event) => {
        setCookie('dotSPALang', event.target.value);
        location.reload();
    };
    return (
        <PageContext.Consumer>
            {({ languages, currentLang }) => (
                <select value={currentLang} onChange={updateLanguage}>
                   <Options languages={languages} />
                </select>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
