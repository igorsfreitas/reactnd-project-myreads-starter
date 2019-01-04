import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material Components
import { withStyles, FormControlLabel, Checkbox } from '@material-ui/core';
// Utils
import classesName from 'utils/classesName';

const styles = theme => ({

});

class CheckboxComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    }
  }

  render() {
    const { classes, className, label, id } = this.props;

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.isChecked}
            onChange={this.handleChange.bind(this)}
            value={id}
            color="secondary"
            className={classesName([className, classes.checkbox])}
          />
        }
        label={label}
      />
    );
  }

  handleChange() {
    this.props.onChange({
      value: !this.state.isChecked,
      name: this.props.id
    });
    this.setState({ isChecked: !this.state.isChecked });
  }

}

CheckboxComponent.defaultProps = {
  id: 'checkbox',
  label: 'Some Label',
  onChange: () => console.warn('Please set the `onChange: func` props on the checkbox component')
};

CheckboxComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(CheckboxComponent);
