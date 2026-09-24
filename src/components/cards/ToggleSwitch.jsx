import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ checked, onChange, indeterminate = false }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0 ${
      checked || indeterminate
        ? "bg-[#113071] dark:bg-[#4da3e0]"
        : "bg-gray-300 dark:bg-gray-600"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked || indeterminate ? "translate-x-5" : "translate-x-0.5"
      }`}
    >
      {indeterminate && !checked && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-0.5 bg-gray-400 rounded"></div>
        </div>
      )}
    </span>
  </button>
);

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
};

export default ToggleSwitch;
