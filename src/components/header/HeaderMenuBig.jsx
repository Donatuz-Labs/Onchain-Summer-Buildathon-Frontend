import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const HeaderMenuBig = ({ navigationOptions }) => {
  return (
    <div className="hidden lg:block lg:ml-6">
      <div className="flex space-x-4">
        {navigationOptions.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="px-4 py-2 text-sm font-medium rounded-md text-blue-menu"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

HeaderMenuBig.propTypes = {
  navigationOptions: PropTypes.arrayOf(PropTypes.object)
}

export default HeaderMenuBig;
