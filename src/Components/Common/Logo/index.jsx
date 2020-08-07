import React from 'react';
import PropTypes from 'prop-types';

import logoImg from 'Assets/logo/logo.png';

const defaultProps = {
  width: '100px',
};
const propTypes = {
  width: PropTypes.string,
};

function Logo(props) {
  const { width } = props;

  return (
    <div className="logo">
      <img src={logoImg} width={width} alt="logo" />
    </div>
  );
}

Logo.defaultProps = defaultProps;
Logo.propTypes = propTypes;

export default Logo;
