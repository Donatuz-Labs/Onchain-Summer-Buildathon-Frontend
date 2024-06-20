import React from "react";

import { ROUTES } from "../../utils/routes.js";
import { Outlet } from "react-router-dom";


import HeaderMenuSmall from "./HeaderMenuSmall";

import House from '../../assets/svg/house.jsx';
import Person from '../../assets/svg/person.jsx';
import Alert from '../../assets/svg/alert.jsx';
import People from '../../assets/svg/people.jsx';
import Plus from '../../assets/svg/plus.jsx';

const navigation = [
  {
    name: "house",
    href: ROUTES.PROFILE,
    icon: House,
  },
  {
    name: "people",
    href: ROUTES.PROFILE,
    icon: People,
  },
  {
    name: "plus",
    href: ROUTES.PROFILE,
    icon: Plus,
  },
  {
    name: "house",
    href: ROUTES.PROFILE,
    icon: House,
  },
  {
    name: "person",
    href: ROUTES.PROFILE,
    icon: Person,
  }
];

const HeaderLayout = () => {

  return (
    <div className="h-full bg-personal-bg bg-cover bg-center border-b border-pale-grey">
      <div className="px-6 lg:px-16">
        <div className="relative flex items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center z-50">
            <HeaderMenuSmall navigationOptions={navigation} />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
