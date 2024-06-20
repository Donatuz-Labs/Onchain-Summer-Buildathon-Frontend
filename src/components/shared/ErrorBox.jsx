import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Warning } from '../../assets/svg/warning.svg';

const ErrorBox = ({ errorMessage }) => (
  <div
    className="flex items-start w-full px-2 py-5 font-medium border rounded-4 border-red bg-lighter-red text-3 text-red text-3-5"
    id="error-box"
  >
    <Warning className="w-20 mr-2 fill-current" />
    {errorMessage}
  </div>
);

ErrorBox.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorBox;
