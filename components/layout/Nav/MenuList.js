import React, { useContext } from 'react'
import RouterLink from '../../RouterLink';
import { useRouter } from 'next/router'
import PageContext from '../../../contexts/PageContext';


function MenuList({navigation}) {

  const router = useRouter();
  const { languageProps: { selectedLanguage, defaultLanguage } = {} } = useContext(PageContext) || {};

  const routerLinkClassName = (item) => {
      return [
          router.asPath.split('/').filter(Boolean)[0] === item.href.split('/')[1] ? 'active' : '',
          item.children ? 'hasChildren' : ''
      ];
  };

  const getHref = (selectedLang, item) => {
    return selectedLang && selectedLang !== defaultLanguage
        ? `${selectedLang}${item.href}`
        : `${item.href}`;
  }

  return (
      <nav className="menu menu__list">
          {navigation.map((item) => (
              <RouterLink
                  key={item.href}
                  className={routerLinkClassName(item).join(' ')}
                  href={getHref(selectedLanguage, item)}
              >
                  {item.title}
                  {item.children && (
                      <ul className="submenu">
                          {item.children[0].children.map((child, idx) => {
                              return (
                                  <li key={idx}>
                                      <RouterLink href={getHref(selectedLanguage, child)}>
                                          {child.title}
                                      </RouterLink>
                                  </li>
                              );
                          })}
                      </ul>
                  )}
              </RouterLink>
          ))}
      </nav>
  );
}

export default MenuList
