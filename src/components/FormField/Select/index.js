import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material Imports
import { withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText, Icon } from '@material-ui/core';

const styles = theme => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -2,
    [theme.breakpoints.down('xs')]: {
      margin: -5,
      padding: 0,
    }
  },
  icon: {
    fontSize: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    }
  },
  text: {
    backgroundColor: '#FFFFFF',
    zIndex: 99,
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
});

class FormFieldSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
  }

  componentDidMount() {
    const { props } = this;
    if ( props.defaultSelectedValue !== null ) {
      this.setState({ selectedOption: props.defaultSelectedValue });
      if (props.onChange !== null)
        props.onChange(props.defaultSelectedValue);
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if ( props.defaultSelectedValue !== null &&
      props.defaultSelectedValue !== prevProps.defaultSelectedValue) {
      this.setState({ selectedOption: props.defaultSelectedValue });
      if (this.props.onChange !== null)
        this.props.onChange(props.defaultSelectedValue);
    }
  }

  render() {
    const { props, state } = this;
    const { classes } = props;
    const selectOptions = props.optionList.map(item => (
      <MenuItem value={item.value} key={item.value}>
        {item.label}
      </MenuItem>
    ));
    const haveLabel = props.label !== '' ? <InputLabel>{props.label}</InputLabel> : null;
    const haveHelpText = props.helpText !== '' ? <FormHelperText>{props.helpText}</FormHelperText> : null;
    const isRaised = props.variant === 'raised' ? 'raised-select' : '';

    return (
      <FormControl className={isRaised + ' ' + props.className}>
        {haveLabel}
        <Select
          value={state.selectedOption}
          renderValue={this.handlerSelect.bind(this)}
          onChange={this.handleChange.bind(this)}
          name={props.name}
          displayEmpty={props.label === ''}
        >
          {selectOptions}
        </Select>
        {haveHelpText}
      </FormControl>
    );
  }

  handlerSelect(value) {
    const { classes, optionList, selectedIcon } = this.props;

    const label = optionList.find(item => item.value == value).label;
    const icon = (
      <React.Fragment>
        <Icon className={classes.icon}>{selectedIcon}</Icon>
        &nbsp;&nbsp;
      </React.Fragment>);

    return (
      <div className={classes.item}>
        {selectedIcon ? icon : null}
        <span className={classes.text}>{label}</span>
      </div>
    );
  }

  /**
   * Define `selectedOption` state like the proxy value.
   * Call the `onChange: func` prop with `selectedOption` state like param.
   * @param {Proxy} proxy
   */
  handleChange(proxy) {
    this.setState({ selectedOption: proxy.target.value });
    if (this.props.onChange !== null)
      this.props.onChange(this.props.optionList.find(item => item.value == proxy.target.value));
  }
}

FormFieldSelect.defaultProps = {
  name: '',
  label: '',
  helpText: '',
  variant: '',
  onChange: null,
  optionList: [],
  defaultSelectedValue: null
};

FormFieldSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helpText: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  optionList: PropTypes.array,
  defaultSelectedValue: PropTypes.any
};

export default withStyles(styles)(FormFieldSelect);
