import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import FilledCheckbox from '../../assets/svg/filled-checkbox.svg';
import UncheckedIcon from '../../assets/svg/empty-checkbox.svg';

const CheckBox = ({
  id,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = useCallback(() => {
    onChange(!checked);
  },
  [onChange, checked]);

  return (
    <button
      id={id}
      type="button"
      onClick={handleCheckboxChange}
      className="focus:outline-none"
    >
      <span>
        { checked
          ? (<img
          className="text-primary"
          src={FilledCheckbox}
          alt={"org-logo"}
        />)
          : (<img
            className="text-primary"
            src={UncheckedIcon}
            alt={"org-logo"}
          />)}
      </span>
    </button>
  );
};

CheckBox.defaultProps = {
  id: '',
  checked: false,
};

CheckBox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
