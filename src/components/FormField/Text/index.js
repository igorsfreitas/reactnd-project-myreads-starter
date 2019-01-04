import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material Component
import { Tooltip, Icon, FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';

class FormFiledText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null,
      value: ''
    };
  }

  componentDidMount() {
    this.setState({
      ...this.props,
      input: {
        value: this.props.value,
        isEmpty: this.props.value === ''
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        input: {
          value: this.props.value ? this.props.value : '',
          isEmpty: this.props.value ? this.props.value : true
        }
      });
      if (this.props.onChange !== null)
        this.props.onChange(this.formatObject({ target: { value: this.props.value } }));
    }
  }

  render() {
    const { props } = this;
    const input = this.state.input;
    const iconHelp =
      props.description !== null ? (
        <InputAdornment position="end">
          <Tooltip id="tooltip-fab" title={props.description} placement="top-end" enterTouchDelay={1}>
            <Icon>help</Icon>
          </Tooltip>
        </InputAdornment>
      ) : null;
    const isValid = input !== null ? (input.isValid && !input.isEmpty) || input.isEmpty : false;
    return (
      <FormControl error={false}>
        <InputLabel>{props.label}</InputLabel>
        <Input
          id={props.id}
          value={input !== null ? input.value : ''}
          onChange={this.handlerInputChange.bind(this)}
          onBlur={this.handlerInputChange.bind(this)}
          disabled={props.disabled}
          multiline={props.multiline}
          rows={props.multiline ? 4 : null}
          endAdornment={iconHelp}
          type={props.secret ? 'password' : 'text'}
        />
        {/* {!isValid ? <FormHelperText>{props.messageError}</FormHelperText> : null} */}
      </FormControl>
    );
  }

  /**
   * If proxy has passed, set input state with the correct object and
   * call the `onChange: func` props
   * @param {Proxy} proxy
   */
  handlerInputChange(proxy) {
    if (proxy) {
      this.setState({ input: this.formatObject(proxy) });
      if (this.props.onChange !== null) this.props.onChange(this.formatObject(proxy));
    }
  }

  /**
   * Verify if has passed the validator props and validate the
   * data args.
   * @param {any} data
   */
  isValidInput(data) {
    if (this.props.validator !== null) return this.props.validator(data);
    else return data !== '' && data !== undefined;
  }

  /**
   * Format the proxy data to response correct kind.
   * @param {Proxy} proxy
   */
  formatObject(proxy) {
    return {
      name: this.props.id,
      value: proxy.target.value,
      isValid: this.isValidInput(proxy.target.value),
      isEmpty: proxy.target.value === ''
    };
  }
}

FormFiledText.defaultProps = {
  disabled: false,
  multiline: false,
  label: '',
  id: Date.now() + '',
  value: '',
  description: null,
  messageError: '',
  validator: null,
  onChange: null
};

FormFiledText.propTypes = {
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.any,
  description: PropTypes.string,
  messageError: PropTypes.string,
  validator: PropTypes.func,
  onChange: PropTypes.func
};

export default FormFiledText;
