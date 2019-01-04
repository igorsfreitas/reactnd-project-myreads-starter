import React from 'react';
import PropTypes from 'prop-types';

// Material Components
import { withStyles, Paper } from '@material-ui/core';
// React Spinners
import { BeatLoader } from 'react-spinners';
// Utils


const styles = theme => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  }
});

const Loading = ({ classes }) => {
  return (
    <Paper elevation={0} className={classes.container}>
      <BeatLoader
        sizeUnit={"px"}
        size={10}
        color={'#2972C7'}
        loading={true}
      />
    </Paper>
  );
};

Loading.propTypes = {

};

export default withStyles(styles)(Loading);
