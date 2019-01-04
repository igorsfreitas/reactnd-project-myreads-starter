import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material Imports
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';

// Utils
import email from 'utils/validators/email';

class FormFieldEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
  }

  componentDidMount() {
    this.setState({
      ...this.props,
      input: {
        value: this.props.value ? this.props.value : '',
        isEmpty: this.props.value ? this.props.value : true
      }
    });
  }

  render() {
    const input = this.state.input;
    const isValid = input !== null ? (input.isValid && !input.isEmpty) || input.isEmpty : false;
    return this.props.onChange !== null ? (
      <FormControl error={!isValid}>
        <InputLabel>Email</InputLabel>
        <Input
          id="email"
          value={input !== null ? input.value : ''}
          onChange={this.handler.bind(this)}
          onBlur={this.handler.bind(this)}
          disabled={this.props.disabled}
        />
        {!isValid ? <FormHelperText>Ex:. exemplo@email.com</FormHelperText> : null}
      </FormControl>
    ) : (
      console.warn('The FormFieldEmail needs `onChange()` prop')
    );
  }

  /**
   * Set `input` state and call `onChange: func` with the formated data
   * @param {Proxy} e
   */
  handler(e) {
    const _value = e.target.value.toLowerCase();
    this.setState({ input: this.formatData(_value) });
    if (this.props.onChange !== null) this.props.onChange(this.formatData(_value));
  }

  /**
   * Return formated data
   * @param {string} _value
   */
  formatData(_value) {
    return {
      name: 'email',
      value: _value,
      isEmpty: _value === '',
      isValid: email(_value)
    };
  }
}

FormFieldEmail.defaultProps = {
  onChange: null
};

FormFieldEmail.propTypes = {
  onChange: PropTypes.func
};

export default FormFieldEmail;
