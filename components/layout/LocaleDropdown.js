import { PageContext } from "../../pages/_app";
import React from "react";

const Options = ({ languages }) => {
  return languages.map(lang => (
    <option key={lang.languageCode} value={lang.languageCode}>
      {lang.language}
    </option>
  ));
};

const LocaleDropdown = () => {
  return (
    <PageContext.Consumer>
      {({ language }) => (
        <select defaultValue={language.current} onChange={language.set}>
          <Options languages={language.options} />
        </select>
      )}
    </PageContext.Consumer>
  );
};

export default LocaleDropdown;
