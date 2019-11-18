import { PageContext } from "../../pages/dotcms";
import React from "react";

const Options = ({languages}) => {
    return  Object.keys(languages).map(key => <option key={key} value={key}>{languages[key].name}</option>)
}

const LocaleDropdown = () => {

    return (
        <PageContext.Consumer>
            {({ languages, currentLang, setLanguage }) => (
                <select defaultValue={currentLang} onChange={setLanguage}>
                   <Options languages={languages} />
                </select>
            )}
        </PageContext.Consumer>
    );
};

export default LocaleDropdown;
