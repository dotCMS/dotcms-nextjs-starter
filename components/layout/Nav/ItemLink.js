import { NavLink } from "react-router-dom";

const getLink = (props, p) => (
  <a href={p.href} className={props.className}>
    {props.children}
  </a>
);

const getList = (props, p) => (
  <li
    className={props.topMenu && props.dropDown ? props.className : p.className}
  >
    {!Array.isArray(props.children) ? getLink(props, p) : <>{props.children}</>}
  </li>
);

const ItemLink = props => {
  return (
    <NavLink
      component={p => {
        return props.topMenu ? getList(props, p) : getLink(props, p);
      }}
      activeClassName="active"
      className="rd-nav-item"
      to={{
        pathname: props.pathname,
        state: props.state
      }}
    />
  );
};

export default ItemLink;
