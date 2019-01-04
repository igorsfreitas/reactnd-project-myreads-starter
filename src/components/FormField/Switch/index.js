import React from 'react';
import PropTypes from 'prop-types';

// Material Components
import { withStyles, FormControlLabel, Switch } from '@material-ui/core';

const styles = theme => ({
  SwitchBase: {
    width: 14,
    height: 32,
    borderRadius: 5,
    transform: 'translate(15px, 10px)'
  },
  Bar: {
    width: 106,
    height: 34,
    borderRadius: 3,
    opacity: 1,
    border: 'none',
    backgroundColor: '#C3C3C3',
    '&::before': {
      content: '"Arquivado"',
      color: '#FFFFFF',
      display: 'block',
      fontFamily: 'Roboto',
      fontSize: 18,
      padding: '6px 22px'
    }
  },
  Icon: {
    width: 14,
    height: 32,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  Checked: {
    transform: 'translate(105px, 10px)',
    '& + $Bar': {
      opacity: 1,
      border: 'none',
      backgroundColor: '#00c7b1',
      '&::before': {
        content: '"Aberto"',
        padding: '6px 7px'
      }
    },
  },
});

class SwitchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  componentDidUpdate(prevProps) {
    if ( this.props.defaultState !== prevProps.defaultState ) {
      this.setState({ checked: this.props.defaultState });
    }
  }

  render() {
    const { props } = this;
    const { classes } = props;

    return (
      <FormControlLabel
        control={
          <Switch
            classes={{
              switchBase: classes.SwitchBase,
              bar: classes.Bar,
              icon: classes.Icon,
              iconChecked: classes.iOSIconChecked,
              checked: classes.Checked,
            }}
            disableRipple
            checked={this.state.checked}
            onChange={this.handleChange.bind(this)}
            value="checked"
          />
        }
        label={props.label}
      />
    );
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
    this.props.onChange({ value: !this.state.checked ? '1' : '0' });
  }

}

SwitchComponent.defaultProps = {
  label: '',
  id: 'switch',
  onChange: () => console.warn('Please, set the `onChange: func` props on the FormFieldSwitch component')
};

SwitchComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  defaultState: PropTypes.bool
};

export default withStyles(styles)(SwitchComponent);
