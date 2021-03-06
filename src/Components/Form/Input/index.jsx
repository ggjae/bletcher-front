import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const defaultProps = {
  label: '',
  autoComplete: '',
  width: '200px',
  disabled: false,
  error: false,
  helperText: ' ',
  InputProps: null,
  onKeyPress: null,
};
const propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  InputProps: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};

const PurpleInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: purple[700],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: purple[700],
    },
    '& label.Mui-error': {
      color: 'red',
    },
    '& .Mui-error:after': {
      borderBottomColor: 'red',
    },
  },
})(TextField);

function Input(props) {
  const {
    label,
    type,
    autoComplete,
    width,
    disabled,
    error,
    helperText,
    InputProps,
    onChange,
    onKeyPress,
  } = props;

  return (
    <PurpleInput
      label={label}
      type={type}
      autoComplete={autoComplete}
      style={{ width }}
      disabled={disabled}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: InputProps,
      }}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
