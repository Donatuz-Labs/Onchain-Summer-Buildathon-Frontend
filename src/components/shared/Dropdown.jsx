import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'rc-dropdown';
// import 'rc-dropdown/assets/index.css';
import Menu, { Item as MenuItem } from 'rc-menu';
import ChevronRight from '../../assets/svg/chevron-right.svg';

const DropDown = ({
  id,
  textTitle,
  placeholder,
  labelItems,
  style,
  onSelected,
  value,
  wFull,
  error,
  touched,
  // styles
  menuWidth,
  menuHeight,
  arrowStyle,
  buttonStyle,
  placeholderStyle,
  placement,
  textStyle,
  titleStyle,
}) => {
  const showError = error && touched;
  const [selectedDropItem, setSelectedDropItem] = useState(labelItems.find((e) => e.value === value));

  useEffect(() => {
    setSelectedDropItem(labelItems.find((e) => e.value === value))
  }, [id]);

  const onSelect = useCallback(({ key }) => {
    const selection = labelItems.find((e) => e.label === key);
    setSelectedDropItem(selection)

    if (selection.id) {
      onSelected(selection);
    } else {
      onSelected(selection.value);
    }
  }, [labelItems, onSelected, value]);

  const finalMenuStyle = "text-3-5 tracking-1 cursor-pointer rounded-4"

  const menuStyle = {
    width: menuWidth,
    height: menuHeight,
    overflow: 'auto',
  };

  const configureDropDownMenu = (arrayLabels, setSelectedItem) => (
    <Menu
      className={finalMenuStyle}
      onSelect={setSelectedItem}
      style={menuStyle}
    >
      {arrayLabels.map((element) => (
        <MenuItem key={element.label} >
          <div
            className={"bg-white hover:bg-gray-300 px-2 cursor-pointer rounded-4"}
          >
            {element.label}
          </div>
        </MenuItem>
      ))}
    </Menu>
  );

  const displayValue = (
    dropdownId, selectedDropdownItem, textStyles, placeholderText, placeholderStyles,
  ) => {
    if (selectedDropdownItem) {
      return <p className={textStyles} id={`selected-${dropdownId}`}>{selectedDropdownItem.label}</p>;
    }

    return <p className={placeholderStyles} id={`selected-${dropdownId}`}>{placeholderText}</p>;
  };

  return (
    <div className={wFull} key={id}>
      <label className={`absolute mt-2 ml-4 z-1 ${wFull}`} htmlFor={id}>
        <p className={`text-blue-grey text-3 capitalize ${titleStyle}`}>{textTitle}</p>
      </label>
      <Dropdown
        id={id}
        trigger={['click']}
        overlay={configureDropDownMenu(labelItems, onSelect)}
        overlayClassName='scroll-dropdown'
        openClassName="border-primary"
        className={`${style}`}
        animation="slide-up"
        placement={placement}
      >
        <button type="button" className={`flex items-center py-2 pfocus:outline-none bg-white ${buttonStyle} `} name={id}>
          {displayValue(id, selectedDropItem, textStyle, placeholder, placeholderStyle)}
          <ChevronRight className={`fill-current rotate-90 text-light-grey-blue ${arrowStyle}`} />
        </button>
      </Dropdown>
      {showError && <p className="px-4 mt-1 font-normal leading-relaxed error-text text-2-5 text-red font">{error}</p>}
    </div>
  );
};

DropDown.defaultProps = {
  value: null,
  style: 'h-15 w-full outline-none text-slate border border-solid border-light-periwinkle-three rounded-4 bg-white',
  error: '',
  textTitle: '',
  wFull: 'w-full',
  placeholder: '',
  buttonStyle: 'flex items-center justify-between focus:outline-none',
  placeholderStyle: 'w-full text-left text-3-5 text-blue-grey font-normal ml-4 mt-4',
  arrowStyle: 'inline-flex relative right-2 mr-2',
  touched: false,
  menuHeight: 300,
  menuWidth: 300,
  textStyle: 'text-3-5 w-full text-left ml-4 mt-4 text-navy',
  placement: 'bottomLeft',
  titleStyle: '',
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    displayLabel: PropTypes.string,
  })).isRequired,
  textTitle: PropTypes.string,
  wFull: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.string,
  style: PropTypes.string,
  arrowStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  menuHeight: PropTypes.number,
  menuWidth: PropTypes.number,
  textStyle: PropTypes.string,
  placement: PropTypes.string,
  titleStyle: PropTypes.string,
};

export default DropDown;
