import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

const MenuLink = ({ label, to, classes }) => {
  return (
    <Route
      children={({ match }) => {
        const active = match ? classes.active : classes.menuItem;
        return (
          <li className={cn(`${active}`)}>
            <Link className="my-link"
              to={to}>
              {label}
            </Link>
          </li>
        );
      }}
      // exact={activeOnlyWhenExact}
      path={to}
    />
  );
};

MenuLink.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool
};

export default MenuLink;
