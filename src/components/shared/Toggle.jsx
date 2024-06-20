import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

const Toggle = ({
  text,
  textIcon,
  value,
  onChange,
  activeColor,
}) => (
  <div id="toggle" className="flex flex-row items-center justify-between w-full px-3 py-1 space-y-2">
    <label className="flex w-full cursor-pointer select-none">
      <div className="inline-flex">
        {textIcon}
        <h2 className="text-navy primary-font blackened upper extra">{text}</h2>
      </div>
    </label>
    <Switch
      onChange={onChange}
      checked={value}
      checkedIcon={false}
      uncheckedIcon={false}
      offColor={"#C6AAFF"}
      offHandleColor={"#fff"}
      onColor={activeColor}
      onHandleColor={"#fff"}
      activeBoxShadow={`0 0 2px 3px ${activeColor}`}
      handleDiameter={19}
      height={25}
      width={41}
    />
  </div>
);

Toggle.defaultProps = {
  textIcon: null,
  value: false,
};

Toggle.propTypes = {
  text: PropTypes.string.isRequired,
  textIcon: PropTypes.node,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  activeColor: PropTypes.string.isRequired,
};

export default Toggle;
