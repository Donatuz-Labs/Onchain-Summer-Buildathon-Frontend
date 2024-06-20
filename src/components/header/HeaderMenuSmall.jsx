import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const HeaderMenuSmall = ({ navigationOptions }) => {
  const [activeIcon, setActiveIcon] = useState('Agenda');

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <nav
      className="fixed inset-x-0 flex h-33 pb-16 -bottom-16"
      aria-hidden="false"
      data-shared-element-id="tab-bar"
    >
      <div className="h-full flex items-center justify-center flex-auto bg-black bg-cover bg-center">
        {navigationOptions.map((item) => {
          const HeaderIcon = item.icon;
          const isActive = activeIcon === item.name;

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => handleIconClick(item.name)}
              className={`${ 
                item.name !== 'plus' ? "fill-nili-dark-blue px-3 py-3 rounded-3 text-sm font-medium flex flex-auto justify-center gap-1.5 items-center flex-col cursor-pointer bg-transparent hover:text-primary-header" : "mt-2 fill-nili-dark-blue px-3 py-3 rounded-3 text-sm font-medium flex flex-auto justify-center gap-1.5 items-center flex-col cursor-pointer bg-transparent hover:text-primary-header"
              }`}
            >
            <HeaderIcon className={`${
                isActive ? 'fill' : ''
              }`} style={{height:'10px', width:'10px'}}/>
          </Link>
        )})}
      </div>
    </nav>
  );
};

HeaderMenuSmall.propTypes = {
  navigationOptions: PropTypes.arrayOf(PropTypes.object)
}

export default HeaderMenuSmall;
