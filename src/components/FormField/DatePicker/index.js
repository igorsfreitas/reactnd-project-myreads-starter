import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MONTHS, WEEKDAYS_SHORT } from 'core/constants';

// Material Components
import { withStyles, FormControl, Input, InputLabel, FormHelperText, InputAdornment, Icon } from '@material-ui/core';
// Utils
import date from 'utils/masks/date';
import currentDate from 'utils/currentDate';
import daysUntilToday from 'utils/daysUntilToday';
// Plugins
import DayPicker from 'react-day-picker';


const style = theme => ({
  container: {
    maxHeight: 50
  },
  closed: {
    display: 'none'
  },
  open: {
    position: 'relative',
    width: 'auto',
    backgroundColor: '#FFFFFF',
    zIndex: 99,
    border: '1px solid #0069A3',
    borderRadius: 2,
    width: 270
  }
});

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      selectedDay: null,
      stringDay: '',
      isOpen: false,
      isValid: true,
      messageError: '*A data digitada deve ser posterior ao dia de hoje'
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    if (this.props.defaultDate) {
      this.setState({ stringDay: this.props.defaultDate })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.defaultDate !== prevProps.defaultDate) {
      this.setState({ stringDay: this.props.defaultDate })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { props } = this;
    const { classes } = this.props;

    const isValid = this.state.isValid;

    const iconCalendar = <InputAdornment position="end"><Icon>calendar_today</Icon></InputAdornment> ;

    const date = currentDate('yyyy-MM-dd').split('-');

    const beforeToday = props.disabledBeforeToday ? { before: new Date(date.join(', '))} : null;

    return (
      <div ref={this.setWrapperRef} className={classes.container}>

        <FormControl error={!isValid}>
          <InputLabel>{props.label}</InputLabel>
          <Input
            id={props.id || props.label}
            value={ this.state.stringDay }
            onChange={this.handlerInputChange.bind(this)}
            onClick={props.disabled ? null : this.toggleDayPicker.bind(this)}
            disabled={props.disabled}
            endAdornment={iconCalendar}
          />
          {!isValid ? <FormHelperText>{this.state.messageError || props.messageError}</FormHelperText> : null}
        </FormControl>

        <div className={classes[this.state.isOpen ? 'open' : 'closed']}>
          <DayPicker
            locale={'pt-br'}
            months={MONTHS}
            weekdaysShort={WEEKDAYS_SHORT}
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            disabledDays={[beforeToday]}
          />
        </div>
      </div>
    );
  }

  handlerInputChange(proxy) {
    const parse = date(proxy.target.value);
    const validate = this.props.disabledBeforeToday ?
      daysUntilToday(parse) >= 0 && parse.length == 10 : true;

    if (proxy.target.value.length >= 0) {
      this.setState({
        stringDay: parse,
        isOpen: false,
        isValid: validate
      });
    }
    this.sendToParent(parse);
  }

  sendToParent(value) {
    this.props.onChange({
      name: this.props.id,
      value: value,
      isValid: value.length >= 10
    });
  }

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) return;
    this.setState({
      selectedDay: modifiers.selected ? undefined : day,
      isOpen: !this.state.isOpen,
      stringDay: modifiers.selected ? '' : day.toLocaleDateString()
    });
    this.sendToParent(day.toLocaleDateString());
  }

  toggleDayPicker() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpen === true) {
      this.toggleDayPicker();
    }
  }

}

DatePicker.defaultProps = {
  label: 'Data limite',
  disabled: false,
  onChange: () => console.warn('Please, set the `onChange: func` props on the FormFieldDataPicker component')
};

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default withStyles(style)(DatePicker);
